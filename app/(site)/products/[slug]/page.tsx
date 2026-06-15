import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { WhatsAppIcon } from "@/components/icons";
import {
  getProduct,
  productImage,
  relatedProducts,
} from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product" };
  const desc = product.activeIngredient
    ? `${product.name} — Active ingredient: ${product.activeIngredient}. ${product.primaryCategory?.name ?? "Agrochemical"} from Satyam Agro Chem.`
    : `${product.name} — ${product.primaryCategory?.name ?? "Agrochemical"} from Satyam Agro Chem.`;
  return { title: product.name, description: desc };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await relatedProducts(product, 4);
  const inquiry = whatsappLink(
    `Hello ${site.name}, I'm interested in *${product.name}*${product.primaryCategory ? ` (${product.primaryCategory.name})` : ""}. Please share details, dosage and availability.`,
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-sand bg-cream">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-4 text-sm text-muted sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-brand-dark">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-dark">Products</Link>
          {product.primaryCategory && (
            <>
              <span>/</span>
              <Link
                href={`/category/${product.primaryCategory.slug}`}
                className="hover:text-brand-dark"
              >
                {product.primaryCategory.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="font-medium text-brand-dark">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center rounded-3xl border border-sand bg-cream p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={productImage(product)}
              alt={product.name}
              className="max-h-[460px] w-auto object-contain"
            />
          </div>

          {/* Details */}
          <div>
            {product.primaryCategory && (
              <Link
                href={`/category/${product.primaryCategory.slug}`}
                className="inline-block rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark"
              >
                {product.primaryCategory.name}
              </Link>
            )}
            <div className="mt-4 flex items-center gap-3">
              <h1 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
                {product.name}
              </h1>
              {product.badge && (
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white ${
                    product.badge.toUpperCase() === "CAUTION" ? "bg-amber-500" : "bg-red-600"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Active Ingredient
                </dt>
                {product.activeIngredient ? (
                  <dd className="mt-1 inline-block rounded-lg bg-[#fff6cc] px-3 py-1.5 text-lg font-semibold text-[#5a4b00]">
                    {product.activeIngredient}
                  </dd>
                ) : (
                  <dd className="mt-1 text-muted">—</dd>
                )}
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Recommendation Crops
                </dt>
                {product.crops ? (
                  <dd className="mt-1 inline-block rounded-lg bg-brand px-3 py-1.5 font-semibold text-white">
                    {product.crops}
                  </dd>
                ) : (
                  <dd className="mt-1 text-muted">—</dd>
                )}
              </div>
              {product.pestDisease && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-brand">
                    Pest / Disease
                  </dt>
                  <dd className="mt-1 text-ink">{product.pestDisease}</dd>
                </div>
              )}
              {product.dose && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-brand">Dose</dt>
                  <dd className="mt-1 text-ink">{product.dose}</dd>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={inquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enquire on WhatsApp
              </a>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-sand"
              >
                Call {site.phoneDisplay}
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-sand bg-cream p-5 text-sm text-muted">
              <p className="font-semibold text-ink">Need bulk supply or dealership?</p>
              <p className="mt-1">
                Contact our team at{" "}
                <a href={`mailto:${site.email}`} className="text-brand hover:underline">
                  {site.email}
                </a>{" "}
                for pricing and distribution enquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-ink">Related Products</h2>
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
