import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "To offer farmers top-notch agrochemical products that help maximize productivity while encouraging moral and environmentally friendly agricultural methods.",
};

const values = [
  { title: "Sustainability", body: "We encourage ethical and environmentally friendly farming methods to create a sustainable future for the agriculture sector." },
  { title: "Innovation", body: "To improve the caliber and efficacy of our goods and services, we keep abreast of current market developments and make significant investments in cutting-edge technology." },
  { title: "Customer satisfaction", body: "We put the requirements of our customers first and work hard to go above and beyond their expectations by offering outstanding goods and services." },
  { title: "Integrity", body: "By conducting our company with honesty, openness, and moral principles, we gain the admiration and confidence of our clients and business associates." },
  { title: "Teamwork", body: "We promote cooperation and teamwork, creating an atmosphere at work where each individual can succeed and make a contribution." },
  { title: "Quality", body: "We are dedicated to offering the best agrochemical products possible, developed with the newest technology and put to the test for both efficacy and safety." },
];

const assurance = [
  "Satyam Agrochem India never compromises on quality. To guarantee the efficacy and safety of our agrochemical products, we know the importance of quality control. International standards and rigorous quality assurance procedures represent our dedication to providing only the highest quality products and services.",
  "We spend much time and money on R&D to develop new and improved product formulas. Expert scientists and agronomists on our team work tirelessly to develop solutions for farmers' unique problems and promote robust, healthy harvests. We put our goods through rigorous testing and assessment to guarantee they always perform as expected.",
  "Our raw materials come from reliable sources that meet our high-quality requirements. Raw ingredients are evaluated and tested extensively before purchase to guarantee their purity, effectiveness, and compatibility with our formulas. We guarantee the durability and efficacy of our goods by only using premium raw materials.",
  "Our production facilities use cutting-edge technology and align with GMP (Good Manufacturing practices). To ensure that the quality of our products remains at a consistently high standard, we have developed rigorous methods of quality control at every stage of production. Our production staff strictly controls our goods' formulation, mixing, and packaging.",
  "We use a full-fledged quality control division that tests extensively at several points during the manufacturing process. Testing the raw ingredients, the manufacturing process and the finished product are all part of this. We put our goods through rigorous quality, purity, and efficacy testing using state-of-the-art laboratory equipment and methods.",
  "International standards and regulatory regulations form the basis of our quality control procedures. We follow all local, state, and federal rules and relevant industry standards. We work hard to get and keep the necessary certifications to prove our dedication to quality. Our products are tested extensively to guarantee that they are safe, effective, and environmentally friendly.",
  "We are dedicated to improving our quality control procedures and practicing the principle of continuous improvement. Constant analysis and evaluation of our processes allow us to spot opportunities for improvement and swiftly address them. We routinely solicit input from consumers and stakeholders to propel innovation and further develop our goods and services.",
  "We place a premium on the happiness of our customers. We are grateful for our clients' confidence and make every effort to exceed their expectations. Our support staff is accessible at all times to answer questions and handle problems. Through trustworthiness, open communication, and top-notch support, we want to earn the loyalty of our consumers for years to come.",
  "We hold quality as more than an aim; it is a guiding concept that directs our actions at every level. We are dedicated to providing farmers with high-quality agrochemicals that improve their livelihoods. Our rigorous quality control procedures guarantee that our goods are of the best possible quality regarding their effectiveness, safety, and environmental friendliness.",
];

const exportProducts = [
  "We at Satyam Agrochem India are proud that our premium agrochemicals are exported to over 20 nations. We have become a reliable supplier in global markets because of our dedication to quality and the diversity of the items we ship.",
  "We provide a wide range of crop protection services to meet the varying requirements of farmers throughout the world. Our broad selection of insecticides, fungicides, herbicides, and plant growth regulators allows us to deliver safe, long-term remedies for pest, disease, and weed problems. These items have been developed to provide maximum crop safety with little environmental harm.",
  "Our micro-fertilizers are in great demand worldwide because of their excellent quality and ability to improve plant nutrition. The macro and micronutrients in these formulations are crucial to the development and growth of plants. Our micronutrients solve nutritional inadequacies, allowing farmers to increase production and improve crop quality.",
  "We also export various specialty goods in addition to our mainstay crop protection and micro fertilizer offerings. Agrochemical performance and effectiveness may be improved using agricultural inputs like adjuvants and surfactants. We've developed a line of specialized products to help farmers get the best possible outcomes from their crop protection efforts.",
  "We provide tailored services since we know various geographical areas and marketplaces have varying agricultural needs. We recognize the wide variety of crop types, soil types, and pest control issues our customers face, and we respond by providing individualized service. To provide the highest level of service to our worldwide clientele, our team of professionals works directly with them to provide unique product formulations and agronomic suggestions.",
  "We are dedicated to ecological balance and responsible farming practices. When designing our export goods, we consider environmental effects while providing cutting-edge crop preservation and expansion methods. We work hard to spread the word about the benefits of sustainable farming globally so that future generations may enjoy a planet free of environmental degradation.",
  "We have established a formidable foothold in foreign markets through our strategic alliances and worldwide network of distributors. Together with our foreign associates, we offer quick support and technical help, as well as guaranteeing the uninterrupted availability of our products. By working with like-minded businesses, we are better equipped to identify and meet the specific requirements of each market.",
];

export default function MissionPage() {
  return (
    <>
      <PageHeader title="Our Mission" crumb={[{ label: "Our Mission" }]} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-field px-8 py-12 text-center text-white">
          <p className="text-lg leading-relaxed text-white/90">
            To offer farmers top-notch agrochemical products that help maximize
            productivity while encouraging moral and environmentally friendly
            agricultural methods. To offer innovative solutions that aid farmers in
            achieving optimal yields, we seek to create a sustainable future for the
            agriculture sector.
          </p>
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Our Core Values</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-sand bg-white p-7 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-brand-dark">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-ink">Assurance of Quality</h2>
          <div className="mt-5 space-y-4 text-muted">
            {assurance.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-sand bg-cream p-8 sm:p-10">
          <h2 className="font-display text-3xl font-bold text-ink">Export Products</h2>
          <div className="mt-5 space-y-4 text-muted">
            {exportProducts.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
