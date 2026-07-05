import { Sparkles, Zap, Shield, BarChart3, Globe, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメーション・ベント",
  category: "マーケティング",
  description:
    "サイズの異なるタイルが組み合わさったベントグリッド。ホバーで光彩が走り、登場時にふわっと立ち上がる。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const TILES = [
  {
    icon: Sparkles,
    title: "自動でひらめく",
    titleEn: "Insights on autopilot",
    body: "面倒な設定は不要。最初の5分で価値が伝わる体験を。",
    bodyEn: "No fiddly setup — feel the value within the first five minutes.",
    span: "sm:col-span-2 sm:row-span-2",
    tone: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    icon: Zap,
    title: "圧倒的な速さ",
    titleEn: "Blazing fast",
    body: "ミリ秒単位の応答。",
    bodyEn: "Millisecond responses.",
    span: "",
    tone: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Shield,
    title: "堅牢な安全性",
    titleEn: "Rock-solid security",
    body: "暗号化を標準装備。",
    bodyEn: "Encryption built in.",
    span: "",
    tone: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: BarChart3,
    title: "明快な分析",
    titleEn: "Clear analytics",
    body: "数字で意思決定を支える、リアルタイムのダッシュボード。",
    bodyEn: "Real-time dashboards that back decisions with numbers.",
    span: "sm:col-span-2",
    tone: "from-sky-500/20 to-cyan-500/10",
  },
  {
    icon: Globe,
    title: "世界中で稼働",
    titleEn: "Runs worldwide",
    body: "エッジ配信。",
    bodyEn: "Edge delivery.",
    span: "",
    tone: "from-indigo-500/20 to-blue-500/10",
  },
  {
    icon: Layers,
    title: "拡張は自在",
    titleEn: "Endlessly extensible",
    body: "プラグインで機能を足し算。",
    bodyEn: "Add features with plugins.",
    span: "",
    tone: "from-rose-500/20 to-pink-500/10",
  },
];

export default function AnimatedBento() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes ab-rise {
          from { opacity: 0; transform: translateY(18px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ab-tile { animation: ab-rise .6s cubic-bezier(.22,1,.36,1) both; }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Every feature, at a glance." : "必要な機能を、ひと目で。"}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            {en
              ? "Tiles with different roles combine to distill the product's appeal into a single screen."
              : "役割の違うタイルを組み合わせ、製品の魅力を一画面に凝縮しました。"}
          </p>
        </div>

        <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 sm:grid-cols-4">
          {TILES.map((t, i) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className={cn(
                  "ab-tile group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  t.span
                )}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    t.tone
                  )}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-20 top-0 h-full w-20 -skew-x-12 bg-white/30 opacity-0 blur-md transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100 dark:bg-white/10"
                />
                <div className="relative">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border bg-background/70 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5 text-foreground" />
                  </span>
                  <h3 className="mt-4 font-semibold tracking-tight">{en ? t.titleEn : t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{en ? t.bodyEn : t.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
