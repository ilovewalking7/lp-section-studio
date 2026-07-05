import { useRef, useState, useCallback } from "react";
import { MoveHorizontal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ビフォーアフター・スライダー",
  category: "マーケティング",
  description:
    "ハンドルをドラッグして導入前後を比較。CSSグラデーションのモック画面で違いを可視化。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

function Panel({ variant }: { variant: "before" | "after" }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const after = variant === "after";
  return (
    <div className="absolute inset-0 select-none p-6">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            after
              ? "bg-emerald-500 text-white"
              : "bg-muted text-muted-foreground"
          )}
        >
          {after ? (en ? "After" : "導入後") : en ? "Before" : "導入前"}
        </span>
        {after && <Sparkles className="size-5 text-emerald-500" />}
      </div>
      <div className="mt-5 space-y-3">
        {[0, 1, 2, 3].map((r) => (
          <div key={r} className="flex items-center gap-3">
            <div
              className={cn(
                "size-8 shrink-0 rounded-lg",
                after ? "bg-gradient-to-br from-emerald-400 to-teal-500" : "bg-muted"
              )}
            />
            <div className="flex-1 space-y-1.5">
              <div
                className={cn(
                  "h-2.5 rounded-full",
                  after ? "bg-emerald-500/30" : "bg-muted"
                )}
                style={{ width: after ? `${90 - r * 8}%` : `${60 - r * 10}%` }}
              />
              <div
                className={cn(
                  "h-2 rounded-full",
                  after ? "bg-emerald-500/20" : "bg-muted/60"
                )}
                style={{ width: after ? `${70 - r * 6}%` : `${40 - r * 6}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "See the difference at a glance." : "ひと目でわかる、変化の大きさ。"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Drag the handle left and right to compare before and after."
              : "ハンドルを左右に動かして、導入前後を比べてみてください。"}
          </p>
        </div>

        <div
          ref={ref}
          className="relative aspect-[16/10] touch-none overflow-hidden rounded-3xl border bg-card"
          onMouseMove={(e) => dragging.current && update(e.clientX)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
        >
          <Panel variant="before" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          >
            <div className="absolute inset-0 bg-emerald-500/5" />
            <Panel variant="after" />
          </div>

          <div
            className="absolute inset-y-0 flex w-0.5 cursor-ew-resize items-center justify-center bg-white shadow"
            style={{ left: `${pos}%` }}
            onMouseDown={() => (dragging.current = true)}
            onTouchStart={() => (dragging.current = true)}
            role="slider"
            aria-label="比較スライダー"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
            }}
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md">
              <MoveHorizontal className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
