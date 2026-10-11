import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Starfield from "@/components/Starfield";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-quote",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kristian-novan-portfolio.vercel.app"),
  title: "Kristian Novan — Computer Science Student (AI) | BINUS University",
  description:
    "Portfolio of Kristian Novan, Computer Science student at BINUS University (B2028, Cumulative GPA 3.59 / 4.00), specializing in Intelligent Systems (AI), Machine Learning, Next.js 14 full-stack engineering, and Three.js 3D simulations.",
  keywords: [
    "Kristian Novan",
    "Computer Science",
    "BINUS University",
    "School of Computer Science",
    "Intelligent Systems",
    "Machine Learning",
    "Next.js",
    "Three.js",
    "TypeScript",
    "Full-Stack Developer",
    "Creative Technologist",
    "B2028",
    "GPA 3.59",
    "ICORIS 2026",
    "Azure AI",
  ],
  authors: [{ name: "Kristian Novan" }],
  creator: "Kristian Novan",
  openGraph: {
    title: "Kristian Novan — Computer Science Student (AI) | BINUS University",
    description:
      "Personal portfolio of Kristian Novan, Computer Science undergraduate at BINUS University (B2028, GPA 3.59 / 4.00), specializing in Intelligent Systems (AI) and Three.js WebGL.",
    url: "https://kristian-novan-portfolio.vercel.app",
    siteName: "Kristian Novan Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Kristian Novan — Computer Science Student | BINUS University",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian Novan — Computer Science Student (AI) | BINUS University",
    description:
      "Personal portfolio of Kristian Novan, Computer Science undergraduate at BINUS University (B2028, GPA 3.59 / 4.00), specializing in Intelligent Systems (AI) and Three.js WebGL.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable} scroll-smooth font-sans`}
    >
      <body className="min-h-screen bg-canvas text-charcoal font-sans antialiased flex flex-col selection:bg-accent-soft selection:text-accent-dark relative">
        <Starfield />
        <CustomCursor />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
