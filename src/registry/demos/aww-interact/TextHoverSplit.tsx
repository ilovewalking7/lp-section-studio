import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "テキスト分裂ホバー",
  category: "Awwwards",
  description: "ホバーで一文字ずつ上下に割れてアクセント色が覗く、分裂タイポ。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const words = ["DESIGN", "MOTION"];

export default function TextHoverSplit() {
  return (
    <section className="aww-split relative w-full bg-neutral-950 px-6 py-28 text-neutral-50 sm:px-16">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-6">
        {words.map((w) => (
          <h2
            key={w}
            className="split-word flex cursor-pointer select-none font-semibold leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
          >
            {w.split("").map((ch, i) => (
              <span
                key={`${w}-${i}`}
                className="split-char relative inline-block"
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                <span className="split-top block">{ch}</span>
                <span aria-hidden className="split-bot absolute left-0 top-0 block text-amber-300">
                  {ch}
                </span>
              </span>
            ))}
          </h2>
        ))}
      </div>

      <style>{`
        .split-char { overflow: visible; }
        .split-top, .split-bot {
          transition: transform .45s cubic-bezier(.16,1,.3,1), opacity .45s ease;
        }
        .split-char .split-top { clip-path: inset(0 0 0 0); }
        .split-bot { opacity: 0; }
        .split-word:hover .split-top { transform: translateY(-12%); }
        .split-word:hover .split-bot { transform: translateY(12%); opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .split-top, .split-bot { transition: none; }
        }
      `}</style>
    </section>
  );
}
