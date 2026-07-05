import { useEffect, useRef, useState } from "react";
import { Boxes, LineChart, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スティッキー・スクロール解説",
  category: "マーケティング",
  description:
    "右側のビジュアルが固定され、スクロールに応じてステップが切り替わる解説セクション。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const STEPS = [
  {
    icon: Boxes,
    title: "つなぐ",
    titleEn: "Connect",
    body: "既存のツールを数クリックで接続。データが一箇所に集まります。",
    bodyEn: "Connect your existing tools in a few clicks. All your data in one place.",
    tone: "from-violet-500 to-indigo-500",
  },
  {
    icon: LineChart,
    title: "見える化する",
    titleEn: "Visualize",
    body: "集めたデータを自動でグラフ化。傾向が一目で分かります。",
    bodyEn: "Charts are generated automatically. Spot trends at a glance.",
    tone: "from-sky-500 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "動き出す",
    titleEn: "Take action",
    body: "インサイトをそのまま施策へ。改善のループが回り始めます。",
    bodyEn: "Turn insights straight into action. The improvement loop starts spinning.",
    tone: "from-emerald-500 to-teal-500",
  },
];

export default function StickyScrollReveal() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const Active = STEPS[active].icon;

  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
        <div className="space-y-[40vh] py-[20vh]">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                data-idx={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={cn(
                  "transition-all duration-500",
                  active === i ? "opacity-100" : "opacity-40"
                )}
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl border bg-card">
                  <Icon className="size-5 text-primary" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                  {en ? s.titleEn : s.title}
                </h3>
                <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
                  {en ? s.bodyEn : s.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24 flex h-[60vh] items-center justify-center overflow-hidden rounded-3xl border bg-card">
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-20 transition-all duration-700",
                STEPS[active].tone
              )}
            />
            <div className="relative flex flex-col items-center">
              <span
                key={active}
                className="inline-flex size-24 items-center justify-center rounded-3xl border bg-background shadow-lg"
                style={{ animation: "ssr-pop .5s cubic-bezier(.22,1,.36,1)" }}
              >
                <Active className="size-10 text-primary" />
              </span>
              <p className="mt-6 text-sm font-medium text-muted-foreground">
                {en ? "Step" : "ステップ"} {active + 1} / {STEPS.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ssr-pop {
          0% { transform: scale(.7) rotate(-8deg); opacity: 0; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
