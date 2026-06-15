import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Browse the full range of Satyam Agro Chem agrochemicals — insecticides, fungicides, herbicides, fertilizers, plant growth regulators and more.",
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <>
      <PageHeader
        title="Our Products"
        subtitle="A comprehensive range of crop protection and nutrition products for modern, sustainable farming."
        crumb={[{ label: "Our Products" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
            All Products ({products.length})
          </span>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-brand-light hover:text-brand-dark"
            >
              {c.name} ({c.count})
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
