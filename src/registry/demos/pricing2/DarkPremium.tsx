import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ダーク・プレミアム",
  category: "価格・オファー",
  description: "深い暗色に金のアクセントが映える高級感ある料金表。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const plans = [
  {
    id: "silver",
    name: { ja: "シルバー", en: "Silver" },
    price: "¥3,800",
    feats: [
      { ja: "10ライセンス", en: "10 licenses" },
      { ja: "標準サポート", en: "Standard support" },
      { ja: "月次レポート", en: "Monthly reports" },
    ],
  },
  {
    id: "gold",
    name: { ja: "ゴールド", en: "Gold" },
    price: "¥9,800",
    feats: [
      { ja: "50ライセンス", en: "50 licenses" },
      { ja: "24/7サポート", en: "24/7 support" },
      { ja: "週次レポート", en: "Weekly reports" },
      { ja: "専用環境", en: "Dedicated environment" },
      { ja: "API無制限", en: "Unlimited API" },
    ],
    featured: true,
  },
  {
    id: "platinum",
    name: { ja: "プラチナ", en: "Platinum" },
    price: "¥24,800",
    feats: [
      { ja: "無制限", en: "Unlimited" },
      { ja: "専任チーム", en: "Dedicated team" },
      { ja: "リアルタイム", en: "Real-time" },
      { ja: "オンサイト導入", en: "On-site onboarding" },
    ],
  },
];

export default function DarkPremium() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-zinc-950 px-4 py-16">
      <style>{`
        @keyframes dp-shine { from{ background-position:-200% center; } to{ background-position:200% center; } }
        @media (prefers-reduced-motion: reduce){ .dp-shine{ animation:none; } }
      `}</style>
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {en ? "Enterprise plans" : "エンタープライズ向けプラン"}
        </h2>
        <p className="mt-3 text-zinc-400">
          {en
            ? "Top-tier security and support."
            : "最高水準のセキュリティとサポートを。"}
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1.5",
              p.featured
                ? "border-amber-400/40 bg-gradient-to-b from-amber-500/10 to-zinc-900"
                : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            )}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-amber-400/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
            {p.featured && (
              <span className="mb-3 inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                {en ? "Popular" : "おすすめ"}
              </span>
            )}
            <h3 className="text-lg font-semibold text-white">
              {en ? p.name.en : p.name.ja}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span
                className={cn(
                  "text-4xl font-bold",
                  p.featured
                    ? "dp-shine bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-[length:200%_auto] bg-clip-text text-transparent [animation:dp-shine_3s_linear_infinite]"
                    : "text-white"
                )}
              >
                {p.price}
              </span>
              <span className="text-sm text-zinc-500">{en ? "/mo" : "/ 月"}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {p.feats.map((f) => (
                <li key={f.en} className="flex items-center gap-2 text-zinc-300">
                  <Check
                    className={cn(
                      "size-4",
                      p.featured ? "text-amber-400" : "text-zinc-500"
                    )}
                  />
                  {en ? f.en : f.ja}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={cn(
                "mt-7 w-full rounded-lg py-2.5 text-sm font-semibold transition-colors",
                p.featured
                  ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                  : "border border-zinc-700 text-white hover:bg-zinc-800"
              )}
            >
              {en ? "Contact us" : "問い合わせる"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
