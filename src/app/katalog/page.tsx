import type { Metadata } from "next";
import MateriCard from "@/components/katalog/materi-card";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Materi",
  description: "Jelajahi ensiklopedia lengkap tentang pertanian modern — dari hidroponik, pertanian organik, hingga pengendalian hama.",
};

export default function KatalogPage() {
  return (
    <div className="islamic-pattern min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <BookOpen className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
              Katalog Materi
            </h1>
            <p className="text-sm text-emerald-600">
              Ensiklopedia pertanian digital
            </p>
          </div>
        </div>
        <p className="text-emerald-600 mb-8 max-w-2xl">
          Jelajahi berbagai topik pertanian modern. Pilih kategori atau cari
          materi yang kamu butuhkan.
        </p>

        <MateriCard />
      </div>
    </div>
  );
}
