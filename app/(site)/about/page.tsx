import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Greening the Future with Sustainable Farming. Satyam Agrochem India has been a trusted agricultural partner for over twenty years.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" crumb={[{ label: "About Us" }]} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/about-1.jpg" alt="Sustainable farming" className="rounded-2xl object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/about-2.jpg" alt="Healthy crops" className="mt-8 rounded-2xl object-cover" />
          </div>
          <div className="space-y-4 text-muted">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">About Us</span>
            <h2 className="font-display text-3xl font-bold text-ink">
              Greening the Future with Sustainable Farming.
            </h2>
            <p>
              Satyam Agrochem India has been a trusted agricultural partner for over
              twenty years. Our expertise and experience have helped us become one of
              India&apos;s most trusted agricultural resource providers.
            </p>
            <p>
              Our commitment to excellence and our clients&apos; happiness extend beyond
              India&apos;s boundaries. Because of our worldwide reach, we can impart our
              knowledge to other manufacturers and aid their development and prosperity.
            </p>
            <p>
              We are committed to developing and implementing environmentally friendly
              solutions that advance ecologically sound farming methods. Our crop
              protection measures not only help farmers enhance their yields but also
              safeguard valuable resources and improve the state of the environment.
            </p>
            <p>
              If you&apos;re a farmer looking for a trustworthy partner, look no further
              than Satyam Agrochem India. We have the expertise, excellent products, and
              committed service you need to be successful. Let&apos;s work together to
              ensure agriculture&apos;s continued success and expansion.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-field px-8 py-12 text-white sm:px-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Our Values</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/85">
            Satyam Agrochem India values agriculture. We prefer to be an honest,
            transparent firm that respects consumers and workers. We prioritize
            high-quality products and services to meet consumer needs. Innovation drives
            us to find new solutions to farmers&apos; issues. Our plan prioritizes
            environmental protection and eco-friendly practices and values collaboration
            with farmers, academics, and business leaders.
          </p>
        </div>
      </section>
    </>
  );
}
