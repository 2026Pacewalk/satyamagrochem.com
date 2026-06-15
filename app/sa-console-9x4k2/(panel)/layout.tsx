import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ADMIN_PATH } from "@/lib/admin-config";
import AdminNav from "@/components/AdminNav";

export const metadata: Metadata = {
  title: "Admin · Satyam Agro Chem",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Real cryptographic gate (Node runtime — reliable env access).
  const session = await getSession();
  if (!session) redirect(`${ADMIN_PATH}/login`);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <aside className="flex w-64 flex-col bg-slate-900 px-4 py-6 text-slate-200">
        <div className="px-2">
          <div className="font-display text-lg font-bold text-white">Satyam Admin</div>
          <div className="text-xs text-slate-400">Signed in as {session.username}</div>
        </div>
        <div className="mt-8 flex-1">
          <AdminNav />
        </div>
        <div className="space-y-1 border-t border-slate-800 pt-4">
          <Link
            href="/"
            target="_blank"
            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
          >
            View site ↗
          </Link>
          <form action="/api/admin-logout" method="post">
            <button
              type="submit"
              className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-rose-300 transition-colors hover:bg-slate-800"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6 sm:p-10">{children}</main>
    </div>
  );
}
