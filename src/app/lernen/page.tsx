"use client";

import { useState } from "react";
import Link from "next/link";
import { questions, CATEGORIES } from "@/data/questions";

export default function LernPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? questions
      : questions.filter((q) => q.category === activeCategory);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-stone-400 hover:text-stone-600 text-lg">←</Link>
          <h1 className="font-semibold text-stone-800">Lernmodus</h1>
          <span className="ml-auto text-xs text-stone-400">{filtered.length} Fragen</span>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeCategory === "all"
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
            }`}
          >
            Alle
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-stone-800 text-white border-stone-800"
                  : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
              }`}
            >
              {cat.split(".")[0].trim()}.
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">
        {filtered.map((q) => (
          <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
            <span className="text-xs font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
              {q.category}
            </span>
            <p className="font-medium text-stone-800 mt-3 mb-4 leading-snug">
              <span className="text-stone-400 mr-1">{q.id}.</span>
              {q.text}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt) => {
                const isCorrect = q.correct.includes(opt.key);
                return (
                  <div
                    key={opt.key}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${
                      isCorrect
                        ? "bg-green-50 border-green-300 text-green-800"
                        : "bg-stone-50 border-stone-200 text-stone-500"
                    }`}
                  >
                    <span
                      className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center text-xs font-bold ${
                        isCorrect
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-stone-300 bg-white text-stone-400"
                      }`}
                    >
                      {isCorrect ? "✓" : opt.key.toUpperCase()}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
