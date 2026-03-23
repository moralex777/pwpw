import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polewajwypijpolewajwypij.pl"),
  title: "Alkohol zabiera więcej niż daje",
  description:
    "Alkohol niszczy zdrowie, rodziny i życie. Uzależnienie. Samotność. Choroba.",
  openGraph: {
    title: "Alkohol zabiera więcej niż daje",
    description:
      "Alkohol niszczy zdrowie, rodziny i życie. Uzależnienie. Samotność. Choroba.",
    type: "website",
    locale: "pl_PL",
    url: "https://polewajwypijpolewajwypij.pl",
    images: [
      {
        url: "/images/banner.webp",
        width: 1024,
        height: 576,
        alt: "Alkohol zabiera więcej niż daje",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={bebasNeue.variable}>
      <body className="bg-black overflow-hidden">
        {children}
      </body>
    </html>
  );
}
