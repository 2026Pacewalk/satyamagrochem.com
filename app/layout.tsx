import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${site.name} — ${site.subtitle}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "agrochemicals",
    "insecticides",
    "fungicides",
    "herbicides",
    "fertilizers",
    "crop protection",
    "Satyam Agro Chem",
    "India",
  ],
  openGraph: {
    title: `${site.name} — ${site.subtitle}`,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
