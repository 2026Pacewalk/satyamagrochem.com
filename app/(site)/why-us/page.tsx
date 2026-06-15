import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Satyam Agrochem India is at the core of the agriculture sector in India, providing premium chemicals and creative approaches to promote sustainable cultivation methods.",
};

const intro =
  "Satyam Agrochem India is at the core of the agriculture sector in India, providing premium chemicals and creative approaches to promote sustainable cultivation methods. We provide various goods and services that help farmers maximize their yields while reducing their adverse effects on the environment. The firm has become an industry leader in the production of agrochemicals because of its dedication to quality and knowledge of the field.";

const features = [
  {
    title: "Innovative Product Offerings",
    body: "Satyam Agrochem India is home to a wide variety of premium agrochemicals, each designed to fulfill the specific requirements of Indian farmers. Our products, from fertilizers and insecticides to growth boosters and bio-stimulants, are carefully created utilizing advanced R&D methods. The firm places a premium on using eco-friendly chemicals and novel formulations to provide optimal performance with little environmental impact.",
  },
  {
    title: "Sustainable Solutions",
    body: "Satyam Agrochem India Considers the Need for Sustainable Farming Practices, and They Want to Help. The firm provides all-encompassing remedies that maximize efficiency with limited resources and restore ecological harmony.",
  },
  {
    title: "Soil Health Management",
    body: "Being a leader in soil health management, it offers a variety of products that do things like increase fertility, increase water retention, and encourage good microbial activity in the soil. Farmers may improve yields and decrease their use of synthetic inputs if they focus on replenishing vital nutrients and maintaining soil health.",
  },
  {
    title: "Crop protection",
    body: "Our offerings include conventional chemical pesticides and environmentally preferable alternatives such as bio-pesticides and bio-fungicides. These methods reduce the potential for toxic residues and environmental pollution, allowing farmers to battle pests and illnesses more successfully.",
  },
  {
    title: "Precision Agriculture",
    body: "To further its mission of precision agriculture, Satyam Agrochem India uses modern tools, including remote sensing, data analytics, and geographic information systems (GIS). Farmers may maximize output while decreasing their ecological footprint by carefully monitoring crop vitality, nutritional demands, and watering requirements.",
  },
  {
    title: "Nutrition Management",
    body: "Balanced nutrition for crops while reducing losses is the goal of the company's nutrient management solutions. To maximize agricultural production and decrease pollution, Satyam Agrochem India uses cutting-edge formulations to provide precisely timed nutrients to plants.",
  },
  {
    title: "Commitment to Quality",
    body: "Satyam Agrochem India relies on quality assurance and in-house expertise to guarantee first-rate client results. The organization has a staff of highly trained scientists, agronomists, and technicians who are constantly researching, designing, and testing new farming methods that align with sustainable agriculture principles. Products are tested for effectiveness, safety, and environmental sustainability at every step of the manufacturing process to guarantee they are up to par.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <PageHeader title="Why Us" crumb={[{ label: "Why Us" }]} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-muted">
          {intro}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl border border-sand bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sand font-display text-lg font-bold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
