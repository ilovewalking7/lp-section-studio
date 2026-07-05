import { ArrowRight, Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アプリ画面フレーム・ヒーロー",
  category: "ヒーロー・LP",
  description: "CSSで作ったアプリUIモックをブラウザ枠に収めて浮かせるヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function AppScreenshotFrameHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#070710] py-24 text-white">
      <style>{`
        @keyframes af-float{0%,100%{transform:translateY(0) rotateX(2deg)}50%{transform:translateY(-10px) rotateX(2deg)}}
        @keyframes af-bar{0%{width:25%}50%{width:78%}100%{width:25%}}
        @media (prefers-reduced-motion: reduce){.af-float,.af-bar{animation:none!important}}
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[60vw] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          {en ? "🚀 Reinventing the dashboard" : "🚀 ダッシュボードを再発明"}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {en ? "Understand at a glance." : "見るだけで、わかる。"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
          {en
            ? "A new workspace that shows your team's status at a glance."
            : "チームの状況がひと目で把握できる、新しいワークスペース。"}
        </p>
        <Button size="lg" className="group mt-7 bg-white text-black hover:bg-white/90">
          {en ? "Live demo" : "ライブデモ"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
        <div className="mt-14" style={{ perspective: "1200px" }}>
          <div
            className="af-float mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#0d0d16] shadow-2xl shadow-indigo-900/40"
            style={{ animation: "af-float 7s ease-in-out infinite" }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="size-3 rounded-full bg-red-400/80" />
              <span className="size-3 rounded-full bg-yellow-400/80" />
              <span className="size-3 rounded-full bg-green-400/80" />
              <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
                <Search className="size-3" /> app.example.com
              </div>
              <Bell className="size-4 text-white/40" />
            </div>
            <div className="flex">
              <div className="hidden w-40 shrink-0 space-y-2 border-r border-white/10 p-4 sm:block">
                {[
                  { ja: "概要", en: "Overview" },
                  { ja: "分析", en: "Analytics" },
                  { ja: "顧客", en: "Customers" },
                  { ja: "設定", en: "Settings" },
                ].map((t, i) => (
                  <div
                    key={t.en}
                    className={`rounded-md px-3 py-2 text-left text-sm ${i === 1 ? "bg-indigo-500/20 text-indigo-200" : "text-white/40"}`}
                  >
                    {en ? t.en : t.ja}
                  </div>
                ))}
              </div>
              <div className="flex-1 space-y-4 p-5 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{en ? "Monthly report" : "月次レポート"}</h3>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-xs text-white/50">
                    <Plus className="size-3" /> {en ? "Add" : "追加"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { l: "売上", le: "Revenue", v: "¥4.2M" },
                    { l: "新規", le: "New", v: "1,284" },
                    { l: "継続率", le: "Retention", v: "96%" },
                  ].map((s) => (
                    <div key={s.le} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[11px] text-white/40">{en ? s.le : s.l}</p>
                      <p className="mt-1 text-lg font-bold">{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex h-32 items-end gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-3">
                  {[40, 65, 50, 80, 60, 92, 70].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-indigo-500/40 to-indigo-400" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="af-bar h-full rounded-full bg-indigo-400" style={{ animation: "af-bar 4s ease-in-out infinite" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
