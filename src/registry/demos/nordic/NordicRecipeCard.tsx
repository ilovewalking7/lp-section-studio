import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧レシピカード",
  category: "北欧",
  description: "材料とライン画を添えたhyggeなレシピ／カフェカード。",
  align: "center",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "手順を分けず材料に絞ることで、気軽に作れそうという親しみを生む。",
};

const ingredients = [
  { ja: "カルダモン入り生地", en: "Cardamom dough" },
  { ja: "シナモンバター", en: "Cinnamon butter" },
  { ja: "きび砂糖", en: "Raw cane sugar" },
  { ja: "パールシュガー", en: "Pearl sugar" },
];

const meta3 = [
  { id: "time", labelJa: "時間", labelEn: "Time", valueJa: "45分", valueEn: "45 min" },
  { id: "yield", labelJa: "個数", labelEn: "Makes", valueJa: "12個", valueEn: "12 buns" },
  { id: "level", labelJa: "難易度", labelEn: "Level", valueJa: "やさしい", valueEn: "Easy" },
];

export default function NordicRecipeCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <article className="w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-[#faf8f3] font-sans text-[#3a3a38] shadow-[0_30px_70px_-46px_rgba(58,58,56,0.45)]">
      <div className="relative flex h-48 items-center justify-center bg-[#eae5d8]">
        <span className="absolute left-5 top-5 rounded-full bg-[#c08457]/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#c08457]">
          Fika
        </span>
        {/* line-art cinnamon bun + coffee */}
        <svg viewBox="0 0 200 120" className="h-full w-full p-6" fill="none">
          <g stroke="#c08457" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="70" cy="62" r="34" />
            <path d="M70 62a18 18 0 0 1 18-18M70 62a18 18 0 0 0-18 18M70 62a10 10 0 0 1-10 10M70 62a10 10 0 0 0 10-10" />
          </g>
          <g stroke="#7d92a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M120 50h44v18a22 22 0 0 1-22 22h0a22 22 0 0 1-22-22z" />
            <path d="M164 56h10a8 8 0 0 1 0 16h-10" />
            <path d="M134 40c0-6 4-6 4-12M148 40c0-6 4-6 4-12" stroke="#8a9a7b" />
          </g>
        </svg>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-medium leading-snug">
          {en ? "Cardamom Cinnamon Rolls" : "カルダモンのシナモンロール"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#3a3a38]/60">
          {en
            ? "For an afternoon fika — soft, fragrant rolls, a Nordic classic."
            : "午後のフィーカに。スパイスが香る、ふんわり優しい北欧の定番菓子。"}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <div className="flex text-[#c08457]">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 17l-6 3.4L7.5 13l-5-4.3 6.6-.6z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-[#3a3a38]/50">
            {en ? "4.0 · 218 reviews" : "4.0 · 218件"}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-[#f4f1ea] p-4 text-center">
          {meta3.map((m) => (
            <div key={m.id}>
              <p className="text-sm font-medium">{en ? m.valueEn : m.valueJa}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-[#3a3a38]/45">
                {en ? m.labelEn : m.labelJa}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8a9a7b]">
            {en ? "Ingredients" : "材料"}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-[#3a3a38]/75">
            {ingredients.map((ing) => (
              <li key={ing.en} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c08457]" />
                {en ? ing.en : ing.ja}
              </li>
            ))}
          </ul>
        </div>

        <button className="mt-7 w-full rounded-full bg-[#3a3a38] py-3 text-sm font-medium text-[#f4f1ea] transition-colors hover:bg-[#3a3a38]/90">
          {en ? "Save recipe" : "レシピを保存する"}
        </button>
      </div>
    </article>
  );
}
