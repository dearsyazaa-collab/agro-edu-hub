"use client";

import { useEffect, useState, useRef } from "react";
import { BookOpen, GraduationCap, ListChecks, BookA } from "lucide-react";

const stats = [
  { icon: BookOpen, value: 12, suffix: "+", label: "Materi Pembelajaran" },
  { icon: GraduationCap, value: 3, suffix: "", label: "Kuis Interaktif" },
  { icon: ListChecks, value: 3, suffix: "", label: "Panduan Bertani" },
  { icon: BookA, value: 32, suffix: "+", label: "Istilah Glosarium" },
];

function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

export default function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl gradient-emerald p-8 sm:p-12 shadow-xl shadow-emerald-900/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
}: {
  icon: typeof BookOpen;
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 mb-3">
        <Icon className="h-5 w-5 text-emerald-100" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
        {count}
        {suffix}
      </p>
      <p className="text-sm text-emerald-200/80">{label}</p>
    </div>
  );
}
