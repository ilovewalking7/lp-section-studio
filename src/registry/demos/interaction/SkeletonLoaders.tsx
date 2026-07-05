import { useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スケルトンローダー",
  category: "インタラクション",
  description: "シマー付きスケルトンと実コンテンツを切替えるセット。",
  align: "center",
  isNew: true,
  tags: ["animation", "micro-interaction", "loading"],
  principle:
    "読込中に最終レイアウトの輪郭を見せることで体感待ち時間が短く感じられ（知覚パフォーマンス）、空白やスピナーより不安が少ない。",
};

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite]",
        "after:bg-gradient-to-r after:from-transparent after:via-foreground/10 after:to-transparent",
        className
      )}
    />
  );
}

export default function SkeletonLoaders() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {loading
            ? en
              ? "Loading…"
              : "読み込み中…"
            : en
              ? "Loaded"
              : "読み込み完了"}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setLoading((v) => !v)}
        >
          <RefreshCw
            className={cn("size-3.5", loading && "animate-spin")}
          />
          {en ? "Reload" : "再読込"}
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4 p-5">
          {/* avatar + title */}
          <div className="flex items-center gap-3">
            {loading ? (
              <Shimmer className="size-12 rounded-full" />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-base font-semibold text-primary">
                CL
              </div>
            )}
            <div className="flex-1 space-y-2">
              {loading ? (
                <>
                  <Shimmer className="h-4 w-2/3" />
                  <Shimmer className="h-3 w-1/3" />
                </>
              ) : (
                <>
                  <div className="text-sm font-semibold">
                    {en ? "Claude" : "Claude さん"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {en ? "Product Designer" : "プロダクトデザイナー"}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* body lines */}
          <div className="space-y-2">
            {loading ? (
              <>
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-[92%]" />
                <Shimmer className="h-3 w-3/4" />
              </>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {en
                  ? "The motion in the details defines how a product feels. Let's make even the wait a pleasant experience."
                  : "細部に宿る動きが、製品の印象を決めます。待ち時間さえも心地よい体験にしましょう。"}
              </p>
            )}
          </div>

          {/* list rows */}
          <div className="space-y-2 border-t pt-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                {loading ? (
                  <>
                    <Shimmer className="size-5 rounded-sm" />
                    <Shimmer className={cn("h-3", ["w-2/5", "w-1/2", "w-1/3"][i])} />
                    <Shimmer className="ml-auto h-3 w-10" />
                  </>
                ) : (
                  <>
                    <span className="flex size-5 items-center justify-center rounded-sm bg-emerald-500/15 text-emerald-500">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-sm">タスク {i + 1} を完了</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      完了
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
