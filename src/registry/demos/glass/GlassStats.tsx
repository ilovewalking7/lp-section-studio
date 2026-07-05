import { Activity, TrendingUp, Users, Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・統計タイル",
  category: "グラスモーフィズム",
  description: "バイオレット〜シアンの背景に並ぶ、フロステッドガラスの統計タイル。",
  align: "full",
  isNew: true,
  tags: ["glass", "frosted", "stats"],
};

const stats = [
  { icon: Users, labelJa: "アクティブユーザー", labelEn: "Active users", valueJa: "48.2万", valueEn: "482K", delta: "+12.4%" },
  { icon: TrendingUp, labelJa: "月間収益", labelEn: "Monthly revenue", valueJa: "¥9.8M", valueEn: "¥9.8M", delta: "+8.1%" },
  { icon: Activity, labelJa: "稼働率", labelEn: "Uptime", valueJa: "99.98%", valueEn: "99.98%", delta: "+0.02%" },
  { icon: Zap, labelJa: "平均応答", labelEn: "Avg. response", valueJa: "42ms", valueEn: "42ms", delta: "-6ms" },
];

export default function GlassStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-cyan-600 px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-fuchsia-400/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 size-96 rounded-full bg-cyan-300/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {en ? "Results in real time" : "リアルタイムの成果"}
        </h2>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.labelEn}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur">
                <s.icon className="size-5" />
              </div>
              <div className="mt-5 text-3xl font-bold tracking-tight text-white">
                {en ? s.valueEn : s.valueJa}
              </div>
              <div className="mt-1 text-sm text-white/70">{en ? s.labelEn : s.labelJa}</div>
              <div className="mt-3 inline-flex rounded-full bg-white/15 px-2 py-0.5 text-xs font-medium text-emerald-200">
                {s.delta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
