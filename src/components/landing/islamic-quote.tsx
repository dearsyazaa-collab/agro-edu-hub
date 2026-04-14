import { getIslamicQuoteOfTheDay } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function IslamicQuote() {
  const quote = getIslamicQuoteOfTheDay();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Card className="overflow-hidden border-emerald-200/50 shadow-lg shadow-emerald-100/50">
          <div className="h-1.5 gradient-emerald" />
          <CardContent className="pt-8 pb-8 px-6 sm:px-10 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-6">
              <BookOpen className="h-6 w-6 text-emerald-700" />
            </div>

            {/* Arabic text */}
            <p className="text-2xl sm:text-3xl text-emerald-900 mb-6 leading-[2.2] font-medium arabic-text" dir="rtl">
              {quote.arabic}
            </p>

            {/* Translation */}
            <p className="text-base sm:text-lg text-emerald-800 leading-relaxed mb-4 italic max-w-xl mx-auto">
              &ldquo;{quote.translation}&rdquo;
            </p>

            {/* Source */}
            <p className="text-sm text-emerald-600 font-medium">
              — {quote.source}
            </p>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-12 bg-emerald-300/50" />
              <span className="text-emerald-400 text-xs">✦</span>
              <div className="h-px w-12 bg-emerald-300/50" />
            </div>

            <p className="text-xs text-emerald-500 mt-3">
              Mutiara Hikmah Hari Ini
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
