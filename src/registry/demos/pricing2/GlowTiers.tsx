import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グロウ・ティアー",
  category: "価格・オファー",
  description: "ホバーでカードが光る、3段階の料金プラン。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const tiers = [
  {
    id: "starter",
    name: { ja: "スターター", en: "Starter" },
    price: 0,
    desc: { ja: "個人で試すなら", en: "For trying it solo" },
    feats: [
      { ja: "3プロジェクト", en: "3 projects" },
      { ja: "コミュニティ支援", en: "Community support" },
      { ja: "基本テンプレート", en: "Basic templates" },
    ],
    accent: "from-sky-400 to-cyan-400",
  },
  {
    id: "pro",
    name: { ja: "プロ", en: "Pro" },
    price: 1980,
    desc: { ja: "成長するチームに", en: "For growing teams" },
    feats: [
      { ja: "無制限プロジェクト", en: "Unlimited projects" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "全テンプレート", en: "All templates" },
      { ja: "分析ダッシュボード", en: "Analytics dashboard" },
    ],
    accent: "from-violet-500 to-fuchsia-500",
    popular: true,
  },
  {
    id: "business",
    name: { ja: "ビジネス", en: "Business" },
    price: 4980,
    desc: { ja: "本格運用に", en: "For serious operations" },
    feats: [
      { ja: "SSO / SAML", en: "SSO / SAML" },
      { ja: "監査ログ", en: "Audit logs" },
      { ja: "専任CSM", en: "Dedicated CSM" },
      { ja: "SLA 99.9%", en: "99.9% SLA" },
    ],
    accent: "from-amber-400 to-orange-500",
  },
];

export default function GlowTiers() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(1);
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {en ? "Simple, transparent pricing" : "シンプルで透明な料金"}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {en ? "Change anytime you need to." : "必要なときにいつでも変更できます。"}
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {tiers.map((t, i) => (
          <div
            key={t.id}
            onMouseEnter={() => setActive(i)}
            className={cn(
              "group relative rounded-2xl border bg-card p-7 transition-all duration-300",
              "hover:-translate-y-2 hover:shadow-2xl",
              active === i ? "border-transparent" : "border-border"
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 blur transition-opacity duration-300 group-hover:opacity-40",
                t.accent
              )}
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10",
                t.accent
              )}
            />
            <div className="relative">
              {t.popular && (
                <span
                  className={cn(
                    "mb-3 inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white",
                    t.accent
                  )}
                >
                  {en ? "Popular" : "人気"}
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">
                {en ? t.name.en : t.name.ja}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {en ? t.desc.en : t.desc.ja}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  ¥{t.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.feats.map((f) => (
                  <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full bg-gradient-to-br text-white",
                        t.accent
                      )}
                    >
                      <Check className="size-3" />
                    </span>
                    {en ? f.en : f.ja}
                  </li>
                ))}
              </ul>
              <Button className="mt-7 w-full" variant={t.popular ? "default" : "outline"}>
                {en ? "Select" : "選択する"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
