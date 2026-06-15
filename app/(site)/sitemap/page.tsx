import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getCategories, getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { nav } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Browse all pages, product categories and products on Satyam Agro Chem in one place.",
};

export default async function SitemapPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const byCat = new Map<string, Product[]>();
  for (const p of products) {
    const slug = p.primaryCategory?.slug ?? "other";
    if (!byCat.has(slug)) byCat.set(slug, []);
    byCat.get(slug)!.push(p);
  }

  return (
    <>
      <PageHeader
        title="Sitemap"
        subtitle={`All pages, ${categories.length} categories and ${products.length} products in one place.`}
        crumb={[{ label: "Sitemap" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Main pages */}
        <div className="mb-12">
          <h2 className="font-display text-xl font-bold text-ink">Main Pages</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {[...nav, { label: "Sitemap", href: "/sitemap" }].map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="inline-flex rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-brand-light hover:text-brand-dark"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories + their products */}
        <div className="space-y-8">
          {categories.map((c) => {
            const items = byCat.get(c.slug) ?? [];
            return (
              <div key={c.slug} className="rounded-2xl border border-sand bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-brand-dark">
                    <Link href={`/category/${c.slug}`} className="hover:underline">
                      {c.name}
                    </Link>
                  </h3>
                  <span className="text-xs font-medium text-muted">{items.length} products</span>
                </div>
                {items.length > 0 && (
                  <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="flex items-center gap-2 text-sm text-ink/75 transition-colors hover:text-brand"
                        >
                          <span className="text-brand-light">›</span>
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-sm text-muted">
          Looking for the machine-readable version?{" "}
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand hover:underline"
          >
            View sitemap.xml
          </a>
        </div>
      </section>
    </>
  );
}
