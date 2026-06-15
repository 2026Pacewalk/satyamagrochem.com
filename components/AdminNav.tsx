"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_PATH } from "@/lib/admin-config";

const items = [
  { href: ADMIN_PATH, label: "Dashboard", exact: true },
  { href: `${ADMIN_PATH}/products`, label: "Products", exact: false },
  { href: `${ADMIN_PATH}/categories`, label: "Categories", exact: false },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {items.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
