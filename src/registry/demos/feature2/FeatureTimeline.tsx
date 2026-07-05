import { useEffect, useRef, useState } from "react";
import { Rocket, Sparkles, Globe2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "機能タイムライン",
  category: "マーケティング",
  description:
    "縦線に沿ってノードが順に点灯する沿革・ロードマップ型タイムライン。IO で段階的に出現。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const STEPS = [
  {
    icon: Rocket,
    year: "2023",
    titleJa: "ローンチ",
    titleEn: "Launch",
    bodyJa: "小さなチームから始動。最初の100ユーザーに価値を届けました。",
    bodyEn: "Started as a small team, delivering value to our first 100 users.",
  },
  {
    icon: Sparkles,
    year: "2024",
    titleJa: "AI機能を追加",
    titleEn: "Added AI features",
    bodyJa: "生成AIを統合し、作業時間を平均40%短縮しました。",
    bodyEn: "Integrated generative AI, cutting work time by 40% on average.",
  },
  {
    icon: Globe2,
    year: "2025",
    titleJa: "グローバル展開",
    titleEn: "Global expansion",
    bodyJa: "12言語に対応し、世界40カ国でサービスを提供開始。",
    bodyEn: "Launched in 40 countries with support for 12 languages.",
  },
  {
    icon: Trophy,
    year: "2026",
    titleJa: "業界トップへ",
    titleEn: "Industry leader",
    bodyJa: "満足度No.1を獲得。次の標準をつくり続けています。",
    bodyEn: "Ranked #1 in satisfaction, setting the next standard.",
  },
];

export default function FeatureTimeline() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          STEPS.forEach((_, i) =>
            setTimeout(() => setCount((c) => Math.max(c, i + 1)), i * 280)
          );
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full px-6 py-16">
      <div ref={ref} className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "The road we've traveled." : "歩んできた道のり。"}
          </h2>
        </div>

        <div className="relative pl-8">
          <div
            aria-hidden
            className="absolute left-[15px] top-2 w-px bg-border"
            style={{ height: `calc(100% - 1rem)` }}
          />
          <div
            aria-hidden
            className="absolute left-[15px] top-2 w-px bg-primary transition-all duration-700 ease-out"
            style={{ height: `${(count / STEPS.length) * 100}%` }}
          />

          <div className="space-y-8">
            {STEPS.map((s, i) => {
              const active = i < count;
              const Icon = s.icon;
              return (
                <div
                  key={s.year}
                  className={cn(
                    "relative transition-all duration-500",
                    active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  )}
                >
                  <span
                    className={cn(
                      "absolute -left-8 top-0 inline-flex size-8 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300",
                      active ? "border-primary text-primary" : "border-border text-muted-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="rounded-2xl border bg-card p-5">
                    <span className="text-xs font-mono font-semibold text-primary">
                      {s.year}
                    </span>
                    <h3 className="mt-1 font-semibold tracking-tight">
                      {en ? s.titleEn : s.titleJa}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {en ? s.bodyEn : s.bodyJa}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
