import { prisma } from "./db";
import type { Product, Category } from "./types";

type Row = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  activeIngredient: string;
  crops: string;
  pestDisease: string;
  dose: string;
  badge: string;
  category: { name: string; slug: string } | null;
};

const select = {
  id: true,
  name: true,
  slug: true,
  image: true,
  activeIngredient: true,
  crops: true,
  pestDisease: true,
  dose: true,
  badge: true,
  category: { select: { name: true, slug: true } },
} as const;

function toView(p: Row): Product {
  const cat = p.category ? { name: p.category.name, slug: p.category.slug } : null;
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    primaryCategory: cat,
    categories: cat ? [cat] : [],
    imageFile: p.image ?? "",
    imageExists: !!p.image,
    activeIngredient: p.activeIngredient,
    crops: p.crops,
    pestDisease: p.pestDisease,
    dose: p.dose,
    badge: p.badge,
  };
}

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select,
  });
  return rows.map(toView);
}

export async function getCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: { where: { published: true } } } } },
  });
  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    count: c._count.products,
    description: "",
  }));
}

export async function getProduct(slug: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({ where: { slug }, select });
  return p ? toView(p) : null;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const c = await prisma.category.findUnique({
    where: { slug },
    include: { _count: { select: { products: { where: { published: true } } } } },
  });
  return c
    ? { id: c.id, name: c.name, slug: c.slug, count: c._count.products, description: "" }
    : null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { published: true, category: { slug } },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select,
  });
  return rows.map(toView);
}

export async function relatedProducts(p: Product, limit = 4): Promise<Product[]> {
  const catSlug = p.primaryCategory?.slug;
  const rows: Row[] = catSlug
    ? await prisma.product.findMany({
        where: { published: true, slug: { not: p.slug }, category: { slug: catSlug } },
        take: limit,
        orderBy: { order: "asc" },
        select,
      })
    : [];
  if (rows.length < limit) {
    const extra = await prisma.product.findMany({
      where: { published: true, slug: { not: p.slug } },
      take: limit,
      orderBy: { order: "asc" },
      select,
    });
    const have = new Set(rows.map((r) => r.slug));
    for (const e of extra) {
      if (rows.length >= limit) break;
      if (!have.has(e.slug)) {
        rows.push(e);
        have.add(e.slug);
      }
    }
  }
  return rows.slice(0, limit).map(toView);
}

export async function featuredProducts(limit = 8): Promise<Product[]> {
  const withImg = await prisma.product.findMany({
    where: { published: true, image: { not: null } },
    take: limit,
    orderBy: { order: "asc" },
    select,
  });
  if (withImg.length >= limit) return withImg.map(toView);
  const any = await prisma.product.findMany({
    where: { published: true },
    take: limit,
    orderBy: { order: "asc" },
    select,
  });
  return any.map(toView);
}

export function productImage(p: Product): string {
  return p.imageExists && p.imageFile
    ? `/uploads/${p.imageFile}`
    : "/img/placeholder.svg";
}

export function categoryImage(slug: string): string {
  return `/categories/${slug}.jpg`;
}
