import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Calculator,
  ListChecks,
  GraduationCap,
  BookA,
  Leaf,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    href: "/katalog",
    icon: BookOpen,
    title: "Katalog Materi",
    description: "Ensiklopedia lengkap tentang pertanian modern, dari hidroponik hingga pertanian organik.",
    color: "from-emerald-500 to-emerald-700",
    bgLight: "bg-emerald-50",
    iconColor: "text-emerald-700",
  },
  {
    href: "/kalkulator",
    icon: Calculator,
    title: "Kalkulator Pintar",
    description: "Hitung kebutuhan nutrisi AB Mix dan jarak tanam secara otomatis dan akurat.",
    color: "from-teal-500 to-teal-700",
    bgLight: "bg-teal-50",
    iconColor: "text-teal-700",
  },
  {
    href: "/checklist",
    icon: ListChecks,
    title: "Panduan Bertani",
    description: "Ikuti langkah demi langkah panduan bertani yang interaktif dan mudah diikuti.",
    color: "from-green-500 to-green-700",
    bgLight: "bg-green-50",
    iconColor: "text-green-700",
  },
  {
    href: "/quiz",
    icon: GraduationCap,
    title: "Kuis Interaktif",
    description: "Uji pemahamanmu dengan kuis profesional dan dapatkan ringkasan performa.",
    color: "from-cyan-500 to-cyan-700",
    bgLight: "bg-cyan-50",
    iconColor: "text-cyan-700",
  },
  {
    href: "/glosarium",
    icon: BookA,
    title: "Glosarium A-Z",
    description: "Cari dan pelajari istilah-istilah pertanian dengan mudah dan cepat.",
    color: "from-lime-500 to-lime-700",
    bgLight: "bg-lime-50",
    iconColor: "text-lime-700",
  },
  {
    href: "/katalog",
    icon: Leaf,
    title: "Pertanian Islam",
    description: "Pelajari pertanian dari perspektif Islam: menjadi khalifah yang menjaga bumi.",
    color: "from-emerald-600 to-emerald-800",
    bgLight: "bg-emerald-50",
    iconColor: "text-emerald-800",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 islamic-pattern">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-3">
            Fitur Pembelajaran
          </h2>
          <p className="text-emerald-600 text-lg max-w-2xl mx-auto">
            Berbagai fitur interaktif untuk mendukung proses belajar pertanian
            modern
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} href={feature.href} className="group">
                <Card className="h-full border-emerald-100/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgLight} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-emerald-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    {/* Link indicator */}
                    <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      Jelajahi
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
