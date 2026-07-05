import { useState } from "react";
import { ArrowRight, Megaphone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アナウンスバー",
  category: "ヒーロー・LP",
  description:
    "リンクと閉じるボタンを備えた最上部の細いお知らせバナー（useStateで開閉）。",
  align: "full",
  isNew: true,
  tags: ["hero", "landing", "announcement"],
  principle:
    "薄いグラデーション帯でページ上端に注意を一点だけ置く。閉じられる設計で押しつけ感を避け、CTAは矢印で前進を促す。",
};

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full">
      {open ? (
        <div className="relative w-full overflow-hidden border-b bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-x-3 gap-y-1 px-10 py-2.5 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-2 py-0.5 text-xs font-medium">
              <Megaphone className="size-3.5 text-indigo-400" />
              {en ? "New" : "新着"}
            </span>
            <span className="text-muted-foreground">
              {en ? (
                <>
                  Summer sale is on — annual plans are{" "}
                  <span className="font-medium text-foreground">30% off</span>.
                </>
              ) : (
                <>
                  夏季キャンペーン実施中 — 年間プランが
                  <span className="font-medium text-foreground">30%オフ</span>。
                </>
              )}
            </span>
            <a
              href="#"
              className="group inline-flex items-center gap-0.5 font-medium text-foreground underline-offset-4 hover:underline"
            >
              {en ? "Learn more" : "詳しく見る"}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={en ? "Dismiss announcement" : "お知らせを閉じる"}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground",
              "transition-colors hover:bg-foreground/10 hover:text-foreground"
            )}
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center py-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {en ? "Show announcement" : "お知らせを再表示"}
          </button>
        </div>
      )}
    </div>
  );
}
