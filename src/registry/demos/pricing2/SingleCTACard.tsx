import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "単一CTAカード",
  category: "価格・オファー",
  description: "迷わせない、ひとつの価格と大きなCTAのカード。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const feats = [
  { ja: "260以上のコンポーネント", en: "260+ components" },
  { ja: "ライフタイムアップデート", en: "Lifetime updates" },
  { ja: "商用利用OK", en: "Commercial use OK" },
  { ja: "ソースコード同梱", en: "Source code included" },
  { ja: "ダーク / ライト対応", en: "Dark / light support" },
  { ja: "優先サポート", en: "Priority support" },
];

export default function SingleCTACard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-background px-4 py-16">
      <style>{`
        @keyframes sct-float { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-6px); } }
        @media (prefers-reduced-motion: reduce){ .sct-float{ animation:none !important; } }
      `}</style>
      <div className="mx-auto max-w-lg">
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" />
          <span className="sct-float inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary [animation:sct-float_3s_ease-in-out_infinite]">
            <Sparkles className="size-3.5" />
            {en ? "One-time" : "買い切り"}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            {en ? "All-in-one pack" : "すべて入りパック"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {en
              ? "Pay once, use it forever. No subscription."
              : "一度の支払いで、ずっと使えます。サブスク不要。"}
          </p>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-5xl font-bold tracking-tight text-foreground">¥9,800</span>
            <span className="mb-1.5 text-base text-muted-foreground line-through">¥19,800</span>
            <span className="mb-1.5 rounded bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              50%OFF
            </span>
          </div>
          <ul className="mt-7 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {feats.map((f) => (
              <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                <Check className="size-4 shrink-0 text-primary" />
                {en ? f.en : f.ja}
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full" size="lg">
            {en ? "Buy now" : "今すぐ購入する"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {en ? "Includes a 30-day money-back guarantee" : "30日間の返金保証つき"}
          </p>
        </div>
      </div>
    </div>
  );
}
