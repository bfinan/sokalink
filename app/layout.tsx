import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "../components/auth-context"; // Import AuthProvider
import SendUserIdToExtension from "../components/SendUserIdToExtension"; // Import SendUserIdToExtension

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sokalink",
  description: "One-click social link sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] `}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <SpeedInsights />
          <Analytics />
          <SendUserIdToExtension /> {/* Send user ID to extension */}
        </AuthProvider>
      </body>
    </html>
  );
}
