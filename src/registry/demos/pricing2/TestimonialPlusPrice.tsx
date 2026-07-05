import { Check, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "推薦の声つき料金",
  category: "価格・オファー",
  description: "顧客の声を添えて信頼を高める料金セクション。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const feats = [
  { ja: "無制限プロジェクト", en: "Unlimited projects" },
  { ja: "チームコラボ", en: "Team collaboration" },
  { ja: "優先サポート", en: "Priority support" },
  { ja: "高度な分析", en: "Advanced analytics" },
  { ja: "API アクセス", en: "API access" },
];

export default function TestimonialPlusPrice() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <div className="flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-current" />
            ))}
          </div>
          <blockquote className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Quote className="absolute -top-3 left-5 size-7 fill-primary/20 text-primary/20" />
            <p className="text-lg font-medium leading-relaxed text-foreground">
              {en
                ? "“Within two weeks of rollout, our team's productivity felt 30% higher. We can't go back.”"
                : "「導入から2週間でチームの生産性が体感30%上がりました。もう手放せません。」"}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-sm font-bold text-white">
                K
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {en ? "Kenta Kawamura" : "川村 健太"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {en ? "Head of Product / Acme Inc." : "プロダクト責任者 / Acme Inc."}
                </div>
              </div>
            </div>
          </blockquote>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div>
              <span className="text-xl font-bold text-foreground">12,000+</span>{" "}
              {en ? "teams onboard" : "チーム導入"}
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">4.9</span>{" "}
              {en ? "avg. rating" : "平均評価"}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-card p-8 shadow-xl transition-transform duration-300 hover:-translate-y-1">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {en ? "Pro plan" : "プロプラン"}
          </span>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-5xl font-bold text-foreground">¥2,980</span>
            <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {feats.map((f) => (
              <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                <Check className="size-4 text-primary" />
                {en ? f.en : f.ja}
              </li>
            ))}
          </ul>
          <Button className="mt-7 w-full" size="lg">
            {en ? "Try free for 14 days" : "14日間 無料で試す"}
          </Button>
        </div>
      </div>
    </div>
  );
}
