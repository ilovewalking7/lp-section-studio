import { Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブランドティッカー",
  category: "マーキー",
  description: "ニュース速報風の細いスクロールテキスト帯。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "ticker"],
};

const HEADLINES = [
  { ja: "新機能をリリースしました", en: "New feature just shipped" },
  { ja: "ユーザー数 100,000 突破", en: "Over 100,000 users" },
  { ja: "今週末限定セール開催中", en: "Weekend-only sale on now" },
  { ja: "新しいインテグレーションに対応", en: "New integrations supported" },
  { ja: "カンファレンスのチケット販売開始", en: "Conference tickets on sale" },
  { ja: "アップタイム 99.99% を達成", en: "Achieved 99.99% uptime" },
];

export default function BrandTicker() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const line = [...HEADLINES, ...HEADLINES];
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes brandTickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .brand-ticker-track { animation: brandTickerScroll 22s linear infinite; }
        .brand-ticker-band:hover .brand-ticker-track { animation-play-state: paused; }
      `}</style>
      <div className="brand-ticker-band group relative flex items-center overflow-hidden bg-primary text-primary-foreground">
        <span className="z-10 flex shrink-0 items-center gap-1.5 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-[8px_0_12px_-4px_rgba(0,0,0,0.4)]">
          <Sparkles className="size-3.5" />
          NEWS
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="brand-ticker-track flex w-max items-center">
            {line.map((h, i) => (
              <span key={i} className="flex shrink-0 items-center text-sm font-medium">
                <span className="px-6">{en ? h.en : h.ja}</span>
                <span className="text-primary-foreground/50">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
