"use client";

import { useState, useEffect } from "react";
import { getAllChecklists } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ListChecks,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  Circle,
  Lightbulb,
  Trophy,
  Leaf,
  Recycle,
  Flame,
} from "lucide-react";
import type { Checklist as ChecklistType } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Salad: Leaf,
  Recycle,
  Flame,
  Leaf,
};

export default function ChecklistPage() {
  const checklists = getAllChecklists();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="islamic-pattern min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <ListChecks className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
              Panduan Bertani
            </h1>
            <p className="text-sm text-emerald-600">
              Checklist interaktif langkah demi langkah
            </p>
          </div>
        </div>
        <p className="text-emerald-600 mb-8 max-w-2xl">
          Ikuti panduan bertani step-by-step. Progress kamu akan tersimpan
          otomatis di browser.
        </p>

        {selectedId ? (
          <ChecklistDetail
            checklist={checklists.find((c) => c.id === selectedId)!}
            onBack={() => setSelectedId(null)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {checklists.map((cl) => {
              const Icon = iconMap[cl.icon] || ListChecks;
              return (
                <button key={cl.id} onClick={() => setSelectedId(cl.id)} className="text-left group">
                  <Card className="h-full border-emerald-100/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/40 transition-all duration-300 hover:-translate-y-1">
                    <div className="h-1 gradient-emerald" />
                    <CardContent className="p-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 mb-3 group-hover:bg-emerald-100 transition-colors">
                        <Icon className="h-5 w-5 text-emerald-700" />
                      </div>
                      <h3 className="text-base font-semibold text-emerald-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        {cl.title}
                      </h3>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 text-[10px] border-emerald-200 mb-3">
                        {cl.category}
                      </Badge>
                      <p className="text-xs text-emerald-600">
                        {cl.steps.length} langkah
                      </p>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function ChecklistDetail({ checklist, onBack }: { checklist: ChecklistType; onBack: () => void }) {
  const storageKey = `checklist-${checklist.id}`;
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]));

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompleted(new Set(JSON.parse(saved)));
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...completed]));
    } catch {
      // ignore
    }
  }, [completed, storageKey]);

  const toggleStep = (id: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => {
    setCompleted(new Set());
    localStorage.removeItem(storageKey);
  };

  const progress = Math.round((completed.size / checklist.steps.length) * 100);
  const allDone = completed.size === checklist.steps.length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Back & Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
        >
          ← Kembali
        </Button>
        <Button
          variant="outline"
          onClick={reset}
          className="border-rose-200 text-rose-600 hover:bg-rose-50"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-emerald-900 mb-2">{checklist.title}</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Progress value={progress} className="h-2.5 bg-emerald-100 [&>[data-slot=indicator]]:bg-emerald-600" />
          </div>
          <span className="text-sm font-semibold text-emerald-700 min-w-[3rem] text-right">
            {progress}%
          </span>
        </div>
        <p className="text-xs text-emerald-500 mt-1.5">
          {completed.size} dari {checklist.steps.length} langkah selesai
        </p>
      </div>

      {/* Completion Banner */}
      {allDone && (
        <Card className="border-emerald-300 bg-emerald-50 shadow-sm animate-fade-in-up">
          <CardContent className="p-5 text-center">
            <Trophy className="h-10 w-10 text-amber-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-emerald-900">Selamat! 🎉</p>
            <p className="text-sm text-emerald-700">
              Kamu telah menyelesaikan semua langkah. Semoga berhasil dalam praktiknya!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Steps */}
      <div className="space-y-3">
        {checklist.steps.map((step) => {
          const isDone = completed.has(step.id);
          const isOpen = expanded.has(step.id);

          return (
            <Card
              key={step.id}
              className={`border transition-all duration-200 ${
                isDone
                  ? "border-emerald-300 bg-emerald-50/50"
                  : "border-emerald-100/80"
              }`}
            >
              <CardContent className="p-0">
                {/* Step header */}
                <div className="flex items-center gap-3 p-4">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="shrink-0"
                    aria-label={isDone ? "Tandai belum selesai" : "Tandai selesai"}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-emerald-300 hover:text-emerald-500 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-500 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {step.id}
                      </span>
                      <h4 className={`text-sm font-semibold transition-colors ${isDone ? "text-emerald-500 line-through" : "text-emerald-900"}`}>
                        {step.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(step.id)}
                    className="shrink-0 text-emerald-400 hover:text-emerald-700 transition-colors"
                    aria-label={isOpen ? "Tutup detail" : "Buka detail"}
                  >
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {/* Step details */}
                {isOpen && (
                  <div className="px-4 pb-4 pl-[3.25rem]">
                    <p className="text-sm text-emerald-700 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-800 leading-relaxed">
                          <strong>Tips:</strong> {step.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
