import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name}. Call ${site.phoneDisplay}, email ${site.email}, or message us on WhatsApp.`,
};

export default function ContactPage() {
  const cards = [
    {
      label: "Customer Care",
      value: site.phoneDisplay,
      href: `tel:${site.phone}`,
      icon: "M2 5c0 9 7 16 16 16l3-3-4-2-2 2c-3-1-6-4-7-7l2-2-2-4z",
    },
    {
      label: "E-mail",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: "M3 6h18v12H3zM3 7l9 6 9-6",
    },
    {
      label: "WhatsApp",
      value: site.phoneDisplay,
      href: whatsappLink(`Hello ${site.name}, I'd like to get in touch.`),
      icon: "M16 3a12 12 0 0 0-10 18l-2 4 4-2A12 12 0 1 0 16 3z",
    },
  ];

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for product recommendations, dealership or any enquiry."
        crumb={[{ label: "Contact Us" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "WhatsApp" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-sand bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-light hover:shadow-md"
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${c.label === "WhatsApp" ? "bg-[#25D366] text-white" : "bg-sand text-brand"}`}>
                {c.label === "WhatsApp" ? (
                  <WhatsAppIcon className="h-6 w-6" />
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                )}
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{c.label}</span>
                <span className="mt-1 block break-words font-medium text-ink">{c.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Get in touch</h2>
            <p className="mt-2 text-muted">
              Fill in the form and our team will get back to you. For a quicker
              response, message us directly on WhatsApp.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Corporate Office</h2>
            <p className="mt-2 max-w-md text-muted">{site.address}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-sand shadow-sm">
              <iframe
                title="Satyam Agro Chem location — Jhakhri, Himachal Pradesh"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13667.871805895677!2d77.070015!3d31.08281845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39057b97306d835b%3A0x5852e66ddab19efa!2sJhakhri%2C%20Himachal%20Pradesh%20171011!5e0!3m2!1sen!2sin!4v1781513298759!5m2!1sen!2sin"
                className="h-96 w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
