import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthBot AI - Your AI Healthcare Assistant",
  description: "AI-powered healthcare chatbot. Get instant medical guidance, find doctors, and locate hospitals near you.",
  keywords: ["HealthBot", "AI Healthcare", "Medical Assistant", "Find Doctors", "Hospital Finder"],
  authors: [{ name: "HealthBot AI Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "HealthBot AI - Your AI Healthcare Assistant",
    description: "AI-powered healthcare chatbot powered by NVIDIA Nemotron",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0f1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
