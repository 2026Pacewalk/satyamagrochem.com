import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const prisma = new PrismaClient();

const products = JSON.parse(
  readFileSync(new URL("../data/products.json", import.meta.url), "utf8"),
);
const categories = JSON.parse(
  readFileSync(new URL("../data/categories.json", import.meta.url), "utf8"),
);

await prisma.product.deleteMany();
await prisma.category.deleteMany();

const catIdBySlug = {};
let cOrder = 0;
for (const c of categories) {
  const created = await prisma.category.create({
    data: { name: c.name, slug: c.slug, order: cOrder++ },
  });
  catIdBySlug[c.slug] = created.id;
}

let pOrder = 0;
for (const p of products) {
  const catSlug = p.primaryCategory?.slug;
  await prisma.product.create({
    data: {
      name: p.name,
      slug: p.slug,
      categoryId: catSlug ? catIdBySlug[catSlug] ?? null : null,
      image: p.imageExists && p.imageFile ? p.imageFile : null,
      activeIngredient: p.activeIngredient ?? "",
      specHtml: p.specHtml ?? "",
      published: true,
      order: pOrder++,
    },
  });
}

console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
await prisma.$disconnect();
