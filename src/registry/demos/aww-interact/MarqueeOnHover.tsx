import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバー・マーキー",
  category: "Awwwards",
  description: "ホバーすると行内テキストが横に流れ出す、リンク連動のマーキー一覧。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const rows = [
  { ja: "AWWWARDS 受賞", en: "AWWWARDS WINNER" },
  { ja: "FWA 掲載", en: "FEATURED ON FWA" },
  { ja: "CSS DESIGN AWARDS", en: "CSS DESIGN AWARDS" },
  { ja: "SITE OF THE DAY", en: "SITE OF THE DAY" },
];

export default function MarqueeOnHover() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="aww-mq relative w-full overflow-hidden bg-neutral-950 px-0 py-24 text-neutral-50">
      <div className="mx-auto max-w-[1100px] divide-y divide-neutral-800 border-y border-neutral-800">
        {rows.map((r) => (
          <a
            key={r.en}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mq-row group relative flex items-center overflow-hidden py-8"
          >
            <div className="mq-track flex shrink-0 whitespace-nowrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-6 text-3xl font-semibold tracking-tight text-neutral-300 transition-colors group-hover:text-amber-300 sm:text-5xl"
                >
                  {en ? r.en : r.ja}
                  <span aria-hidden className="ml-12 text-neutral-700">
                    /
                  </span>
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .mq-track {
          transform: translateX(0);
          animation: mq-scroll 18s linear infinite;
          animation-play-state: paused;
        }
        .mq-row:hover .mq-track {
          animation-play-state: running;
        }
        @keyframes mq-scroll {
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mq-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
