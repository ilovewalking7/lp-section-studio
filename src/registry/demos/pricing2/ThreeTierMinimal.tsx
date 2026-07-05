import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ミニマル3段",
  category: "価格・オファー",
  description: "余白を活かした、線だけのミニマルな3段料金表。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const plans = [
  {
    id: "personal",
    name: { ja: "個人", en: "Personal" },
    price: "¥0",
    feats: [
      { ja: "基本機能", en: "Core features" },
      { ja: "1ユーザー", en: "1 user" },
      { ja: "コミュニティ", en: "Community" },
    ],
  },
  {
    id: "team",
    name: { ja: "チーム", en: "Team" },
    price: "¥1,800",
    feats: [
      { ja: "全機能", en: "All features" },
      { ja: "10ユーザー", en: "10 users" },
      { ja: "メールサポート", en: "Email support" },
      { ja: "共有ワークスペース", en: "Shared workspace" },
    ],
    mid: true,
  },
  {
    id: "org",
    name: { ja: "組織", en: "Organization" },
    price: "¥4,500",
    feats: [
      { ja: "全機能", en: "All features" },
      { ja: "無制限ユーザー", en: "Unlimited users" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "高度な権限管理", en: "Advanced permissions" },
    ],
  },
];

export default function ThreeTierMinimal() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-background px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Pricing
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {en ? "Just what you need, kept simple" : "必要なものだけ、シンプルに"}
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                "group bg-card p-8 transition-colors duration-300 hover:bg-muted/30",
                p.mid && "bg-muted/20"
              )}
            >
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {en ? p.name.en : p.name.ja}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tight text-foreground">
                  {p.price}
                </span>
                <span className="text-sm text-muted-foreground">{en ? "/mo" : "/月"}</span>
              </div>
              <div className="mt-6 h-px w-10 bg-foreground/20 transition-all duration-300 group-hover:w-full" />
              <ul className="mt-6 space-y-3 text-sm">
                {p.feats.map((f) => (
                  <li key={f.en} className="flex items-center gap-2 text-foreground/80">
                    <Check className="size-4 text-foreground/40" />
                    {en ? f.en : f.ja}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 w-full"
                variant={p.mid ? "default" : "outline"}
              >
                {en ? "Get started" : "始める"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
