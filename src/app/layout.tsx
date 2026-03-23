import type { Metadata } from "next";
import "./globals.css";

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
        url: "/images/banner.png",
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
    <html lang="pl">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}
