import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マーキー",
  category: "インタラクション",
  description: "ホバーで一時停止する無限スクロール。ロゴや告知に。",
  align: "full",
  isNew: true,
  tags: ["animation", "micro-interaction", "marquee"],
  principle:
    "途切れない動きは視線を引きつけつつ圧迫感が少ない。ホバーで止まることで読みたい情報をユーザーが制御できる。",
};

const ITEMS = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Soylent",
  "Hooli",
  "Stark Industries",
  "Wayne Enterprises",
];

function Track({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-4 px-2"
    >
      {ITEMS.map((label, i) => (
        <div
          key={`${label}-${i}`}
          className={cn(
            "flex items-center gap-2 rounded-full border bg-card px-5 py-2.5",
            "text-sm font-semibold text-card-foreground shadow-sm",
            "transition-colors hover:border-primary/50 hover:text-primary"
          )}
        >
          <Sparkles className="size-3.5 text-primary/70" />
          {label}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full space-y-3">
      <div className="flex justify-center">
        <Badge variant="secondary">
          {en ? "Trusted partners" : "信頼されるパートナー"}
        </Badge>
      </div>
      <div className="group relative flex w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex animate-[marquee_22s_linear_infinite] group-hover:[animation-play-state:paused]">
          <Track />
          <Track ariaHidden />
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  );
}
