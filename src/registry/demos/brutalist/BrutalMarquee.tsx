import { Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・マーキー",
  category: "ブルータリスト",
  description: "CSSキーフレームで流れる極太テキストのマーキー帯。",
  align: "full",
  isNew: true,
  tags: ["brutalist", "bold", "marquee"],
};

const items = [
  { ja: "生のまま", en: "Raw" },
  { ja: "妥協なし", en: "No compromise" },
  { ja: "即出荷", en: "Ship now" },
  { ja: "型安全", en: "Type-safe" },
  { ja: "高コントラスト", en: "High contrast" },
  { ja: "ハードシャドウ", en: "Hard shadow" },
];

export default function BrutalMarquee() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-black py-10 font-sans">
      <style>{`
        @keyframes brutal-marquee-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .brutal-marquee-track {
          display: flex;
          width: max-content;
          animation: brutal-marquee-x 18s linear infinite;
        }
        .brutal-marquee-host:hover .brutal-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .brutal-marquee-track { animation: none; }
        }
      `}</style>

      <div className="brutal-marquee-host overflow-hidden border-y-4 border-yellow-300 bg-fuchsia-400 py-4">
        <div className="brutal-marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {items.map((t) => (
                <span
                  key={t.en}
                  className="flex items-center gap-4 px-6 text-3xl font-black uppercase tracking-tight text-black sm:text-4xl"
                >
                  {en ? t.en : t.ja}
                  <Star
                    className="h-6 w-6"
                    fill="black"
                    strokeWidth={0}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
