import Link from "next/link";
import { prisma } from "@/lib/db";
import { ADMIN_PATH } from "@/lib/admin-config";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [products, published, categories, noImage] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.category.count(),
    prisma.product.count({ where: { image: null } }),
  ]);

  const stats = [
    { label: "Total products", value: products },
    { label: "Published", value: published },
    { label: "Categories", value: categories },
    { label: "Missing image", value: noImage },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Manage your products and categories.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="font-display text-3xl font-bold text-emerald-600">{s.value}</div>
            <div className="mt-1 text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`${ADMIN_PATH}/products/new`}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          + Add product
        </Link>
        <Link
          href={`${ADMIN_PATH}/products`}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Manage products
        </Link>
        <Link
          href={`${ADMIN_PATH}/categories`}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Manage categories
        </Link>
      </div>
    </div>
  );
}
