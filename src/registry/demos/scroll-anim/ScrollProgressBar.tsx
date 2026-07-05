import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロール進捗バー",
  category: "スクロール演出",
  description: "内側のコンテンツを読み進めると上部のバーが埋まる。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "progress"],
};

export default function ScrollProgressBar() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pct, setPct] = useState(0);

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
  }

  return (
    <div className="w-full">
      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border bg-background">
        {/* progress bar */}
        <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-muted">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="absolute right-3 top-4 z-10 rounded-full bg-foreground px-2.5 py-1 text-xs font-bold tabular-nums text-background">
          {Math.round(pct)}%
        </div>

        <div onScroll={onScroll} className="h-full overflow-y-auto px-8 pb-10 pt-10">
          <h3 className="mb-4 text-xl font-bold text-foreground">
            {en ? "Reading progress indicator" : "読書進捗インジケーター"}
          </h3>
          {Array.from({ length: 14 }).map((_, i) => (
            <p key={i} className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {en ? (
                <>
                  Paragraph {i + 1}. As you scroll through the content, the bar at the top fills up. The
                  ratio is computed from scrollTop and scrollHeight, then rendered smoothly with a CSS
                  width transition.
                </>
              ) : (
                <>
                  段落 {i + 1}。スクロール位置を読み進めると上部のバーが埋まっていきます。scrollTop と
                  scrollHeight から割合を算出し、CSS の width トランジションで滑らかに描画します。
                </>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
