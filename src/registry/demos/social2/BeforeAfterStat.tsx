import { useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ビフォーアフター指標",
  category: "マーケティング",
  description: "導入前→後の変化を矢印で示し、数値がスライドして改善幅が浮かび上がる。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const ROWS = [
  { metric: "月間リード数", metricEn: "Monthly leads", before: 120, after: 374, unit: "件", unitEn: "", up: true },
  { metric: "解約率", metricEn: "Churn rate", before: 6.2, after: 2.1, unit: "%", unitEn: "%", up: false, decimals: 1 },
  { metric: "対応時間", metricEn: "Response time", before: 48, after: 9, unit: "時間", unitEn: "h", up: false },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

export default function BeforeAfterStat() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section className="w-full px-6 py-12">
      <div ref={ref} className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{en ? "The numbers changed" : "数字が変わった"}</h2>
        <p className="mt-2 text-center text-muted-foreground">{en ? "One customer's before-and-after." : "あるお客様の、導入前後の比較。"}</p>
        <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {ROWS.map((r) => {
            const good = r.up ? r.after > r.before : r.after < r.before;
            const delta = Math.round(Math.abs((r.after - r.before) / r.before) * 100);
            return (
              <div key={r.metric} className="grid grid-cols-[1fr_auto] items-center gap-4 p-5 sm:grid-cols-[1.2fr_auto_auto_auto_auto]">
                <span className="text-sm font-medium text-foreground">{en ? r.metricEn : r.metric}</span>
                <span className="text-right text-lg font-semibold tabular-nums text-muted-foreground line-through decoration-rose-400/60 sm:text-left">
                  {r.before.toLocaleString(en ? "en-US" : "ja-JP")}{en ? r.unitEn : r.unit}
                </span>
                <ArrowRight className="hidden size-4 text-muted-foreground sm:block" aria-hidden />
                <span
                  className="text-right text-2xl font-bold tabular-nums text-foreground transition-all duration-700 sm:text-left"
                  style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateX(-8px)" }}
                >
                  {r.after.toLocaleString(en ? "en-US" : "ja-JP")}{en ? r.unitEn : r.unit}
                </span>
                <span className={`col-span-2 inline-flex w-fit items-center gap-1 justify-self-end rounded-full px-2.5 py-1 text-xs font-bold sm:col-span-1 ${good ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}>
                  {r.up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                  {r.up ? "+" : "-"}{delta}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
