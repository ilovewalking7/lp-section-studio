import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ガラス料金表",
  category: "価格・オファー",
  description: "カラフルな背景にすりガラスのカードが浮かぶ料金表。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const plans = [
  {
    id: "basic",
    name: { ja: "ベーシック", en: "Basic" },
    price: "¥1,200",
    feats: [
      { ja: "10GB", en: "10GB" },
      { ja: "1ユーザー", en: "1 user" },
      { ja: "標準サポート", en: "Standard support" },
    ],
  },
  {
    id: "pro",
    name: { ja: "プロ", en: "Pro" },
    price: "¥3,600",
    feats: [
      { ja: "100GB", en: "100GB" },
      { ja: "5ユーザー", en: "5 users" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "分析", en: "Analytics" },
    ],
    best: true,
  },
  {
    id: "max",
    name: { ja: "マックス", en: "Max" },
    price: "¥7,800",
    feats: [
      { ja: "無制限", en: "Unlimited" },
      { ja: "無制限ユーザー", en: "Unlimited users" },
      { ja: "24/7", en: "24/7" },
      { ja: "API", en: "API" },
    ],
  },
];

export default function GlassPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative w-full overflow-hidden bg-slate-900 px-4 py-16">
      <style>{`
        @keyframes gp-blob { 0%,100%{ transform:translate(0,0) scale(1);} 33%{ transform:translate(30px,-20px) scale(1.1);} 66%{ transform:translate(-20px,20px) scale(.95);} }
        @media (prefers-reduced-motion: reduce){ .gp-blob{ animation:none !important; } }
      `}</style>
      <div className="gp-blob pointer-events-none absolute left-1/4 top-0 size-72 rounded-full bg-fuchsia-500/40 blur-3xl [animation:gp-blob_12s_ease-in-out_infinite]" />
      <div className="gp-blob pointer-events-none absolute right-1/4 bottom-0 size-72 rounded-full bg-cyan-400/40 blur-3xl [animation:gp-blob_14s_ease-in-out_infinite_reverse]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {en ? "Crystal-clear pricing" : "透明感あふれる料金"}
        </h2>
        <p className="mt-3 text-white/70">
          {en ? "Beautiful on every device." : "どのデバイスでも美しく。"}
        </p>
      </div>
      <div className="relative mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={cn(
              "rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/15",
              p.best && "ring-2 ring-white/50"
            )}
          >
            {p.best && (
              <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                {en ? "Popular" : "おすすめ"}
              </span>
            )}
            <h3 className="text-lg font-semibold text-white">
              {en ? p.name.en : p.name.ja}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{p.price}</span>
              <span className="text-sm text-white/60">{en ? "/mo" : "/ 月"}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {p.feats.map((f) => (
                <li key={f.en} className="flex items-center gap-2 text-white/90">
                  <Check className="size-4 text-white" />
                  {en ? f.en : f.ja}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-7 w-full rounded-lg border border-white/30 bg-white/10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/25"
            >
              {en ? "Select" : "選択する"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
