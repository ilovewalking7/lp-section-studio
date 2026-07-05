import { Check, Zap, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ベント料金グリッド",
  category: "価格・オファー",
  description: "ベントグリッドで価格と特典を魅せるモダンな構成。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

export default function BentoPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {en ? "One plan, everything included" : "ひとつのプラン、すべて込み"}
          </h2>
          <p className="mt-3 text-muted-foreground">{en ? "Simple pricing — no feature puzzles." : "機能で迷わない、シンプルな料金。"}</p>
        </div>
        <div className="mt-12 grid auto-rows-[minmax(0,1fr)] gap-4 md:grid-cols-3 md:grid-rows-2">
          <div className="group relative row-span-2 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-violet-600 p-7 text-primary-foreground transition-transform duration-300 hover:-translate-y-1">
            <div>
              <Sparkles className="size-7" />
              <h3 className="mt-4 text-xl font-bold">{en ? "All-in-one" : "オールインワン"}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold">¥3,900</span>
                <span className="text-sm opacity-80">{en ? "/mo" : "/ 月"}</span>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-12 -bottom-12 size-44 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
            <Button variant="secondary" className="mt-6 w-full">
              {en ? "Try for free" : "無料で試す"}
            </Button>
          </div>

          <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500 transition-transform group-hover:scale-110">
              <Zap className="size-5" />
            </span>
            <div>
              <div className="font-semibold text-foreground">{en ? "Blazing fast" : "超高速"}</div>
              <div className="text-sm text-muted-foreground">{en ? "Global CDN delivery" : "グローバルCDN配信"}</div>
            </div>
          </div>

          <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500 transition-transform group-hover:scale-110">
              <Shield className="size-5" />
            </span>
            <div>
              <div className="font-semibold text-foreground">{en ? "Peace of mind" : "安心の保証"}</div>
              <div className="text-sm text-muted-foreground">{en ? "30-day money-back" : "30日間返金保証"}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:col-span-2">
            <div className="mb-3 text-sm font-medium text-muted-foreground">{en ? "What's included" : "含まれる機能"}</div>
            <ul className="grid grid-cols-2 gap-2.5 text-sm sm:grid-cols-3">
              {[
                { ja: "無制限プロジェクト", en: "Unlimited projects" },
                { ja: "チーム招待", en: "Team invites" },
                { ja: "バージョン履歴", en: "Version history" },
                { ja: "高度な分析", en: "Advanced analytics" },
                { ja: "カスタムドメイン", en: "Custom domain" },
                { ja: "優先サポート", en: "Priority support" },
              ].map((f) => (
                <li key={f.ja} className="flex items-center gap-2 text-foreground/90">
                  <Check className="size-4 shrink-0 text-primary" />
                  {en ? f.en : f.ja}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
