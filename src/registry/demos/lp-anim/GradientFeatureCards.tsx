import { Gauge, Puzzle, Workflow } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・グラデ機能カード",
  category: "マーケティング",
  description: "回転するグラデーション枠線とホバー時のシーンが流れる機能カード。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

const CARDS = [
  {
    icon: <Workflow className="h-6 w-6" />,
    titleJa: "自動化フロー",
    titleEn: "Automation flows",
    bodyJa: "ノーコードで反復作業を自動化。トリガーとアクションを繋ぐだけ。",
    bodyEn:
      "Automate repetitive work with no code. Just connect triggers and actions.",
  },
  {
    icon: <Gauge className="h-6 w-6" />,
    titleJa: "高速パフォーマンス",
    titleEn: "Blazing performance",
    bodyJa: "P95 レイテンシ 40ms。どこからでも快適に動作します。",
    bodyEn: "P95 latency of 40ms. Smooth from anywhere in the world.",
  },
  {
    icon: <Puzzle className="h-6 w-6" />,
    titleJa: "豊富な連携",
    titleEn: "Rich integrations",
    bodyJa: "100以上のサービスとワンクリック接続。拡張は無限大。",
    bodyEn: "One-click connect to 100+ services. Endless extensibility.",
  },
];

export default function GradientFeatureCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <style>{`
        @keyframes gfc-spin { to { transform: rotate(360deg); } }
        @keyframes gfc-sheen { 0% { transform: translateX(-120%); } 60%,100% { transform: translateX(220%); } }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "A standout experience, by default." : "際立つ体験を、標準で。"}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            {en ? "Features polished down to the detail." : "細部まで磨き上げた機能群。"}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.titleJa}
              className="group relative rounded-2xl p-px"
            >
              {/* rotating gradient border */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div
                  className="absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 opacity-40 transition-opacity duration-500 group-hover:opacity-90 [background:conic-gradient(from_0deg,transparent,#6366f1,#ec4899,transparent_55%)]"
                  style={{ animation: "gfc-spin 6s linear infinite" }}
                />
              </div>
              <div className="relative h-full overflow-hidden rounded-2xl bg-neutral-950 p-7">
                {/* sheen */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  style={{ animation: "gfc-sheen 1.4s ease-in-out" }}
                />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-indigo-300 ring-1 ring-white/10">
                    {c.icon}
                  </div>
                  <h3 className="text-lg font-semibold">
                    {en ? c.titleEn : c.titleJa}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {en ? c.bodyEn : c.bodyJa}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
