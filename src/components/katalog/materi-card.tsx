"use client";

import { useState } from "react";
import { getAllMateri, getCategories } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Search,
  Clock,
  ArrowRight,
  Droplets,
  FlaskConical,
  Layers,
  Mountain,
  Gem,
  Leaf,
  TreePine,
  Bug,
  Waves,
  Sprout,
  Package,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  FlaskConical,
  Layers,
  Mountain,
  Gem,
  Leaf,
  TreePine,
  Bug,
  Search,
  Waves,
  Sprout,
  Package,
};

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

export default function MateriCard() {
  const allMateri = getAllMateri();
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allMateri.filter((item) => {
    const matchCategory = activeCategory === "semua" || item.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
          <Input
            placeholder="Cari materi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-emerald-200 focus-visible:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCategory === cat.value
                ? "bg-emerald-700 text-white shadow-md shadow-emerald-200"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
          <p className="text-emerald-600 text-lg">Materi tidak ditemukan</p>
          <p className="text-emerald-400 text-sm mt-1">Coba kata kunci lain atau ubah kategori</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {filtered.map((item) => {
            const Icon = iconMap[item.icon] || Leaf;
            return (
              <Link key={item.id} href={`/katalog/${item.slug}`} className="group">
                <Card className="h-full border-emerald-100/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-1 gradient-emerald" />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                        <Icon className="h-5 w-5 text-emerald-700" />
                      </div>
                      <Badge variant="outline" className={`text-[10px] ${levelColors[item.level]}`}>
                        {levelLabels[item.level]}
                      </Badge>
                    </div>

                    <h3 className="text-base font-semibold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-emerald-600 leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                        <Clock className="h-3.5 w-3.5" />
                        {item.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Baca
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
