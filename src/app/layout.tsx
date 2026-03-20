import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Polewaj. Wypij. Polewaj. Wypij.",
  description:
    "In Vino Veritas. Filozofia biesiadowania w literaturze i kulturze.",
  openGraph: {
    title: "Polewaj. Wypij. Polewaj. Wypij.",
    description:
      "In Vino Veritas. Filozofia biesiadowania w literaturze i kulturze.",
    type: "website",
    locale: "pl_PL",
    url: "https://polewajwypijpolewajwypij.pl",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Polewaj Wypij Polewaj Wypij",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polewaj. Wypij. Polewaj. Wypij.",
    description: "In Vino Veritas. Filozofia biesiadowania.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
