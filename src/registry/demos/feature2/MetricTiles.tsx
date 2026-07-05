import { useEffect, useRef, useState } from "react";
import { TrendingUp, Clock, Users, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メトリクス・カウントタイル",
  category: "マーケティング",
  description:
    "ビューポートに入ると数値が0からカウントアップする、実績指標のタイル群。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const TILES = [
  { icon: TrendingUp, target: 248, suffix: "%", suffixEn: "%", label: "成長率", labelEn: "Growth", decimals: 0 },
  { icon: Clock, target: 40, suffix: "時間", suffixEn: "h", label: "毎週の削減", labelEn: "Saved weekly", decimals: 0 },
  { icon: Users, target: 12480, suffix: "+", suffixEn: "+", label: "アクティブユーザー", labelEn: "Active users", decimals: 0 },
  { icon: Star, target: 4.9, suffix: "/5", suffixEn: "/5", label: "平均評価", labelEn: "Avg. rating", decimals: 1 },
];

function useCountUp(target: number, run: boolean, decimals: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Number((target * eased).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, decimals]);
  return val;
}

function Tile({
  data,
  run,
}: {
  data: (typeof TILES)[number];
  run: boolean;
}) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const val = useCountUp(data.target, run, data.decimals);
  const Icon = data.icon;
  const display =
    data.decimals > 0 ? val.toFixed(data.decimals) : Math.round(val).toLocaleString();
  return (
    <div className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        <Icon className="size-5" />
      </span>
      <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
        {display}
        <span className="text-xl text-muted-foreground">
          {en ? data.suffixEn : data.suffix}
        </span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {en ? data.labelEn : data.label}
      </p>
    </div>
  );
}

export default function MetricTiles() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setRun(true), obs.disconnect()),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full px-6 py-16">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Numbers that earn trust." : "数字が、信頼の証。"}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TILES.map((t) => (
            <Tile key={t.label} data={t} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
