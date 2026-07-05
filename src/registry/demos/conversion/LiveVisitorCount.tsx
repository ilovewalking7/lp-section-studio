import { useEffect, useRef, useState } from "react";
import { Eye, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ライブ閲覧者数",
  category: "コンバージョン",
  description:
    "「今○人が見ています」を時間とともに変動させるライブ閲覧者バッジ。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["live", "scarcity", "fomo"],
  principle:
    "同じページに大勢がいると示す混雑効果が希少性の感覚を生み、『出遅れたくない』という競争心理で意思決定を加速させる。",
};

export default function LiveVisitorCount() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [count, setCount] = useState(34);
  const [dir, setDir] = useState<"up" | "down">("up");
  const prev = useRef(34);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = Math.min(58, Math.max(21, c + delta));
        setDir(next >= prev.current ? "up" : "down");
        prev.current = next;
        return next;
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="inline-flex items-center gap-3 rounded-full border bg-card py-2 pl-3 pr-4 shadow-sm">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
        </span>
        <Eye className="size-4 text-muted-foreground" />
        <p className="text-sm">
          {en ? (
            <>
              <span className="font-semibold tabular-nums text-foreground">
                {count}
              </span>{" "}
              people are viewing this product
            </>
          ) : (
            <>
              今{" "}
              <span className="font-semibold tabular-nums text-foreground">
                {count}
              </span>{" "}
              人がこの商品を見ています
            </>
          )}
        </p>
        <span
          className={cn(
            "inline-flex items-center transition-colors",
            dir === "up" ? "text-emerald-500" : "text-muted-foreground/50"
          )}
        >
          <TrendingUp
            className={cn(
              "size-3.5 transition-transform",
              dir === "down" && "rotate-180"
            )}
          />
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="flex -space-x-2">
          {["from-rose-500 to-pink-500", "from-sky-500 to-indigo-500", "from-amber-500 to-orange-500"].map(
            (h, i) => (
              <span
                key={i}
                className={cn(
                  "size-5 rounded-full border-2 border-background bg-gradient-to-br",
                  h
                )}
              />
            )
          )}
        </span>
        {en ? "240 viewed in the last hour" : "過去1時間で 240人 が閲覧"}
      </div>
    </div>
  );
}
