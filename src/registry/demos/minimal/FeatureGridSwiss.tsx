import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スイス・フィーチャー",
  category: "ミニマル",
  description: "通し番号を持つ、厳格なモジュラー機能グリッド。",
  align: "full",
  isNew: true,
  tags: ["minimal", "swiss", "grid"],
  principle: "均等なモジュールと番号で、機能群を体系的に読み解かせる。",
};

const features = [
  {
    no: "01",
    ja: "グリッド設計",
    en: "Grid system",
    bodyJa: "8pt基準のモジュラーグリッドで、すべての要素を整然と配置する。",
    bodyEn: "An 8pt modular grid keeps every element in precise order.",
  },
  {
    no: "02",
    ja: "タイプスケール",
    en: "Type scale",
    bodyJa: "比率に基づく明快な見出し階層が、読みやすさを担保する。",
    bodyEn: "A ratio-based heading hierarchy ensures clear readability.",
  },
  {
    no: "03",
    ja: "ヘアライン",
    en: "Hairlines",
    bodyJa: "1pxの罫線のみで領域を区切り、影や塗りに頼らない。",
    bodyEn: "Only 1px rules divide regions — no shadows, no fills.",
  },
  {
    no: "04",
    ja: "余白の設計",
    en: "Whitespace",
    bodyJa: "意図的な空白がリズムを生み、密度を制御する。",
    bodyEn: "Deliberate space creates rhythm and controls density.",
  },
  {
    no: "05",
    ja: "モノクローム",
    en: "Monochrome",
    bodyJa: "無彩色を基調に、ただ一点のアクセントだけを許容する。",
    bodyEn: "An achromatic base allows just a single accent.",
  },
  {
    no: "06",
    ja: "反転テーマ",
    en: "Inverted theme",
    bodyJa: "明暗を入れ替えても破綻しない、対称的な配色設計。",
    bodyEn: "A symmetric palette that holds up when light and dark swap.",
  },
];

export default function FeatureGridSwiss() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-white font-sans text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-16 grid grid-cols-12 items-end gap-6 border-b border-neutral-200 pb-6">
          <h2 className="col-span-12 text-3xl font-medium tracking-tight md:col-span-8 md:text-4xl">
            {en ? "Design principles" : "設計の原理"}
          </h2>
          <p className="col-span-12 text-sm text-neutral-500 md:col-span-4 md:text-right">
            Six principles of the International Typographic Style.
          </p>
        </header>

        <div className="grid grid-cols-1 border-l border-t border-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.no}
              className="flex min-h-56 flex-col border-b border-r border-neutral-200 p-8 transition-colors hover:bg-neutral-50"
            >
              <span className="mb-10 text-[11px] tabular-nums tracking-[0.25em] text-neutral-400">
                {f.no}
              </span>
              <h3 className="mb-3 text-lg font-medium tracking-tight">
                {en ? f.en : f.ja}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                {en ? f.bodyEn : f.bodyJa}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
