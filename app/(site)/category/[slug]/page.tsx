import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: category.name,
    description: `Explore Satyam Agro Chem ${category.name.toLowerCase()} — ${category.count} products for effective, sustainable crop care.`,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const [category, items, categories] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
    getCategories(),
  ]);
  if (!category) notFound();

  return (
    <>
      <PageHeader
        title={category.name}
        subtitle={`${items.length} ${items.length === 1 ? "product" : "products"} in this category.`}
        crumb={[
          { label: "Our Products", href: "/products" },
          { label: category.name },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/products"
            className="rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink/80 hover:border-brand-light hover:text-brand-dark"
          >
            All Products
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                c.slug === slug
                  ? "bg-brand text-white"
                  : "border border-sand bg-white text-ink/80 hover:border-brand-light hover:text-brand-dark"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="text-muted">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
