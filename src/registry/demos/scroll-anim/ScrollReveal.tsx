import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロールリビール",
  category: "スクロール演出",
  description: "セクションがスクロール領域に入るとフェード＆スライドアップで現れる。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "reveal"],
};

const SECTIONS = [
  { t: "はじめに", tEn: "Intro", d: "スクロールすると各ブロックが順に現れます。", dEn: "Each block appears in turn as you scroll.", c: "from-sky-500/20 to-indigo-500/20" },
  { t: "コンセプト", tEn: "Concept", d: "IntersectionObserver で表示を検知して演出。", dEn: "Visibility is detected with IntersectionObserver.", c: "from-emerald-500/20 to-teal-500/20" },
  { t: "デザイン", tEn: "Design", d: "CSS transition で滑らかにフェードアップ。", dEn: "A CSS transition fades and slides each block up.", c: "from-amber-500/20 to-orange-500/20" },
  { t: "実装", tEn: "Build", d: "コンテナ内スクロールに完全対応。", dEn: "Fully supports scrolling inside a container.", c: "from-pink-500/20 to-rose-500/20" },
  { t: "まとめ", tEn: "Wrap-up", d: "依存ゼロで軽量に動作します。", dEn: "Runs lightweight with zero dependencies.", c: "from-violet-500/20 to-fuchsia-500/20" },
];

export default function ScrollReveal() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<Set<number>>(new Set());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-idx]"));
    const io = new IntersectionObserver(
      (entries) => {
        setShown((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            if (e.isIntersecting) next.add(Number((e.target as HTMLElement).dataset.idx));
          }
          return next;
        });
      },
      { root, threshold: 0.35 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div
        ref={rootRef}
        className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-background p-6"
      >
        <p className="mb-6 text-center text-sm text-muted-foreground">
          {en ? "↓ Scroll to see the reveal" : "↓ スクロールして演出を確認"}
        </p>
        <div className="flex flex-col gap-6 pb-10">
          {SECTIONS.map((s, i) => (
            <div
              key={s.tEn}
              data-idx={i}
              className={cn(
                "rounded-xl border bg-gradient-to-br p-8 transition-all duration-700 ease-out",
                s.c,
                shown.has(i) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              )}
            >
              <h3 className="text-xl font-bold text-foreground">{en ? s.tEn : s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{en ? s.dEn : s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
