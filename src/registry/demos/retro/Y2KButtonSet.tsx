import { Download, Heart, Sparkles, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "Y2Kボタンセット",
  category: "レトロ・Y2K",
  description: "光沢のあるアクア風ベベルボタンとクロム調バッジのY2Kコレクション。",
  align: "center",
  isNew: true,
  tags: ["retro", "y2k", "aqua", "chrome"],
};

export default function Y2KButtonSet() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="grid place-items-center bg-[#0d0221] p-5 sm:p-10">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-8">
        {/* Aqua gel buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { label: "ダウンロード", labelEn: "Download", icon: Download, from: "#7dd3fc", to: "#0284c7" },
            { label: "お気に入り", labelEn: "Favorite", icon: Heart, from: "#fda4af", to: "#e11d48" },
            { label: "スター", labelEn: "Star", icon: Star, from: "#fde68a", to: "#d97706" },
          ].map(({ label, labelEn, icon: Icon, from, to }) => (
            <button
              key={label}
              className="group relative overflow-hidden rounded-full px-6 py-3 font-bold text-white transition-transform active:scale-95"
              style={{
                background: `linear-gradient(180deg, ${from}, ${to})`,
                boxShadow: `0 4px 12px ${to}80, inset 0 1px 1px rgba(255,255,255,0.8)`,
              }}
            >
              {/* gloss highlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-white/50 blur-[1px]"
              />
              <span className="relative flex items-center gap-2 text-sm drop-shadow">
                <Icon className="size-4" />
                {en ? labelEn : label}
              </span>
            </button>
          ))}
        </div>

        {/* Chrome badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {["NEW", "HOT", "★ VIP ★"].map((txt) => (
            <span
              key={txt}
              className="rounded-md px-4 py-1.5 font-mono text-sm font-black uppercase italic tracking-wider"
              style={{
                background:
                  "linear-gradient(180deg, #f8fafc 0%, #cbd5e1 45%, #64748b 50%, #94a3b8 55%, #e2e8f0 100%)",
                color: "#1e293b",
                textShadow: "0 1px 0 rgba(255,255,255,0.7)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.9), 0 2px 6px rgba(0,0,0,0.5)",
                border: "1px solid #94a3b8",
              }}
            >
              {txt}
            </span>
          ))}
        </div>

        {/* Big glossy CTA */}
        <button
          className="group relative w-full overflow-hidden rounded-2xl py-4 text-center font-black uppercase tracking-widest text-white transition-transform active:scale-[0.98]"
          style={{
            background: "linear-gradient(180deg, #ff8fd0 0%, #ff2e97 50%, #c01a6c 100%)",
            boxShadow: "0 6px 20px rgba(255,46,151,0.6), inset 0 2px 2px rgba(255,255,255,0.7)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-2 top-1 h-2/5 rounded-full bg-white/40 blur-[2px]"
          />
          <span className="relative flex items-center justify-center gap-2">
            <Sparkles className="size-5" />
            {en ? "Get it now" : "今すぐ手に入れる"}
          </span>
        </button>
      </div>
    </div>
  );
}
