"use client";

import { useState } from "react";
import Link from "next/link";
import { questions } from "@/data/questions";

export default function PruefungPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const q = questions[current];
  const isLast = current === questions.length - 1;

  function toggle(key: string) {
    if (revealed) return;
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function next() {
    setCurrent((c) => c + 1);
    setSelected([]);
    setRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prev() {
    setCurrent((c) => c - 1);
    setSelected([]);
    setRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-stone-400 hover:text-stone-600 text-lg">←</Link>
          <h1 className="font-semibold text-stone-800">Prüfungssimulation</h1>
          <span className="ml-auto text-xs text-stone-400">
            {current + 1} / {questions.length}
          </span>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="bg-stone-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 mb-4">
          <span className="text-xs font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {q.category}
          </span>
          <p className="font-medium text-stone-800 mt-3 mb-4 leading-snug">
            <span className="text-stone-400 mr-1">{q.id}.</span>
            {q.text}
          </p>

          <div className="flex flex-col gap-2">
            {q.options.map((opt) => {
              const isSelected = selected.includes(opt.key);
              const isCorrect = q.correct.includes(opt.key);

              let style =
                "flex items-start gap-3 p-3 rounded-xl border text-sm transition-all select-none ";

              if (revealed) {
                if (isCorrect && isSelected)
                  style += "bg-green-50 border-green-400 text-green-800";
                else if (isCorrect && !isSelected)
                  style += "bg-green-50 border-green-300 text-green-700";
                else if (!isCorrect && isSelected)
                  style += "bg-red-50 border-red-400 text-red-800";
                else
                  style += "bg-stone-50 border-stone-200 text-stone-500";
              } else if (isSelected) {
                style += "bg-blue-50 border-blue-400 text-blue-800 cursor-pointer";
              } else {
                style += "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300 cursor-pointer";
              }

              return (
                <button
                  key={opt.key}
                  className={style}
                  onClick={() => toggle(opt.key)}
                  disabled={revealed}
                >
                  <span
                    className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center text-xs font-bold
                      ${revealed && isCorrect ? "bg-green-500 border-green-500 text-white" : ""}
                      ${revealed && !isCorrect && isSelected ? "bg-red-400 border-red-400 text-white" : ""}
                      ${!revealed && isSelected ? "bg-blue-500 border-blue-500 text-white" : ""}
                      ${!revealed && !isSelected ? "border-stone-300 bg-white text-stone-400" : ""}
                    `}
                  >
                    {isSelected ? "✓" : opt.key.toUpperCase()}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {revealed && (
            <p className="mt-3 text-xs text-stone-400">
              Richtig:{" "}
              <span className="font-semibold text-green-700">
                {q.correct.map((k) => k.toUpperCase()).join(", ")}
              </span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {!revealed && (
            <button
              onClick={() => setRevealed(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-2xl transition-colors"
            >
              Richtige Antwort aufdecken
            </button>
          )}

          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={current === 0}
              className="flex-1 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium py-3 rounded-2xl transition-colors disabled:opacity-30"
            >
              ← Zurück
            </button>

            {!isLast ? (
              <button
                onClick={next}
                className="flex-1 bg-stone-800 hover:bg-stone-900 text-white font-medium py-3 rounded-2xl transition-colors"
              >
                Weiter →
              </button>
            ) : (
              <Link
                href="/"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-2xl transition-colors text-center"
              >
                Fertig! 🎉
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
