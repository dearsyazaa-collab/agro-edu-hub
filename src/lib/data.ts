import { Database, MateriItem, Quiz, Checklist, GlossaryItem, IslamicQuote, CalculatorPresets } from "@/types";
import databaseJson from "../../content/database.json";

const db = databaseJson as Database;

export function getDatabase(): Database {
  return db;
}

export function getMeta() {
  return db.meta;
}

export function getIslamicQuoteOfTheDay(): IslamicQuote {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % db.islamicQuotes.length;
  return db.islamicQuotes[index];
}

export function getAllMateri(): MateriItem[] {
  return db.katalog;
}

export function getMateriBySlug(slug: string): MateriItem | undefined {
  return db.katalog.find((item) => item.slug === slug);
}

export function getMateriByCategory(category: string): MateriItem[] {
  if (category === "semua") return db.katalog;
  return db.katalog.filter((item) => item.category === category);
}

export function getAllQuizzes(): Quiz[] {
  return db.quizzes;
}

export function getQuizById(id: string): Quiz | undefined {
  return db.quizzes.find((quiz) => quiz.id === id);
}

export function getAllChecklists(): Checklist[] {
  return db.checklists;
}

export function getChecklistById(id: string): Checklist | undefined {
  return db.checklists.find((cl) => cl.id === id);
}

export function getGlossary(): GlossaryItem[] {
  return db.glossary.sort((a, b) => a.term.localeCompare(b.term));
}

export function getCalculatorPresets(): CalculatorPresets {
  return db.calculatorPresets;
}

export function getCategories(): { value: string; label: string }[] {
  return [
    { value: "semua", label: "Semua Materi" },
    { value: "hidroponik", label: "Hidroponik" },
    { value: "tanah", label: "Tanah & Budidaya" },
    { value: "organik", label: "Organik" },
    { value: "hama", label: "Hama & Penyakit" },
    { value: "pasca-panen", label: "Pasca Panen" },
  ];
}
