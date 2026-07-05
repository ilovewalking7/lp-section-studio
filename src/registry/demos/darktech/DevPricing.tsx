import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デベロッパー価格表",
  category: "ダークテック",
  description: "Hobby / Pro / Enterprise のダーク開発者ツール向け料金プラン。",
  align: "full",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

type Plan = {
  name: string;
  price: string;
  unitJa: string;
  unitEn: string;
  descJa: string;
  descEn: string;
  features: { ja: string; en: string }[];
  ctaJa: string;
  ctaEn: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Hobby",
    price: "$0",
    unitJa: "/月",
    unitEn: "/mo",
    descJa: "個人プロジェクトと試作向け。",
    descEn: "For personal projects and prototypes.",
    features: [
      { ja: "100K リクエスト/月", en: "100K requests/mo" },
      { ja: "1 プロジェクト", en: "1 project" },
      { ja: "コミュニティサポート", en: "Community support" },
      { ja: "共有ランタイム", en: "Shared runtime" },
    ],
    ctaJa: "無料で始める",
    ctaEn: "Start for free",
  },
  {
    name: "Pro",
    price: "$20",
    unitJa: "/月",
    unitEn: "/mo",
    descJa: "本番環境のチームに最適。",
    descEn: "Best for teams in production.",
    features: [
      { ja: "5M リクエスト/月", en: "5M requests/mo" },
      { ja: "無制限プロジェクト", en: "Unlimited projects" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "エッジランタイム", en: "Edge runtime" },
      { ja: "カスタムドメイン", en: "Custom domains" },
    ],
    ctaJa: "Pro にアップグレード",
    ctaEn: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unitJa: "",
    unitEn: "",
    descJa: "大規模・コンプライアンス要件に。",
    descEn: "For scale and compliance needs.",
    features: [
      { ja: "無制限リクエスト", en: "Unlimited requests" },
      { ja: "SLA 99.99%", en: "99.99% SLA" },
      { ja: "専任エンジニア", en: "Dedicated engineer" },
      { ja: "SSO / SAML", en: "SSO / SAML" },
      { ja: "監査ログ", en: "Audit logs" },
    ],
    ctaJa: "問い合わせ",
    ctaEn: "Contact us",
  },
];

export default function DevPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0f] px-6 py-20 text-zinc-200">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {en ? "Pricing that scales with you" : "スケールに合わせた料金"}
          </h2>
          <p className="mt-3 text-zinc-400">
            {en ? "Pay for what you use. No hidden costs." : "使った分だけ。隠れたコストはありません。"}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-[#0d1117] p-6",
                p.featured
                  ? "border-emerald-400/40 shadow-[0_0_50px_-12px] shadow-emerald-500/30"
                  : "border-white/10"
              )}
            >
              {p.featured && (
                <>
                  <div className="pointer-events-none absolute -top-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                  <span className="absolute right-5 top-6 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                    <Zap className="size-3" />
                    {en ? "Popular" : "人気"}
                  </span>
                </>
              )}
              <h3 className="font-mono text-sm uppercase tracking-wide text-zinc-400">
                {p.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-white">{p.price}</span>
                <span className="text-sm text-zinc-500">{en ? p.unitEn : p.unitJa}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">{en ? p.descEn : p.descJa}</p>
              <button
                type="button"
                className={cn(
                  "mt-6 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  p.featured
                    ? "bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
                    : "border border-white/10 bg-white/[0.03] text-zinc-200 hover:border-white/20"
                )}
              >
                {en ? p.ctaEn : p.ctaJa}
              </button>
              <ul className="mt-6 space-y-3 border-t border-white/5 pt-6">
                {p.features.map((f) => (
                  <li key={f.en} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <Check
                      className={cn(
                        "size-4 shrink-0",
                        p.featured ? "text-emerald-400" : "text-zinc-500"
                      )}
                    />
                    {en ? f.en : f.ja}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
