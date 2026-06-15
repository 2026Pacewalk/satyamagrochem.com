import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { categoryImage, featuredProducts, getCategories, getProducts } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const stats = [
  { value: "20+", label: "Year experience" },
  { value: "300+", label: "Regular Customers" },
  { value: "100%", label: "Satisfaction Level" },
  { value: "100%", label: "Highest Educated Staff" },
];

export default async function Home() {
  const [categories, featured, allProducts] = await Promise.all([
    getCategories(),
    featuredProducts(8),
    getProducts(),
  ]);
  const productCount = allProducts.length;

  return (
    <>
      {/* Hero slider */}
      <HeroSlider />

      {/* Intro */}
      <section className="bg-field text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="animate-fade-up">
              <h1 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl">
                Greening the Future
                <br />
                with Sustainable Farming.
              </h1>
              <p className="mt-6 max-w-xl text-white/80">
                {site.legalName} has been a trusted agricultural partner for over twenty
                years. Our expertise and experience have helped us become one of
                India&apos;s most trusted agricultural resource providers.
              </p>
              <p className="mt-4 max-w-xl text-white/80">
                We cater to business and consumer markets with a comprehensive offering
                of goods and services. We have various agrochemicals for sale, including
                licensed and proprietary brands and generic alternatives. This guarantees
                that via our vast distribution network, we can provide farmers with
                various crop protection choices from which they may choose the best
                solutions for their situations.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Read more
              </Link>
            </div>

            <div className="flex justify-center lg:justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/about-mg.png"
                alt="Sustainable farming — a farmer and a seedling held in hands"
                className="w-full max-w-md"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
              >
                <div className="font-display text-4xl font-bold text-leaf">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products banner — full-width image with centered text */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url(/img/banner-products.jpg)" }}
      >
        <div className="absolute inset-0 bg-brand-darker/60" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center text-white sm:px-6 lg:py-32">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Our Products</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
            At {site.legalName}, we&apos;re proud to have a wide variety of agrochemicals
            to meet the requirements of farmers everywhere. The following are some of the
            types of products we offer…
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-white/60 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-dark"
          >
            View Products
          </Link>
        </div>
      </section>

      {/* Product Category */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Product Category
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={categoryImage(c.slug)}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/95 py-3 text-center font-display font-semibold text-ink shadow-sm backdrop-blur">
                    {c.name}
                  </div>
                </div>
                <div className="flex items-center justify-center bg-brand-dark py-3 text-white transition-colors group-hover:bg-brand">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">Our Product</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-sand px-5 py-2.5 text-sm font-semibold text-brand-dark hover:bg-sand">
            View all {productCount} products
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
