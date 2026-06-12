"use client";

import { useState } from "react";
import Link from "next/link";
import { questions, totalMaxPoints } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";

type Answers = Record<number, string[]>;

export default function UebungstestPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  function toggle(qid: number, key: string) {
    setAnswers((prev) => {
      const cur = prev[qid] ?? [];
      return {
        ...prev,
        [qid]: cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key],
      };
    });
  }

  function calcScore() {
    let score = 0;
    for (const q of questions) {
      const sel = answers[q.id] ?? [];
      for (const k of q.options.map((o) => o.key)) {
        const isCorrect = q.correct.includes(k);
        const isSelected = sel.includes(k);
        if (isCorrect && isSelected) score += 2;
        if (!isCorrect && isSelected) score -= 2;
      }
    }
    return Math.max(0, score);
  }

  const score = submitted ? calcScore() : 0;
  const pct = submitted ? Math.round((score / totalMaxPoints) * 100) : 0;
  const passed = pct >= 70;

  const wrongQuestions = submitted
    ? questions.filter((q) => {
        const sel = answers[q.id] ?? [];
        return (
          sel.some((k) => !q.correct.includes(k)) ||
          q.correct.some((k) => !sel.includes(k))
        );
      })
    : [];

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50">
        <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => { setSubmitted(false); setAnswers({}); }}
              className="text-stone-400 hover:text-stone-600 text-lg"
            >
              ←
            </button>
            <h1 className="font-semibold text-stone-800">Auswertung</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6">
          <div className={`rounded-2xl p-6 mb-6 text-center ${passed ? "bg-green-50 border border-green-300" : "bg-red-50 border border-red-300"}`}>
            <div className="text-4xl mb-2">{passed ? "🎉" : "📚"}</div>
            <p className={`text-2xl font-bold ${passed ? "text-green-800" : "text-red-800"}`}>
              {pct} % — {passed ? "Bestanden!" : "Nicht bestanden"}
            </p>
            <p className="text-sm mt-1 text-stone-500">
              {score} von {totalMaxPoints} Punkten · {wrongQuestions.length} Fehler
            </p>
            <div className="mt-3 bg-stone-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${passed ? "bg-green-500" : "bg-red-400"}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <p className="text-xs text-stone-400 mt-1">Mindestens 70 % zum Bestehen</p>
          </div>

          {wrongQuestions.length > 0 && (
            <div>
              <h2 className="font-semibold text-stone-700 mb-3">
                Fehlerübersicht ({wrongQuestions.length} Fragen)
              </h2>
              <div className="flex flex-col gap-5">
                {wrongQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    selected={answers[q.id] ?? []}
                    onToggle={() => {}}
                    submitted={true}
                  />
                ))}
              </div>
            </div>
          )}

          {wrongQuestions.length === 0 && (
            <p className="text-center text-stone-500">Alle Fragen richtig beantwortet! 🏆</p>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-stone-400 hover:text-stone-600 text-lg">←</Link>
          <h1 className="font-semibold text-stone-800">Übungstest</h1>
          <span className="ml-auto text-xs text-stone-400">
            {Object.keys(answers).length} / {questions.length} beantwortet
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selected={answers[q.id] ?? []}
            onToggle={(key) => toggle(q.id, key)}
          />
        ))}

        <button
          onClick={() => setSubmitted(true)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-colors text-lg shadow-sm"
        >
          Auswertung anzeigen →
        </button>
      </main>
    </div>
  );
}
