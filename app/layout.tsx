import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { personalData } from "@/data/personal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kristian-novan-portfolio.vercel.app"),
  title: "Kristian Novan — Computer Science Portfolio",

  description:
    "Personal portfolio of Kristian Novan, a Computer Science student showcasing software development, artificial intelligence, machine learning, campus activities, public speaking, and collaborative projects.",
  keywords: [
    "Kristian Novan",
    "Computer Science Portfolio",
    "Machine Learning",
    "Artificial Intelligence",
    "Software Engineer",
    "Public Speaker",
    "Binus University",
    "Full Stack Developer",
  ],
  authors: [{ name: "Kristian Novan" }],
  creator: "Kristian Novan",
  openGraph: {
    title: "Kristian Novan — Computer Science Portfolio",
    description:
      "Personal portfolio of Kristian Novan, showcasing AI/ML applications, software projects, campus leadership, and public speaking.",
    url: "https://kristiannovan.vercel.app",
    siteName: "Kristian Novan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian Novan — Computer Science Portfolio",
    description:
      "Personal portfolio of Kristian Novan, a Computer Science student passionate about AI, software development, and campus leadership.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-canvas text-charcoal font-sans antialiased flex flex-col selection:bg-accent-light selection:text-accent">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
