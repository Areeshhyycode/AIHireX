import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIHireX — AI-powered Job Portal",
  description:
    "Smarter hiring with AI resume analysis, mock interviews, scam detection and verified recruiters.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
        <head>
          <link rel="preconnect" href="https://clerk.legal-whale-38.accounts.dev" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://clerk.legal-whale-38.accounts.dev" />
          <link rel="preconnect" href="https://accounts.google.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://accounts.google.com" />
        </head>
        <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
