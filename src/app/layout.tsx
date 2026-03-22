import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

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
  metadataBase: new URL("https://polewajwypijpolewajwypij.pl"),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  title: "Polewaj. Wypij. Polewaj. Wypij.",
  description:
    "In Vino Veritas. Filozofia biesiadowania w literaturze i kulturze.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Polewaj. Wypij. Polewaj. Wypij.",
    description:
      "In Vino Veritas. Filozofia biesiadowania w literaturze i kulturze.",
    type: "website",
    locale: "pl_PL",
    url: "https://polewajwypijpolewajwypij.pl",
    images: [
      {
        url: "/images/og.webp",
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
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "PWPW",
    "theme-color": "#722F37",
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
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body suppressHydrationWarning>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
