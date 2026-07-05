import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レビューマーキー",
  category: "マーキー",
  description: "星評価付きレビューチップが横スクロール。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "review"],
};

const REVIEWS = [
  { name: "@mina", stars: 5, ja: "最高の体験。もう戻れない。", en: "Best experience ever. No going back." },
  { name: "@kenji", stars: 5, ja: "サポートが神対応でした。", en: "The support was incredible." },
  { name: "@aria", stars: 4, ja: "ほぼ完璧。あと一歩で満点。", en: "Nearly perfect. So close to flawless." },
  { name: "@leo", stars: 5, ja: "圧倒的に速くて快適。", en: "Blazing fast and a joy to use." },
  { name: "@sora", stars: 5, ja: "毎日使う必需品になった。", en: "It's become a daily must-have." },
  { name: "@yui", stars: 4, ja: "価格以上の価値あり。", en: "Worth far more than the price." },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < count ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
          )}
        />
      ))}
    </span>
  );
}

export default function ReviewMarquee() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes reviewMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .review-track { animation: reviewMarqueeScroll 32s linear infinite; }
        .review-mask:hover .review-track { animation-play-state: paused; }
      `}</style>
      <div
        className="review-mask group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="review-track flex w-max items-center gap-4 pr-4">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div
              key={`${r.name}-${i}`}
              className="flex shrink-0 items-center gap-3 rounded-full border border-border bg-card py-2.5 pl-4 pr-5 shadow-sm"
            >
              <Stars count={r.stars} />
              <span className="text-sm font-medium text-foreground">{en ? r.en : r.ja}</span>
              <span className="text-xs text-muted-foreground">{r.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
