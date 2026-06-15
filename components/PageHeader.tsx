import Link from "next/link";

export default function PageHeader({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-field">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          {crumb?.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <span>/</span>
              {c.href ? (
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-leaf">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-white/75">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
