import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProduct({
  params,
}: PageProps<"/sa-console-9x4k2/products/[id]/edit">) {
  const { id } = await params;
  const productId = Number(id);
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId } }),
    prisma.category.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Edit product</h1>
      <p className="mt-1 mb-8 text-sm text-slate-500">{product.name}</p>
      <ProductForm
        categories={categories}
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          categoryId: product.categoryId,
          activeIngredient: product.activeIngredient,
          crops: product.crops,
          pestDisease: product.pestDisease,
          dose: product.dose,
          badge: product.badge,
          published: product.published,
          image: product.image,
        }}
      />
    </div>
  );
}
