import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";
import { getCategories } from "@/lib/data";
import { WhatsAppIcon } from "./icons";

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf text-brand-darker">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c0-6 0-9 5-13" />
          <path d="M17 4c-7 0-10 3-10 8a5 5 0 0 0 5 5c5 0 8-4 8-10 0-1.5-.3-3-3-3z" fill="currentColor" stroke="none" opacity="0.9" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold text-white">{site.name}</span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-leaf">
          Agrochem · India
        </span>
      </span>
    </Link>
  );
}

const socials = [
  {
    label: "WhatsApp",
    href: whatsappLink(`Hello ${site.name}, I'd like to get in touch.`),
    icon: "M16 3a12 12 0 0 0-10 18l-2 4 4-2A12 12 0 1 0 16 3z",
  },
  { label: "Email", href: `mailto:${site.email}`, icon: "M3 6h18v12H3zM3 7l9 6 9-6" },
  { label: "Call", href: `tel:${site.phone}`, icon: "M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-3-1-5-3-6-6l2-2-2-4z" },
];

export default async function Footer() {
  const categories = await getCategories();
  return (
    <footer className="relative mt-24 bg-field text-white/80">
      {/* Floating CTA card */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 grid items-center gap-6 rounded-3xl bg-leaf px-8 py-8 text-brand-darker shadow-xl sm:flex sm:justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold">Let&apos;s grow together</h3>
            <p className="mt-1 text-sm text-brand-darker/80">
              Talk to our team about products, dosages and dealership opportunities.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Contact Us
            </Link>
            <a
              href={whatsappLink(`Hello ${site.name}, I'm interested in your products.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition-transform hover:scale-105"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandMark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {site.tagline}. A trusted agricultural partner for over twenty years,
              providing reliable crop protection and nutrition across India.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label === "WhatsApp" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-leaf hover:text-brand-darker"
                >
                  {s.label === "WhatsApp" ? (
                    <WhatsAppIcon className="h-5 w-5" />
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-leaf">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/70 transition-colors hover:text-white hover:pl-1">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-leaf">Product Range</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="text-white/70 transition-colors hover:text-white hover:pl-1">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-leaf">Get in touch</h4>
            <ul className="mt-4 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-leaf">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-3-1-5-3-6-6l2-2-2-4z" /></svg>
                </span>
                <a href={`tel:${site.phone}`} className="hover:text-white">{site.phoneDisplay}</a>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-leaf">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18v12H3z" /><path d="M3 7l9 6 9-6" /></svg>
                </span>
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-leaf">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                </span>
                <span>{site.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/15 pt-6 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/sitemap"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-leaf hover:text-leaf"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              View Sitemap
            </Link>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/15 px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:border-leaf hover:text-leaf"
            >
              sitemap.xml
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 text-center text-xs text-white/55 sm:flex-row sm:gap-6">
            <span>© {site.copyrightYear} {site.name}. All rights reserved.</span>
            <span>
              Designed &amp; Developed by{" "}
              <a href="https://pacewalk.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-leaf transition-colors hover:text-white">
                PACEWALK
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
