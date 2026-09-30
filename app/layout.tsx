import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://kristian-novan-portfolio.vercel.app"),
  title: "Kristian Novan — Computer Science Student | BINUS University",
  description:
    "Portfolio of Kristian Novan, Computer Science student at BINUS University (B2028), specializing in Intelligent Systems (AI) with a focus on Machine Learning and UI/UX design.",
  keywords: [
    "Kristian Novan",
    "Computer Science",
    "BINUS University",
    "School of Computer Science",
    "Intelligent Systems",
    "Machine Learning",
    "UI/UX Design",
    "B2028",
    "ICORIS 2026",
    "Azure AI",
  ],
  authors: [{ name: "Kristian Novan" }],
  creator: "Kristian Novan",
  openGraph: {
    title: "Kristian Novan — Computer Science Student | BINUS University",
    description:
      "Personal portfolio of Kristian Novan, Computer Science student at BINUS University (B2028), specializing in Intelligent Systems (AI).",
    url: "https://kristiannovan.vercel.app",
    siteName: "Kristian Novan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian Novan — Computer Science Student | BINUS University",
    description:
      "Personal portfolio of Kristian Novan, Computer Science student at BINUS University (B2028), specializing in Intelligent Systems (AI).",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#111113" },
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth font-sans`}
    >
      <body className="min-h-screen bg-canvas text-charcoal font-sans antialiased flex flex-col selection:bg-accent-light selection:text-accent dark:selection:bg-accent-soft dark:selection:text-accent-dark transition-colors duration-300 relative">
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
