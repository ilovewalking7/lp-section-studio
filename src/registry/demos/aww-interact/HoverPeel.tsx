import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバーめくれ",
  category: "Awwwards",
  description: "ホバーで角がめくれ上がり、下に隠れたカラーが覗くピール演出のカード。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const cards = [
  { ja: "新着特集", en: "New Feature", c: "from-amber-300 to-orange-500" },
  { ja: "限定リリース", en: "Limited Drop", c: "from-rose-400 to-fuchsia-600" },
  { ja: "バックステージ", en: "Backstage", c: "from-cyan-300 to-blue-600" },
];

export default function HoverPeel() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="aww-peel relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.en} className="peel relative aspect-[4/5] cursor-pointer">
            <div className={`peel-under absolute inset-0 rounded-2xl bg-gradient-to-br ${c.c}`} />
            <div className="peel-top absolute inset-0 flex flex-col justify-end rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                {en ? "Peel" : "めくる"}
              </span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{en ? c.en : c.ja}</h3>
            </div>
            <span className="peel-corner absolute right-0 top-0 h-16 w-16 rounded-bl-2xl rounded-tr-2xl bg-neutral-700/90" />
          </div>
        ))}
      </div>

      <style>{`
        .peel-top {
          transition: clip-path .45s cubic-bezier(.16,1,.3,1);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        .peel-corner {
          transform: scale(0) rotate(-45deg);
          transform-origin: top right;
          transition: transform .45s cubic-bezier(.16,1,.3,1);
          box-shadow: -4px 4px 10px rgba(0,0,0,.4);
        }
        .peel:hover .peel-top {
          clip-path: polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%);
        }
        .peel:hover .peel-corner {
          transform: scale(1) rotate(0deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .peel-top, .peel-corner { transition: none; }
        }
      `}</style>
    </section>
  );
}
