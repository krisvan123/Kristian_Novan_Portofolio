import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import Starfield from "@/components/Starfield";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kristian-novan-portfolio.vercel.app"),
  title: "Kristian Novan — School of Computer Science (SOCS) | Intelligent Systems (AI)",
  description:
    "Personal portfolio of Kristian Novan, School of Computer Science (SOCS) student at BINUS University (B2028), specializing in Intelligent Systems (AI), showcasing Machine Learning, UI/UX, research papers, and campus activities.",
  keywords: [
    "Kristian Novan",
    "School of Computer Science",
    "SOCS",
    "BINUS University",
    "Intelligent Systems",
    "Machine Learning",
    "Artificial Intelligence",
    "UI/UX Design",
    "B2028",
    "ICORIS 2026",
    "Azure AI",
  ],
  authors: [{ name: "Kristian Novan" }],
  creator: "Kristian Novan",
  openGraph: {
    title: "Kristian Novan — School of Computer Science (SOCS) | Intelligent Systems (AI)",
    description:
      "Personal portfolio of Kristian Novan, School of Computer Science (SOCS) student at BINUS University (B2028), specializing in Intelligent Systems (AI).",
    url: "https://kristiannovan.vercel.app",
    siteName: "Kristian Novan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian Novan — School of Computer Science (SOCS) | Intelligent Systems (AI)",
    description:
      "Personal portfolio of Kristian Novan, School of Computer Science (SOCS) student at BINUS University (B2028), specializing in Intelligent Systems (AI).",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-canvas dark:bg-canvas-dark text-charcoal dark:text-charcoal-dark font-sans antialiased flex flex-col selection:bg-accent-light selection:text-accent dark:selection:bg-accent-dark-light dark:selection:text-accent-dark transition-colors duration-300 relative">
        <ThemeProvider>
          <Starfield />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
