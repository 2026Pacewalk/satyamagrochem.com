"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5 group">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white shadow-sm transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c0-6 0-9 5-13" />
          <path d="M17 4c-7 0-10 3-10 8a5 5 0 0 0 5 5c5 0 8-4 8-10 0-1.5-.3-3-3-3z" fill="currentColor" stroke="none" opacity="0.9" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold text-brand-dark">{site.name}</span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
          Agrochem · India
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + Escape to close while drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-sand bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-brand-dark"
                  : "text-ink/75 hover:bg-sand hover:text-brand-dark"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            Get in touch
          </Link>
        </div>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-sand text-ink lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </header>

      {/* Mobile drawer (kept OUTSIDE <header> so its fixed children are
          positioned relative to the viewport, not the backdrop-blur header) */}
      <div className={`lg:hidden ${open ? "" : "pointer-events-none"}`}>
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <aside
          className={`fixed right-0 top-0 z-50 flex h-full w-[84%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sand px-5 py-4">
            <Logo onClick={() => setOpen(false)} />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-sand text-ink transition-colors hover:bg-sand"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 40 + 80}ms` : "0ms" }}
                className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                } ${
                  isActive(item.href)
                    ? "bg-brand text-white shadow-sm"
                    : "text-ink/80 hover:bg-sand"
                }`}
              >
                {item.label}
                <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isActive(item.href) ? "text-white" : "text-muted"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
              </Link>
            ))}
          </nav>

          <div className="space-y-4 border-t border-sand bg-cream px-5 py-5">
            <a href={whatsappLink(`Hello ${site.name}, I'd like to know more about your products.`)} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Us
            </a>
            <div className="space-y-2 text-sm text-muted">
              <a href={`tel:${site.phone}`} className="flex items-center gap-2.5 hover:text-brand-dark">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-3-1-5-3-6-6l2-2-2-4z" /></svg>
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 break-all hover:text-brand-dark">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18v12H3z" /><path d="M3 7l9 6 9-6" /></svg>
                {site.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
