import { Hash } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "タグマーキー",
  category: "マーキー",
  description: "ピル型タグチップが横スクロールするトピック帯。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "tags"],
};

const TAGS = [
  { ja: "デザインシステム", en: "Design system" },
  { ja: "TypeScript", en: "TypeScript" },
  { ja: "アクセシビリティ", en: "Accessibility" },
  { ja: "パフォーマンス", en: "Performance" },
  { ja: "Tailwind", en: "Tailwind" },
  { ja: "アニメーション", en: "Animation" },
  { ja: "UX", en: "UX" },
  { ja: "状態管理", en: "State management" },
  { ja: "テスト", en: "Testing" },
  { ja: "国際化", en: "i18n" },
  { ja: "コンポーネント", en: "Components" },
  { ja: "ダークモード", en: "Dark mode" },
];

const ACCENTS = [
  "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
];

export default function TagMarquee() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes tagMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tag-track { animation: tagMarqueeScroll 30s linear infinite; }
        .tag-mask:hover .tag-track { animation-play-state: paused; }
      `}</style>
      <div
        className="tag-mask group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="tag-track flex w-max items-center gap-3 pr-3">
          {[...TAGS, ...TAGS].map((tag, i) => (
            <span
              key={`${tag.en}-${i}`}
              className={`flex shrink-0 items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium ${ACCENTS[i % ACCENTS.length]}`}
            >
              <Hash className="size-3.5 opacity-70" />
              {en ? tag.en : tag.ja}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
