"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "./db";
import { getSession, verifyCredentials, createSession, destroySession } from "./auth";
import { ADMIN_PATH } from "./admin-config";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Not authorized");
}

function refresh() {
  revalidatePath("/", "layout");
}

/* ---------------- Auth ---------------- */

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const ok = await verifyCredentials(username, password);
  if (!ok) return { error: "Invalid username or password." };
  await createSession(username);
  redirect(ADMIN_PATH);
}

export async function logoutAction() {
  await destroySession();
  redirect(`${ADMIN_PATH}/login`);
}

/* ---------------- Image upload ---------------- */

async function saveImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const filename = `${base}-${Date.now()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);
  return `products/${filename}`;
}

/* ---------------- Products ---------------- */

export async function saveProduct(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");
  let slug = slugify(String(formData.get("slug") ?? "")) || slugify(name);
  const categoryIdRaw = String(formData.get("categoryId") ?? "");
  const categoryId = categoryIdRaw ? Number(categoryIdRaw) : null;
  const activeIngredient = String(formData.get("activeIngredient") ?? "").trim();
  const crops = String(formData.get("crops") ?? "").trim();
  const pestDisease = String(formData.get("pestDisease") ?? "").trim();
  const dose = String(formData.get("dose") ?? "").trim();
  const badge = String(formData.get("badge") ?? "").trim();
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const uploaded = await saveImage(formData.get("image") as File | null);

  // Ensure slug uniqueness (ignore self when editing).
  const clash = await prisma.product.findFirst({
    where: { slug, ...(id ? { NOT: { id } } : {}) },
    select: { id: true },
  });
  if (clash) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  if (id) {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        categoryId,
        activeIngredient,
        crops,
        pestDisease,
        dose,
        badge,
        published,
        ...(uploaded ? { image: uploaded } : {}),
      },
    });
  } else {
    await prisma.product.create({
      data: {
        name,
        slug,
        categoryId,
        activeIngredient,
        crops,
        pestDisease,
        dose,
        badge,
        published,
        image: uploaded,
      },
    });
  }

  refresh();
  redirect(`${ADMIN_PATH}/products`);
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await prisma.product.delete({ where: { id } });
  refresh();
  redirect(`${ADMIN_PATH}/products`);
}

/* ---------------- Categories ---------------- */

export async function saveCategory(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");
  let slug = slugify(String(formData.get("slug") ?? "")) || slugify(name);

  const clash = await prisma.category.findFirst({
    where: { slug, ...(id ? { NOT: { id } } : {}) },
    select: { id: true },
  });
  if (clash) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  if (id) {
    await prisma.category.update({ where: { id }, data: { name, slug } });
  } else {
    const max = await prisma.category.aggregate({ _max: { order: true } });
    await prisma.category.create({
      data: { name, slug, order: (max._max.order ?? 0) + 1 },
    });
  }
  refresh();
  redirect(`${ADMIN_PATH}/categories`);
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await prisma.category.delete({ where: { id } });
  refresh();
  redirect(`${ADMIN_PATH}/categories`);
}
