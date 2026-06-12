"use client";

import { Question } from "@/data/questions";

type Props = {
  question: Question;
  selected: string[];
  onToggle: (key: string) => void;
  revealed?: boolean;
  submitted?: boolean;
};

export default function QuestionCard({
  question,
  selected,
  onToggle,
  revealed = false,
  submitted = false,
}: Props) {
  const showCorrect = revealed || submitted;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
      <div className="flex items-start gap-2 mb-1">
        <span className="text-xs font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full shrink-0">
          {question.category}
        </span>
      </div>
      <p className="font-medium text-stone-800 mt-2 mb-4 leading-snug">
        <span className="text-stone-400 mr-1">{question.id}.</span>
        {question.text}
      </p>

      <div className="flex flex-col gap-2">
        {question.options.map((opt) => {
          const isSelected = selected.includes(opt.key);
          const isCorrect = question.correct.includes(opt.key);

          let style =
            "flex items-start gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-all select-none ";

          if (showCorrect) {
            if (isCorrect && isSelected)
              style += "bg-green-50 border-green-400 text-green-800";
            else if (isCorrect && !isSelected)
              style += "bg-green-50 border-green-300 text-green-700 opacity-80";
            else if (!isCorrect && isSelected)
              style += "bg-red-50 border-red-400 text-red-800";
            else
              style += "bg-stone-50 border-stone-200 text-stone-500";
          } else if (isSelected) {
            style += "bg-blue-50 border-blue-400 text-blue-800";
          } else {
            style += "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300";
          }

          return (
            <button
              key={opt.key}
              className={style}
              onClick={() => !showCorrect && onToggle(opt.key)}
              disabled={showCorrect}
            >
              <span
                className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center text-xs font-bold
                  ${showCorrect && isCorrect ? "bg-green-500 border-green-500 text-white" : ""}
                  ${showCorrect && !isCorrect && isSelected ? "bg-red-400 border-red-400 text-white" : ""}
                  ${!showCorrect && isSelected ? "bg-blue-500 border-blue-500 text-white" : ""}
                  ${!showCorrect && !isSelected ? "border-stone-300 bg-white" : ""}
                `}
              >
                {isSelected ? "✓" : opt.key.toUpperCase()}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {showCorrect && (
        <p className="mt-3 text-xs text-stone-400">
          Richtig:{" "}
          <span className="font-semibold text-green-700">
            {question.correct.map((k) => k.toUpperCase()).join(", ")}
          </span>
        </p>
      )}
    </div>
  );
}
