import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
      <html lang="en">
        <head>
          {/* Warm up Clerk + Google OAuth connections so sign-in feels instant */}
          <link rel="preconnect" href="https://clerk.legal-whale-38.accounts.dev" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://clerk.legal-whale-38.accounts.dev" />
          <link rel="preconnect" href="https://accounts.google.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://accounts.google.com" />
          <link rel="preconnect" href="https://www.googleapis.com" crossOrigin="anonymous" />
        </head>
        <body className="min-h-screen bg-white text-slate-900 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
