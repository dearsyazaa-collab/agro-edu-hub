import { getAllMateri, getMateriBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const materiList = getAllMateri();
  return materiList.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const materi = getMateriBySlug(slug);
  if (!materi) return { title: "Materi Tidak Ditemukan" };
  return {
    title: materi.title,
    description: materi.description,
  };
}

const levelColors: Record<string, string> = {
  dasar: "bg-emerald-100 text-emerald-800 border-emerald-200",
  menengah: "bg-amber-100 text-amber-800 border-amber-200",
  lanjutan: "bg-rose-100 text-rose-800 border-rose-200",
};

const levelLabels: Record<string, string> = {
  dasar: "Dasar",
  menengah: "Menengah",
  lanjutan: "Lanjutan",
};

const categoryLabels: Record<string, string> = {
  hidroponik: "Hidroponik",
  tanah: "Tanah & Budidaya",
  organik: "Organik",
  hama: "Hama & Penyakit",
  "pasca-panen": "Pasca Panen",
};

export default async function MateriDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const materi = getMateriBySlug(slug);
  if (!materi) notFound();

  const allMateri = getAllMateri();
  const relatedMateri = allMateri
    .filter((m) => m.category === materi.category && m.id !== materi.id)
    .slice(0, 3);

  // Simple markdown-like rendering
  const contentParts = materi.content.split("\n\n");

  return (
    <div className="islamic-pattern min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-emerald-600 mb-6">
          <Link href="/katalog" className="hover:text-emerald-800 transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Katalog Materi
          </Link>
          <span className="text-emerald-400">/</span>
          <span className="text-emerald-500">
            {categoryLabels[materi.category] || materi.category}
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline" className={`${levelColors[materi.level]}`}>
              {levelLabels[materi.level]}
            </Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {categoryLabels[materi.category]}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-emerald-500">
              <Clock className="h-3.5 w-3.5" />
              {materi.estimatedTime}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-3">
            {materi.title}
          </h1>
          <p className="text-lg text-emerald-600 leading-relaxed">
            {materi.description}
          </p>
        </div>

        {/* Key Points */}
        <Card className="border-emerald-200/50 mb-8 shadow-sm">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Poin-Poin Penting
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {materi.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="prose prose-emerald max-w-none mb-12">
          {contentParts.map((part, idx) => {
            if (part.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-xl font-bold text-emerald-900 mt-8 mb-4">
                  {part.replace("## ", "")}
                </h2>
              );
            }
            if (part.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-lg font-semibold text-emerald-800 mt-6 mb-3">
                  {part.replace("### ", "")}
                </h3>
              );
            }

            // Lists
            const lines = part.split("\n");
            if (lines.every((l) => l.startsWith("- ") || l.startsWith("| ") || /^\d+\./.test(l))) {
              return (
                <ul key={idx} className="space-y-1.5 my-4">
                  {lines.map((line, li) => {
                    const text = line.replace(/^[-\d.]+\s*/, "").trim();
                    if (!text) return null;
                    return (
                      <li key={li} className="flex items-start gap-2 text-emerald-700">
                        <span className="text-emerald-400 mt-1.5 shrink-0">•</span>
                        <span className="text-sm leading-relaxed" dangerouslySetInnerHTML={{
                          __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-800">$1</strong>')
                        }} />
                      </li>
                    );
                  })}
                </ul>
              );
            }

            // Regular paragraph
            return (
              <p key={idx} className="text-emerald-700 leading-relaxed my-4 text-sm" dangerouslySetInnerHTML={{
                __html: part.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-800">$1</strong>')
              }} />
            );
          })}
        </div>

        <Separator className="bg-emerald-200/50 mb-8" />

        {/* Related Materi */}
        {relatedMateri.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">
              Materi Terkait
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedMateri.map((item) => (
                <Link key={item.id} href={`/katalog/${item.slug}`} className="group">
                  <Card className="h-full border-emerald-100/80 hover:border-emerald-300 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-semibold text-emerald-900 mb-1 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-emerald-600 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Baca <ArrowRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="mt-8">
          <Link
            href="/katalog"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}
