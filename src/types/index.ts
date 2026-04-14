// ============================================================
// Agro-Edu Hub Al-Fauzan — TypeScript Type Definitions
// ============================================================

export interface DatabaseMeta {
  schoolName: string;
  projectTitle: string;
  version: string;
  lastUpdated: string;
  description: string;
}

export interface IslamicQuote {
  id: number;
  arabic: string;
  translation: string;
  source: string;
}

export type MateriCategory = "hidroponik" | "tanah" | "organik" | "hama" | "pasca-panen";
export type MateriLevel = "dasar" | "menengah" | "lanjutan";

export interface MateriItem {
  id: string;
  slug: string;
  title: string;
  category: MateriCategory;
  level: MateriLevel;
  description: string;
  content: string;
  icon: string;
  estimatedTime: string;
  keyPoints: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  katalogId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface ChecklistStep {
  id: number;
  title: string;
  description: string;
  tips: string;
}

export interface Checklist {
  id: string;
  title: string;
  category: string;
  icon: string;
  steps: ChecklistStep[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
}

export interface ABMixCrop {
  name: string;
  ppmRange: [number, number];
  phRange: [number, number];
  ratioA: number;
  ratioB: number;
}

export interface SpacingCrop {
  name: string;
  rowSpacing: number;
  plantSpacing: number;
  plantsPerHectar: number;
}

export interface CalculatorPresets {
  abMix: {
    crops: ABMixCrop[];
  };
  spacing: {
    crops: SpacingCrop[];
  };
}

export interface Database {
  meta: DatabaseMeta;
  islamicQuotes: IslamicQuote[];
  katalog: MateriItem[];
  quizzes: Quiz[];
  checklists: Checklist[];
  glossary: GlossaryItem[];
  calculatorPresets: CalculatorPresets;
}
