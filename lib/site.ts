export const site = {
  name: "Satyam Agro Chem",
  legalName: "Satyam Agrochem India",
  url: "https://satyamagrochem.com",
  tagline: "Greening the Future with Sustainable Farming",
  subtitle: "Sustainable Solutions for a Thriving Agriculture",
  description:
    "Satyam Agro Chem is a trusted agricultural partner with over twenty years of experience, offering a wide range of agrochemicals — insecticides, fungicides, herbicides, fertilizers and more — for sustainable, high-yield farming across India.",
  phoneDisplay: "+91 98077-98074",
  phone: "+919807798074",
  whatsapp: "919807798074",
  email: "Satyamagrochemindia@gmail.com",
  address:
    "393/21, Jhakhri (Part), Census Block 128 & 129, Tehsil-Rampur, Distt. Shimla (H.P.) - 172001",
  addressShort: "Tehsil-Rampur, Distt. Shimla (H.P.)",
  copyrightYear: 2026,
};

export const nav: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Our Mission", href: "/our-mission" },
  { label: "Our Products", href: "/products" },
  { label: "Contact Us", href: "/contact" },
];

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
