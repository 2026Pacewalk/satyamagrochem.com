import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProduct() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Add product</h1>
      <p className="mt-1 mb-8 text-sm text-slate-500">Create a new catalog product.</p>
      <ProductForm categories={categories} />
    </div>
  );
}
