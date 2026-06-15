import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function stripTags(s) {
  return (s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parse(html) {
  const out = { activeIngredient: "", crops: "", pestDisease: "", dose: "", badge: "" };
  if (!html) return out;

  // Active ingredient is the highlighted txt-lg cell.
  const ai = html.match(/class="txt-lg"[^>]*>([\s\S]*?)<\/td>/i);
  if (ai) out.activeIngredient = stripTags(ai[1]);

  // Toxicity badge: an active-ingt cell wrapped in <strong> that isn't the label.
  const badgeMatch = html.match(/class="active-ingt"><strong>\s*([^<]+?)\s*<\/strong>/i);
  if (badgeMatch && !/active ingredient/i.test(badgeMatch[1])) {
    out.badge = badgeMatch[1].trim();
  }

  // Pest/Disease and Dose live in one cell: "<strong>Pest/Disease:</strong> ... <strong>Dose:</strong> ..."
  const pest = html.match(/Pest\/Disease:\s*<\/strong>([\s\S]*?)<strong>\s*Dose/i);
  if (pest) out.pestDisease = stripTags(pest[1]);
  const dose = html.match(/Dose:\s*<\/strong>([\s\S]*?)<\/td>/i);
  if (dose) out.dose = stripTags(dose[1]);

  // Recommendation Crops: the cell right after the label.
  const crops = html.match(/Recom?mendation Crops<\/td>[\s\S]*?<tr>\s*<td[^>]*>([\s\S]*?)<\/td>/i);
  if (crops) {
    const val = crops[1];
    if (!/Pest\/Disease|Dose:/i.test(val)) {
      out.crops = stripTags(val);
    }
  }
  return out;
}

const products = await prisma.product.findMany({
  select: { id: true, specHtml: true },
});

let updated = 0;
for (const p of products) {
  const f = parse(p.specHtml);
  const data = { crops: f.crops, pestDisease: f.pestDisease, dose: f.dose, badge: f.badge };
  // Only overwrite activeIngredient when we successfully parsed a txt-lg value.
  if (f.activeIngredient) data.activeIngredient = f.activeIngredient;
  await prisma.product.update({ where: { id: p.id }, data });
  updated++;
}

console.log(`Migrated specs for ${updated} products.`);
const sample = await prisma.product.findFirst({
  where: { slug: "air-marshal" },
  select: { name: true, activeIngredient: true, crops: true, pestDisease: true, dose: true, badge: true },
});
console.log("Sample (air-marshal):", JSON.stringify(sample, null, 2));
await prisma.$disconnect();
