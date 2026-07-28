import { useEffect, useRef, useState } from "react";
import { BarChart3, Layers, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・機能リール",
  category: "マーケティング",
  description: "左右交互の機能行がビューインでスライド/フェードして現れる（IO）。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

const ROWS = [
  {
    icon: <Layers className="h-6 w-6" />,
    tagJa: "ワークフロー",
    tagEn: "Workflow",
    titleJa: "すべてを一画面に集約",
    titleEn: "Everything on one screen",
    bodyJa: "散らばったツールを統合。コンテキストを切り替えずに作業を完結できます。",
    bodyEn:
      "Unify scattered tools. Get work done without ever switching context.",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    tagJa: "インサイト",
    tagEn: "Insights",
    titleJa: "意思決定を支えるデータ",
    titleEn: "Data that drives decisions",
    bodyJa: "リアルタイムのダッシュボードで、重要な指標を見逃しません。",
    bodyEn: "Real-time dashboards so you never miss a metric that matters.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    tagJa: "セキュリティ",
    tagEn: "Security",
    titleJa: "エンタープライズ級の安全性",
    titleEn: "Enterprise-grade security",
    bodyJa: "SSO、監査ログ、暗号化を標準装備。安心してスケールできます。",
    bodyEn: "SSO, audit logs, and encryption built in. Scale with confidence.",
    accent: "from-emerald-500 to-teal-500",
  },
];

function Row({
  data,
  flip,
}: {
  data: (typeof ROWS)[number];
  flip: boolean;
}) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 items-center gap-8 sm:grid-cols-2",
        flip && "sm:[direction:rtl]",
      )}
    >
      <div
        className={cn(
          "[direction:ltr] transition-all duration-700 ease-out",
          shown ? "translate-x-0 opacity-100" : flip ? "translate-x-8 opacity-0" : "-translate-x-8 opacity-0",
        )}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
          {en ? data.tagEn : data.tagJa}
        </span>
        <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
          {en ? data.titleEn : data.titleJa}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
          {en ? data.bodyEn : data.bodyJa}
        </p>
      </div>
      <div
        className={cn(
          "[direction:ltr] transition-all duration-700 ease-out",
          shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
        style={{ transitionDelay: "120ms" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className={cn("absolute inset-0 opacity-30 blur-2xl bg-gradient-to-br", data.accent)} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur">
              {data.icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureRevealRows() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full overflow-x-hidden bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "Every feature, in sync." : "すべての機能が、噛み合う。"}
          </h2>
        </div>
        <div className="space-y-20">
          {ROWS.map((r, i) => (
            <Row key={r.titleJa} data={r} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
