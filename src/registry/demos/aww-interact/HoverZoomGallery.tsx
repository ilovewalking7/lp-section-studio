import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバーズーム・ギャラリー",
  category: "Awwwards",
  description: "ホバーした列が広がり、他が縮むエクスパンド型ズームギャラリー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const cols = [
  { ja: "黎明", en: "Dawn", g: "from-amber-300 to-orange-600" },
  { ja: "正午", en: "Noon", g: "from-sky-300 to-blue-600" },
  { ja: "黄昏", en: "Dusk", g: "from-rose-400 to-fuchsia-700" },
  { ja: "深夜", en: "Midnight", g: "from-indigo-500 to-slate-900" },
];

export default function HoverZoomGallery() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="aww-zoom relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div className="zoom-row mx-auto flex h-[420px] max-w-[1100px] gap-3">
        {cols.map((c) => (
          <div
            key={c.en}
            className={`zoom-item relative flex-1 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b ${c.g}`}
          >
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute bottom-6 left-6 rotate-0 text-xl font-semibold tracking-tight text-white drop-shadow">
              {en ? c.en : c.ja}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        .zoom-item {
          transition: flex .55s cubic-bezier(.16,1,.3,1), filter .4s ease;
        }
        .zoom-row:hover .zoom-item {
          flex: .65;
          filter: brightness(.65) saturate(.8);
        }
        .zoom-row .zoom-item:hover {
          flex: 3;
          filter: brightness(1.05) saturate(1.1);
        }
        @media (prefers-reduced-motion: reduce) {
          .zoom-item { transition: none; }
        }
      `}</style>
    </section>
  );
}
