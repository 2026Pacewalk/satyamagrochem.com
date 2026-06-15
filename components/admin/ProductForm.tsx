import Link from "next/link";
import { saveProduct } from "@/lib/actions";
import { ADMIN_PATH } from "@/lib/admin-config";

type Cat = { id: number; name: string };
type Prod = {
  id: number;
  name: string;
  slug: string;
  categoryId: number | null;
  activeIngredient: string;
  crops: string;
  pestDisease: string;
  dose: string;
  badge: string;
  published: boolean;
  image: string | null;
};

const BADGES = ["", "CAUTION", "DANGER", "POISON", "WARNING"];

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export default function ProductForm({
  categories,
  product,
}: {
  categories: Cat[];
  product?: Prod;
}) {
  return (
    <form action={saveProduct} className="max-w-3xl space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Name *</label>
          <input name="name" required defaultValue={product?.name} className={field} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Slug (URL)</label>
          <input
            name="slug"
            defaultValue={product?.slug}
            placeholder="auto-generated from name"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
          <select name="categoryId" defaultValue={product?.categoryId ?? ""} className={field}>
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Active Ingredient</label>
          <input
            name="activeIngredient"
            defaultValue={product?.activeIngredient}
            className={field}
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
        <h3 className="text-sm font-semibold text-slate-700">Product details</h3>
        <p className="mb-4 text-xs text-slate-400">
          Plain text — just fill what applies. Leave blank to hide a row on the product page.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Recommendation Crops
            </label>
            <input
              name="crops"
              defaultValue={product?.crops}
              placeholder="e.g. Cotton, Paddy, Maize"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Dose</label>
            <input
              name="dose"
              defaultValue={product?.dose}
              placeholder="e.g. 250 ml / Acre"
              className={field}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Pest / Disease</label>
            <input
              name="pestDisease"
              defaultValue={product?.pestDisease}
              placeholder="e.g. Stem borer, Leaf Folder"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Toxicity badge
            </label>
            <select name="badge" defaultValue={product?.badge ?? ""} className={field}>
              {BADGES.map((b) => (
                <option key={b} value={b}>
                  {b === "" ? "— None —" : b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Product image</label>
        {product?.image && (
          <div className="mb-2 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/uploads/${product.image}`}
              alt={product.name}
              className="h-20 w-20 rounded-lg border border-slate-200 object-contain bg-white p-1"
            />
            <span className="text-xs text-slate-400">Current image — upload a new file to replace it.</span>
          </div>
        )}
        <input type="file" name="image" accept="image/*" className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700" />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={product ? product.published : true}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
        />
        Published (visible on the site)
      </label>

      <div className="flex gap-3 border-t border-slate-200 pt-5">
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          {product ? "Save changes" : "Create product"}
        </button>
        <Link
          href={`${ADMIN_PATH}/products`}
          className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
