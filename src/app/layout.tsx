import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { AuthProvider } from "@/features/auth/context/auth-context";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMS App",
  description: "LMS React Mini Project built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AuthProvider>
    <div className="flex min-h-screen flex-col bg-gray-50">
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </AuthProvider>
        
      </body>
    </html>
  );
}