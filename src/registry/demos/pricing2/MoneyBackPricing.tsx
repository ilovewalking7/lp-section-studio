import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "返金保証つき料金",
  category: "価格・オファー",
  description: "返金保証バッジで不安を取り除く料金カード。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const feats = [
  { ja: "260以上のコンポーネント", en: "260+ components" },
  { ja: "無制限ダウンロード", en: "Unlimited downloads" },
  { ja: "商用利用ライセンス", en: "Commercial license" },
  { ja: "永久アップデート", en: "Lifetime updates" },
  { ja: "優先サポート", en: "Priority support" },
];

export default function MoneyBackPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-background px-4 py-16">
      <style>{`
        @keyframes mb-spin { to { transform: rotate(360deg); } }
        @keyframes mb-ring { 0%,100%{ transform:scale(1); opacity:.5; } 50%{ transform:scale(1.12); opacity:0; } }
        @media (prefers-reduced-motion: reduce){ .mb-anim{ animation:none !important; } }
      `}</style>
      <div className="mx-auto max-w-md">
        <div className="relative rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-10">
          <div className="absolute -right-3 -top-3">
            <div className="relative">
              <span className="mb-anim absolute inset-0 rounded-full bg-emerald-500/40 [animation:mb-ring_2.2s_ease-out_infinite]" />
              <span className="relative flex size-16 flex-col items-center justify-center rounded-full bg-emerald-500 text-center text-[10px] font-bold leading-tight text-white shadow-lg">
                <ShieldCheck className="size-5" />
                {en ? "30d" : "30日"}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {en ? "Lifetime" : "ライフタイム"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {en
              ? "Pay once, use it forever."
              : "一度きりの支払いで、ずっと使える。"}
          </p>
          <div className="mt-6 flex items-end gap-2">
            <span className="text-5xl font-bold text-foreground">¥12,800</span>
            <span className="mb-1.5 text-sm text-muted-foreground">
              {en ? "one-time" : "買い切り"}
            </span>
          </div>
          <ul className="mt-7 space-y-3 text-sm">
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
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-4" />
            {en ? "Full refund if you're not satisfied" : "満足できなければ全額返金"}
          </div>
        </div>
      </div>
    </div>
  );
}
