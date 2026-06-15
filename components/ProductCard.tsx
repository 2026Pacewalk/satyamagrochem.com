import Link from "next/link";
import type { Product } from "@/lib/types";
import { productImage } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-light hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-cream p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(product)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {product.primaryCategory && (
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-dark backdrop-blur">
            {product.primaryCategory.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-brand-dark">
          {product.name}
        </h3>
        {product.activeIngredient && (
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {product.activeIngredient}
          </p>
        )}
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          View details
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
