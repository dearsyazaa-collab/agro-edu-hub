import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Agro-Edu Hub Al-Fauzan | Platform Edukasi Pertanian Digital",
    template: "%s | Agro-Edu Hub Al-Fauzan",
  },
  description:
    "Platform edukasi pertanian digital untuk siswa MA Pesantren Terpadu Al-Fauzan. Belajar hidroponik, pertanian organik, dan budidaya tanaman secara interaktif.",
  keywords: [
    "pertanian",
    "hidroponik",
    "edukasi",
    "pesantren",
    "Al-Fauzan",
    "pertanian digital",
    "KTI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
