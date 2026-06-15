import { prisma } from "@/lib/db";
import { saveCategory, deleteCategory } from "@/lib/actions";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="font-display text-2xl font-bold text-slate-900">Categories</h1>
        <p className="mt-1 text-sm text-slate-500">{categories.length} categories</p>

        <div className="mt-6 space-y-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              <form action={saveCategory} className="flex flex-1 items-center gap-2">
                <input type="hidden" name="id" value={c.id} />
                <input name="name" defaultValue={c.name} className={`${field} max-w-xs`} />
                <span className="text-xs text-slate-400">/{c.slug}</span>
                <button
                  type="submit"
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Save
                </button>
              </form>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                {c._count.products} products
              </span>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={c.id} />
                <button
                  type="submit"
                  className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-slate-900">Add category</h2>
        <form action={saveCategory} className="mt-4 space-y-3 rounded-2xl bg-white p-5 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Name *</label>
            <input name="name" required className={field} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
            <input name="slug" placeholder="auto from name" className={field} />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Add category
          </button>
        </form>
      </div>
    </div>
  );
}
