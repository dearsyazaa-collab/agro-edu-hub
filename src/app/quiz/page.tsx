"use client";

import { useState } from "react";
import { getAllQuizzes } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Quiz, QuizQuestion } from "@/types";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  BookOpen,
  Clock,
  Target,
  AlertCircle,
} from "lucide-react";

type QuizState = "select" | "playing" | "result";

interface QuizResult {
  quiz: Quiz;
  answers: number[];
  score: number;
  total: number;
}

export default function QuizPage() {
  const quizzes = getAllQuizzes();
  const [state, setState] = useState<QuizState>("select");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQ(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setState("playing");
  };

  const selectAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null || !selectedQuiz) return;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQ + 1 < selectedQuiz.questions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Calculate score
      const score = newAnswers.reduce((acc, ans, idx) => {
        return acc + (ans === selectedQuiz.questions[idx].correctAnswer ? 1 : 0);
      }, 0);
      setResult({
        quiz: selectedQuiz,
        answers: newAnswers,
        score,
        total: selectedQuiz.questions.length,
      });
      setState("result");
    }
  };

  const backToSelect = () => {
    setState("select");
    setSelectedQuiz(null);
    setResult(null);
  };

  return (
    <div className="islamic-pattern min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <GraduationCap className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
              Kuis Interaktif
            </h1>
            <p className="text-sm text-emerald-600">
              Uji pemahamanmu tentang pertanian
            </p>
          </div>
        </div>
        <p className="text-emerald-600 mb-8 max-w-2xl">
          Pilih kuis dan jawab pertanyaan untuk menguji pemahamanmu.
          Hasil dan pembahasan ditampilkan di akhir.
        </p>

        {state === "select" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {quizzes.map((quiz) => (
              <button key={quiz.id} onClick={() => startQuiz(quiz)} className="text-left group">
                <Card className="h-full border-emerald-100/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-1 gradient-emerald" />
                  <CardContent className="p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 mb-3 group-hover:bg-emerald-100 transition-colors">
                      <GraduationCap className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h3 className="text-base font-semibold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {quiz.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                        {quiz.questions.length} soal
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        )}

        {state === "playing" && selectedQuiz && (
          <QuizPlaying
            quiz={selectedQuiz}
            currentQ={currentQ}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            onSelectAnswer={selectAnswer}
            onNext={nextQuestion}
            onQuit={backToSelect}
          />
        )}

        {state === "result" && result && (
          <QuizResultView result={result} onRetry={() => startQuiz(result.quiz)} onBack={backToSelect} />
        )}
      </div>
    </div>
  );
}

function QuizPlaying({
  quiz,
  currentQ,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
  onNext,
  onQuit,
}: {
  quiz: Quiz;
  currentQ: number;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onSelectAnswer: (idx: number) => void;
  onNext: () => void;
  onQuit: () => void;
}) {
  const question = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLast = currentQ + 1 === quiz.questions.length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Progress bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Progress value={progress} className="h-2.5 bg-emerald-100 [&>[data-slot=indicator]]:bg-emerald-600" />
        </div>
        <span className="text-sm font-semibold text-emerald-700">
          {currentQ + 1}/{quiz.questions.length}
        </span>
      </div>

      {/* Question */}
      <Card className="border-emerald-200/50 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-emerald-700 text-white">Soal {question.id}</Badge>
            <span className="text-xs text-emerald-500">{quiz.title}</span>
          </div>

          <h3 className="text-lg font-semibold text-emerald-900 mb-6 leading-relaxed">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let classes = "w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ";

              if (!showExplanation) {
                classes += selectedAnswer === idx
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : "border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 text-emerald-700";
              } else {
                if (idx === question.correctAnswer) {
                  classes += "border-emerald-500 bg-emerald-50 text-emerald-800";
                } else if (idx === selectedAnswer && idx !== question.correctAnswer) {
                  classes += "border-rose-400 bg-rose-50 text-rose-700";
                } else {
                  classes += "border-gray-100 text-gray-400";
                }
              }

              const labels = ["A", "B", "C", "D"];

              return (
                <button
                  key={idx}
                  onClick={() => onSelectAnswer(idx)}
                  className={classes}
                  disabled={showExplanation}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold shrink-0 ${
                    showExplanation && idx === question.correctAnswer
                      ? "bg-emerald-600 text-white"
                      : showExplanation && idx === selectedAnswer && idx !== question.correctAnswer
                        ? "bg-rose-500 text-white"
                        : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {labels[idx]}
                  </span>
                  {option}
                  {showExplanation && idx === question.correctAnswer && (
                    <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-600 shrink-0" />
                  )}
                  {showExplanation && idx === selectedAnswer && idx !== question.correctAnswer && (
                    <XCircle className="ml-auto h-5 w-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mt-6 rounded-xl p-4 border ${
              isCorrect
                ? "bg-emerald-50 border-emerald-200"
                : "bg-rose-50 border-rose-200"
            }`}>
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className={`text-sm font-semibold mb-1 ${isCorrect ? "text-emerald-800" : "text-rose-700"}`}>
                    {isCorrect ? "Benar! ✨" : "Kurang tepat"}
                  </p>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onQuit} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
          Keluar
        </Button>
        {showExplanation && (
          <Button onClick={onNext} className="bg-emerald-700 hover:bg-emerald-800 text-white">
            {isLast ? "Lihat Hasil" : "Soal Berikutnya"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function QuizResultView({
  result,
  onRetry,
  onBack,
}: {
  result: QuizResult;
  onRetry: () => void;
  onBack: () => void;
}) {
  const percentage = Math.round((result.score / result.total) * 100);

  let grade: string, gradeColor: string, message: string;
  if (percentage >= 80) {
    grade = "Istimewa";
    gradeColor = "text-emerald-700 bg-emerald-100";
    message = "Masya Allah! Pemahamanmu sangat baik. Terus tingkatkan ilmu pertanianmu!";
  } else if (percentage >= 60) {
    grade = "Baik";
    gradeColor = "text-amber-700 bg-amber-100";
    message = "Bagus! Kamu sudah memahami dasar-dasarnya. Coba baca ulang materinya untuk hasil lebih baik.";
  } else {
    grade = "Perlu Belajar Lagi";
    gradeColor = "text-rose-700 bg-rose-100";
    message = "Jangan menyerah! Baca kembali materinya dan ulangi kuisnya. Insya Allah bisa lebih baik!";
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Score Card */}
      <Card className="border-emerald-300 shadow-lg shadow-emerald-100/50 overflow-hidden">
        <div className="h-2 gradient-emerald" />
        <CardContent className="p-6 sm:p-8 text-center">
          <Trophy className={`h-14 w-14 mx-auto mb-4 ${percentage >= 80 ? "text-amber-500" : percentage >= 60 ? "text-emerald-500" : "text-emerald-300"}`} />

          <h2 className="text-2xl font-bold text-emerald-900 mb-2">
            Hasil Kuis
          </h2>
          <p className="text-sm text-emerald-600 mb-6">{result.quiz.title}</p>

          {/* Score circle */}
          <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-emerald-200 bg-emerald-50 mb-4">
            <span className="text-4xl font-bold text-emerald-800">{percentage}</span>
            <span className="text-sm text-emerald-600">persen</span>
          </div>

          <div className="flex justify-center mb-4">
            <Badge className={`text-sm px-4 py-1 ${gradeColor}`}>{grade}</Badge>
          </div>

          <p className="text-sm text-emerald-700 max-w-md mx-auto mb-6 leading-relaxed">
            {message}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 mx-auto mb-1">
                <Target className="h-4 w-4 text-emerald-700" />
              </div>
              <p className="text-lg font-bold text-emerald-900">{result.total}</p>
              <p className="text-[10px] text-emerald-600">Total Soal</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 mx-auto mb-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              </div>
              <p className="text-lg font-bold text-emerald-900">{result.score}</p>
              <p className="text-[10px] text-emerald-600">Benar</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100 mx-auto mb-1">
                <XCircle className="h-4 w-4 text-rose-600" />
              </div>
              <p className="text-lg font-bold text-emerald-900">{result.total - result.score}</p>
              <p className="text-[10px] text-emerald-600">Salah</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review */}
      <Card className="border-emerald-200/50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Pembahasan Soal
          </h3>

          <div className="space-y-4">
            {result.quiz.questions.map((q, idx) => {
              const userAnswer = result.answers[idx];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={q.id} className={`rounded-xl p-4 border ${isCorrect ? "border-emerald-200 bg-emerald-50/50" : "border-rose-200 bg-rose-50/50"}`}>
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-emerald-900 mb-1">
                        <span className="text-emerald-500">#{q.id}</span> {q.question}
                      </p>
                      <p className="text-xs text-emerald-700 mb-1">
                        Jawabanmu: <span className={isCorrect ? "text-emerald-700 font-semibold" : "text-rose-600 font-semibold line-through"}>{q.options[userAnswer]}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-emerald-700 mb-1">
                          Jawaban benar: <span className="text-emerald-700 font-semibold">{q.options[q.correctAnswer]}</span>
                        </p>
                      )}
                      <p className="text-xs text-emerald-600 leading-relaxed mt-1">
                        💡 {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <Button onClick={onRetry} className="bg-emerald-700 hover:bg-emerald-800 text-white">
          <RotateCcw className="mr-2 h-4 w-4" />
          Ulangi Kuis
        </Button>
        <Button onClick={onBack} variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
          Pilih Kuis Lain
        </Button>
      </div>
    </div>
  );
}
