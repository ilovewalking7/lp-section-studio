import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ページネーション",
  category: "ナビゲーション",
  description:
    "前後ボタン・省略記号付きページ番号・アクティブページを useState で制御するページャ。",
  align: "center",
  isNew: true,
  tags: ["navigation", "pagination"],
  principle:
    "現在ページ周辺と端のみ表示して選択肢を絞り（ヒックの法則）、十分な当たり判定で誤タップを防ぐ（フィッツの法則）。",
};

const TOTAL = 24;

function buildRange(current: number, total: number): (number | "…")[] {
  const delta = 1;
  const pages: (number | "…")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  pages.push(1);
  if (left > 2) pages.push("…");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("…");
  if (total > 1) pages.push(total);
  return pages;
}

export default function Pagination() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [page, setPage] = useState(7);
  const pages = buildRange(page, TOTAL);

  const go = (p: number) => setPage(Math.min(TOTAL, Math.max(1, p)));

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border bg-card p-6 shadow-sm">
        <nav aria-label={en ? "Pagination" : "ページネーション"} className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page === 1}
            aria-label={en ? "Previous page" : "前のページ"}
            className="inline-flex h-9 items-center gap-1 rounded-lg border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">{en ? "Prev" : "前へ"}</span>
          </button>

          <ul className="flex items-center gap-1">
            {pages.map((p, i) =>
              p === "…" ? (
                <li
                  key={`gap-${i}`}
                  className="grid size-9 place-items-center text-sm text-muted-foreground"
                  aria-hidden
                >
                  …
                </li>
              ) : (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => go(p)}
                    aria-current={p === page ? "page" : undefined}
                    className={cn(
                      "grid size-9 place-items-center rounded-lg border text-sm font-medium tabular-nums transition-colors",
                      p === page
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {p}
                  </button>
                </li>
              )
            )}
          </ul>

          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={page === TOTAL}
            aria-label={en ? "Next page" : "次のページ"}
            className="inline-flex h-9 items-center gap-1 rounded-lg border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <span className="hidden sm:inline">{en ? "Next" : "次へ"}</span>
            <ChevronRight className="size-4" />
          </button>
        </nav>

        <p className="text-xs text-muted-foreground">
          {en ? (
            <>
              Page <span className="font-medium text-foreground">{page}</span> of{" "}
              <span className="font-medium text-foreground">{TOTAL}</span>
            </>
          ) : (
            <>
              全 <span className="font-medium text-foreground">{TOTAL}</span> ページ中{" "}
              <span className="font-medium text-foreground">{page}</span> ページ目
            </>
          )}
        </p>
      </div>
    </div>
  );
}
