import { Bell, GitBranch, Heart, MessageSquare, Star, UserPlus } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "縦マーキー",
  category: "マーキー",
  description: "カードが縦方向に無限スクロールする2カラム。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "vertical"],
};

const FEED = [
  { Icon: Star, color: "text-amber-500", text: "新しいスター ⭐ を獲得しました", textEn: "Earned a new star ⭐" },
  { Icon: GitBranch, color: "text-violet-500", text: "main に 12 件マージ", textEn: "12 merges into main" },
  { Icon: UserPlus, color: "text-sky-500", text: "12 名が新規参加しました", textEn: "12 new members joined" },
  { Icon: Heart, color: "text-rose-500", text: "投稿が 240 いいね", textEn: "Your post got 240 likes" },
  { Icon: MessageSquare, color: "text-emerald-500", text: "コメントが 8 件届きました", textEn: "8 new comments arrived" },
  { Icon: Bell, color: "text-orange-500", text: "デプロイが完了しました", textEn: "Deploy completed" },
];

type Item = (typeof FEED)[number];

function Column({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="relative h-full flex-1 overflow-hidden">
      <div
        className="flex flex-col gap-3"
        style={{
          animation: `verticalMarqueeScroll 18s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {[...items, ...items].map(({ Icon, color, text, textEn }, i) => (
          <div
            key={`${textEn}-${i}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
          >
            <Icon className={`size-5 shrink-0 ${color}`} />
            <span className="text-sm font-medium text-foreground">{en ? textEn : text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VerticalMarquee() {
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes verticalMarqueeScroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>
      <div
        className="group flex h-80 gap-3 overflow-hidden [&:hover_*]:[animation-play-state:paused]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <Column items={FEED} />
        <Column items={[...FEED].reverse()} reverse />
      </div>
    </div>
  );
}
