import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロール・カウントアップ",
  category: "スクロール演出",
  description: "統計がスクロールで視界に入るとカウントアップする。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "counter"],
};

const STATS = [
  { label: "ユーザー", labelEn: "Users", value: 12840, suffix: "+" },
  { label: "稼働率", labelEn: "Uptime", value: 99, suffix: "%" },
  { label: "国・地域", labelEn: "Countries", value: 56, suffix: "" },
  { label: "満足度", labelEn: "Satisfaction", value: 4.9, suffix: "/5", decimals: 1 },
];

function useCountUp(target: number, run: boolean, decimals = 0) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, run]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
}

function Stat({ s, run }: { s: (typeof STATS)[number]; run: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const display = useCountUp(s.value, run, s.decimals ?? 0);
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <div className="bg-gradient-to-br from-sky-500 to-violet-600 bg-clip-text text-4xl font-black tabular-nums text-transparent">
        {display}
        {s.suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{en ? s.labelEn : s.label}</div>
    </div>
  );
}

export default function ScrollCounter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const rootRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const target = root.querySelector<HTMLElement>("[data-stats]");
    if (!target) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { root, threshold: 0.5 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div ref={rootRef} className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-background p-6">
        <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
          {en ? "↓ Scroll to start the numbers" : "↓ スクロールして数字を起動"}
        </div>
        <div data-stats className="grid grid-cols-2 gap-4 pb-10">
          {STATS.map((s) => (
            <Stat key={s.labelEn} s={s} run={run} />
          ))}
        </div>
      </div>
    </div>
  );
}
