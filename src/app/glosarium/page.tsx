"use client";

import { useState, useMemo } from "react";
import { getGlossary } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookA,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

const categoryLabels: Record<string, string> = {
  hidroponik: "Hidroponik",
  tanah: "Tanah",
  organik: "Organik",
  hama: "Hama",
  "pasca-panen": "Pasca Panen",
};

const categoryColors: Record<string, string> = {
  hidroponik: "bg-emerald-100 text-emerald-800 border-emerald-200",
  tanah: "bg-amber-100 text-amber-800 border-amber-200",
  organik: "bg-green-100 text-green-800 border-green-200",
  hama: "bg-rose-100 text-rose-800 border-rose-200",
  "pasca-panen": "bg-blue-100 text-blue-800 border-blue-200",
};

export default function GlosariumPage() {
  const allTerms = getGlossary();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(allTerms.map((t) => t.category))];
    return [{ value: "semua", label: "Semua" }, ...cats.map((c) => ({ value: c, label: categoryLabels[c] || c }))];
  }, [allTerms]);

  const filtered = useMemo(() => {
    return allTerms.filter((term) => {
      const matchCategory = activeCategory === "semua" || term.category === activeCategory;
      const matchSearch =
        searchQuery === "" ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allTerms, activeCategory, searchQuery]);

  // Group by first letter
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((term) => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  // Alphabet navigation
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const activeLetters = new Set(grouped.map(([letter]) => letter));

  return (
    <div className="islamic-pattern min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <BookA className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
              Glosarium Pertanian
            </h1>
            <p className="text-sm text-emerald-600">
              Kamus istilah pertanian A-Z
            </p>
          </div>
        </div>
        <p className="text-emerald-600 mb-8 max-w-2xl">
          Cari dan pelajari istilah-istilah pertanian. Klik istilah untuk melihat
          definisi lengkap dan istilah terkait.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
          <Input
            placeholder="Cari istilah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-emerald-200 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Alphabet navigation */}
        <div className="flex flex-wrap gap-1 mb-8">
          {alphabet.map((letter) => (
            <a
              key={letter}
              href={activeLetters.has(letter) ? `#letter-${letter}` : undefined}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                activeLetters.has(letter)
                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                  : "bg-gray-50 text-gray-300 cursor-default"
              }`}
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-emerald-500 mb-4">{filtered.length} istilah ditemukan</p>

        {/* Glossary list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
            <p className="text-emerald-600 text-lg">Istilah tidak ditemukan</p>
            <p className="text-emerald-400 text-sm mt-1">Coba kata kunci lain</p>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([letter, terms]) => (
              <div key={letter} id={`letter-${letter}`}>
                {/* Letter heading */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white text-sm font-bold">
                    {letter}
                  </span>
                  <Separator className="flex-1 bg-emerald-200/50" />
                </div>

                <div className="space-y-2">
                  {terms.map((term) => {
                    const isExpanded = expandedTerm === term.term;

                    return (
                      <Card
                        key={term.term}
                        className={`border transition-all duration-200 cursor-pointer ${
                          isExpanded
                            ? "border-emerald-300 shadow-sm"
                            : "border-emerald-100/80 hover:border-emerald-200"
                        }`}
                        onClick={() => setExpandedTerm(isExpanded ? null : term.term)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <h3 className="text-sm font-semibold text-emerald-900">
                                {term.term}
                              </h3>
                              <Badge variant="outline" className={`text-[10px] ${categoryColors[term.category] || ""}`}>
                                {categoryLabels[term.category] || term.category}
                              </Badge>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-emerald-400 shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-emerald-400 shrink-0" />
                            )}
                          </div>

                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-emerald-100">
                              <p className="text-sm text-emerald-700 leading-relaxed mb-3">
                                {term.definition}
                              </p>
                              {term.relatedTerms.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="text-xs text-emerald-500">Terkait:</span>
                                  {term.relatedTerms.map((rt) => (
                                    <button
                                      key={rt}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSearchQuery(rt);
                                        setExpandedTerm(null);
                                      }}
                                      className="inline-flex items-center gap-0.5 text-xs text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md transition-colors"
                                    >
                                      {rt}
                                      <ArrowRight className="h-2.5 w-2.5" />
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
