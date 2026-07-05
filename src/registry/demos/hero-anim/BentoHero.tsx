import {
  ArrowRight,
  Activity,
  Shield,
  Sparkles,
  Globe2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ベント・ヒーロー",
  category: "ヒーロー・LP",
  description: "左にコピー、右に発光・ホバーするアニメーション付きベントグリッド。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "bento"],
};

const tiles = [
  {
    icon: Activity,
    ja: "リアルタイム分析",
    en: "Real-time analytics",
    span: "col-span-2",
    accent: "rgba(56,189,248,0.5)",
    delay: "0s",
  },
  {
    icon: Shield,
    ja: "セキュア",
    en: "Secure",
    span: "",
    accent: "rgba(52,211,153,0.5)",
    delay: "0.6s",
  },
  {
    icon: Zap,
    ja: "高速",
    en: "Fast",
    span: "",
    accent: "rgba(251,191,36,0.5)",
    delay: "1.2s",
  },
  {
    icon: Globe2,
    ja: "グローバル配信",
    en: "Global delivery",
    span: "col-span-2",
    accent: "rgba(168,85,247,0.5)",
    delay: "1.8s",
  },
];

export default function BentoHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#060710] py-24 text-white">
      <style>{`
        @keyframes bento-pulse { 0%,100%{opacity:.35} 50%{opacity:.85} }
        @media (prefers-reduced-motion: reduce){ .bento-glow{animation:none !important} }
      `}</style>

      <div
        className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[60vw] opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
            <Sparkles className="size-3.5 text-indigo-300" />
            {en ? "All-in-one platform" : "オールインワン・プラットフォーム"}
          </span>
          <h1 className="mt-7 bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            {en ? (
              <>
                Every feature you need,
                <br />
                on a single screen
              </>
            ) : (
              <>
                必要な機能が、
                <br />
                ひとつの画面に
              </>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-white/55 lg:mx-0">
            {en
              ? "Analytics, security, and delivery unified — bringing scattered tools together as one."
              : "分析・セキュリティ・配信を統合。バラバラなツールを一つにまとめます。"}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="group bg-white text-black hover:bg-white/90"
            >
              {en ? "Start for free" : "無料で始める"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              {en ? "All features" : "機能一覧"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.en}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]",
                  t.span
                )}
              >
                <div
                  className="bento-glow pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl"
                  style={{
                    background: t.accent,
                    animation: `bento-pulse 4s ease-in-out ${t.delay} infinite`,
                  }}
                />
                <Icon className="relative size-5 text-white/80 transition-transform group-hover:scale-110" />
                <p className="relative mt-8 text-sm font-medium text-white/85">
                  {en ? t.en : t.ja}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
