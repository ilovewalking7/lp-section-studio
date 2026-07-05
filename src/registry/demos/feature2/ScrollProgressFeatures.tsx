import { useEffect, useRef, useState } from "react";
import { Pencil, Share2, BarChart4, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロール進捗フィーチャー",
  category: "マーケティング",
  description:
    "セクションのスクロール量に連動する進捗バーと、入ってくるごとに点灯する機能リスト。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const STEPS = [
  { icon: Pencil, title: "つくる", titleEn: "Create", body: "テンプレートから数分でコンテンツを作成。", bodyEn: "Build content in minutes from templates." },
  { icon: Share2, title: "ひろげる", titleEn: "Distribute", body: "複数チャネルへワンクリックで配信。", bodyEn: "Publish to multiple channels in one click." },
  { icon: BarChart4, title: "はかる", titleEn: "Measure", body: "反応をリアルタイムで計測・可視化。", bodyEn: "Track and visualize responses in real time." },
  { icon: Repeat, title: "みがく", titleEn: "Refine", body: "結果をもとに自動で改善案を提示。", bodyEn: "Get automatic suggestions based on results." },
];

export default function ScrollProgressFeatures() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const seen = Math.min(total, Math.max(0, vh - r.top));
      setProgress(Math.min(1, Math.max(0, seen / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const filled = Math.round(progress * STEPS.length);

  return (
    <section className="w-full px-6 py-16">
      <div ref={ref} className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Create, measure, refine." : "つくって、はかって、みがく。"}
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-[auto_1fr]">
          <div className="hidden sm:flex sm:justify-center">
            <div className="relative h-full w-1 rounded-full bg-border">
              <div
                className="absolute left-0 top-0 w-1 rounded-full bg-primary transition-[height] duration-200"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {STEPS.map((s, i) => {
              const active = i < filled;
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-4 rounded-2xl border p-5 transition-all duration-500",
                    active
                      ? "border-primary/30 bg-card opacity-100"
                      : "bg-card/60 opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
                      active ? "bg-primary/10 text-primary" : "bg-background text-muted-foreground"
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {en ? s.titleEn : s.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {en ? s.bodyEn : s.body}
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
