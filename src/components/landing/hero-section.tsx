import { Leaf, ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-emerald" />
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      {/* Floating decoration */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 animate-float" />
      <div className="absolute top-40 right-20 w-14 h-14 rounded-full bg-white/5 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-20 left-1/4 w-10 h-10 rounded-full bg-emerald-300/10 animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium mb-6 animate-fade-in-up">
            <Sparkles className="h-3.5 w-3.5" />
            Platform Edukasi Pertanian Digital
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Agro-Edu Hub
            <span className="block text-emerald-200 mt-1">Al-Fauzan</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-emerald-100/90 leading-relaxed mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Jelajahi dunia pertanian modern melalui platform edukasi interaktif.
            Dari hidroponik hingga pertanian organik — belajar dengan cara yang
            menyenangkan dan ilmiah.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/katalog"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-emerald-800 hover:bg-emerald-50 shadow-lg shadow-emerald-950/20 font-semibold px-6 rounded-xl"
              )}
            >
              <BookOpenIcon className="mr-2 h-5 w-5" />
              Mulai Belajar
            </Link>
            <Link
              href="/quiz"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-6 rounded-xl"
              )}
            >
              Coba Kuis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* School badge */}
          <div className="mt-12 flex items-center gap-3 text-emerald-200/70 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="h-px w-8 bg-emerald-300/30" />
            <p className="text-sm">
              MA Pesantren Terpadu Al-Fauzan — Proyek KTI Pertanian
            </p>
          </div>
        </div>

        {/* Decorative leaf */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <div className="relative">
            <Leaf className="h-48 w-48 text-white/[0.07] rotate-12" strokeWidth={0.5} />
            <Leaf className="absolute top-8 left-8 h-32 w-32 text-white/[0.05] -rotate-12" strokeWidth={0.5} />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 53.3C672 58.7 768 69.3 864 69.3C960 69.3 1056 58.7 1152 53.3C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" fill="oklch(0.985 0.002 155)"/>
        </svg>
      </div>
    </section>
  );
}

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}
