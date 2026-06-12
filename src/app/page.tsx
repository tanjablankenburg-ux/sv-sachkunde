import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-stone-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🐕</div>
          <h1 className="text-3xl font-bold text-stone-800">SV Sachkundeprüfung</h1>
          <p className="text-stone-500 mt-2 text-sm">
            FCI-BH/VT · 154 Fragen · Stand 2025
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/lernen">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:border-green-400 hover:shadow-md transition-all flex items-start gap-4 cursor-pointer">
              <div className="bg-green-100 rounded-xl p-3 text-2xl">📖</div>
              <div>
                <h2 className="font-semibold text-stone-800 text-lg">Lernmodus</h2>
                <p className="text-stone-500 text-sm mt-1">
                  Alle Fragen mit aufgedeckten Antworten durchblättern.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/uebungstest">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:border-blue-400 hover:shadow-md transition-all flex items-start gap-4 cursor-pointer">
              <div className="bg-blue-100 rounded-xl p-3 text-2xl">📝</div>
              <div>
                <h2 className="font-semibold text-stone-800 text-lg">Übungstest</h2>
                <p className="text-stone-500 text-sm mt-1">
                  Alle 154 Fragen beantworten — am Ende Auswertung mit Fehlerübersicht.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/pruefung">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-4 cursor-pointer">
              <div className="bg-amber-100 rounded-xl p-3 text-2xl">🎓</div>
              <div>
                <h2 className="font-semibold text-stone-800 text-lg">Prüfungssimulation</h2>
                <p className="text-stone-500 text-sm mt-1">
                  Fragen ankreuzen und bei Bedarf die richtige Antwort aufdecken.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-center text-xs text-stone-400 mt-8">
          Für jede richtige Antwort +2 Pkt · für jede falsche −2 Pkt · Bestehen: ≥ 70 %
        </p>
      </div>
    </main>
  );
}
