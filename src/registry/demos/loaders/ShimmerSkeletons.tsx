import { useState } from "react";
import { Star } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "シマースケルトン",
  category: "ローダー・マイクロ",
  description: "カード・リスト・プロフィールのシマーローディング。コンテンツに切替可能。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "skeleton"],
};

const styles = `
@keyframes ldr-shimmer { 100% { transform: translateX(100%); } }
.ldr-shimmer { position: relative; overflow: hidden; }
.ldr-shimmer::after {
  content: ""; position: absolute; inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.08), transparent);
  animation: ldr-shimmer 1.4s infinite;
}
`;

function Bar({ className }: { className?: string }) {
  return <div className={cn("ldr-shimmer rounded-md bg-muted", className)} />;
}

export default function ShimmerSkeletons() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-sm">
      <style>{styles}</style>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {loading
            ? en
              ? "Loading…"
              : "読み込み中…"
            : en
              ? "Loaded"
              : "読み込み完了"}
        </span>
        <button
          type="button"
          onClick={() => setLoading((v) => !v)}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
        >
          {loading
            ? en
              ? "Show content"
              : "コンテンツ表示"
            : en
              ? "Reload"
              : "再ロード"}
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        {/* Profile row */}
        <div className="flex items-center gap-3">
          {loading ? (
            <Bar className="h-12 w-12 rounded-full" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
              AK
            </div>
          )}
          <div className="flex-1 space-y-2">
            {loading ? (
              <>
                <Bar className="h-3.5 w-1/2" />
                <Bar className="h-3 w-1/3" />
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-foreground">
                  {en ? "Kyoko Asahi" : "あさひ きょうこ"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {en ? "Product Designer" : "プロダクトデザイナー"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Card image */}
        <div className="mt-4">
          {loading ? (
            <Bar className="h-32 w-full" />
          ) : (
            <div className="flex h-32 w-full items-center justify-center rounded-md bg-gradient-to-br from-primary/30 to-primary/5 text-sm text-muted-foreground">
              {en ? "Preview" : "プレビュー"}
            </div>
          )}
        </div>

        {/* Text lines */}
        <div className="mt-4 space-y-2">
          {loading ? (
            <>
              <Bar className="h-3 w-full" />
              <Bar className="h-3 w-full" />
              <Bar className="h-3 w-2/3" />
            </>
          ) : (
            <p className="text-sm leading-relaxed text-foreground">
              {en
                ? "A library of 260+ production-quality components. Ready to reuse right away."
                : "260個以上の本番品質コンポーネントを収録したライブラリです。すぐに流用できます。"}
            </p>
          )}
        </div>

        {/* List */}
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              {loading ? (
                <>
                  <Bar className="h-8 w-8 rounded-md" />
                  <Bar className="h-3 flex-1" />
                </>
              ) : (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">
                    {en ? `Item ${i + 1}` : `項目 ${i + 1}`}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
