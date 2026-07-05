import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マスク出現グリッド",
  category: "Awwwards",
  description: "ホバーでマスクが解け、各セルのコンテンツがクリップ展開するグリッド。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const cells = [
  { ja: "戦略", en: "Strategy", g: "from-amber-400 to-orange-600" },
  { ja: "設計", en: "Design", g: "from-rose-400 to-pink-600" },
  { ja: "実装", en: "Build", g: "from-cyan-400 to-blue-600" },
  { ja: "運用", en: "Operate", g: "from-emerald-400 to-teal-600" },
  { ja: "計測", en: "Measure", g: "from-violet-400 to-purple-600" },
  { ja: "改善", en: "Improve", g: "from-sky-400 to-indigo-600" },
];

export default function RevealMaskGrid() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="aww-mask relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-4 sm:grid-cols-3">
        {cells.map((c) => (
          <div
            key={c.en}
            className="mask-cell group relative aspect-square overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900"
          >
            <div
              className={`mask-fill absolute inset-0 bg-gradient-to-br ${c.g}`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="mask-label text-2xl font-semibold tracking-tight text-white">
                {en ? c.en : c.ja}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .mask-fill {
          clip-path: inset(100% 0 0 0);
          transition: clip-path .5s cubic-bezier(.16,1,.3,1);
        }
        .mask-cell:hover .mask-fill {
          clip-path: inset(0 0 0 0);
        }
        .mask-label {
          transition: transform .5s cubic-bezier(.16,1,.3,1);
        }
        .mask-cell:hover .mask-label {
          transform: scale(1.15);
        }
        @media (prefers-reduced-motion: reduce) {
          .mask-fill, .mask-label { transition: none; }
        }
      `}</style>
    </section>
  );
}
