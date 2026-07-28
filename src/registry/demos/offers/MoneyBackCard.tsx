import { Check, ShieldCheck, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "返金保証つき料金カード",
  category: "価格・オファー",
  description:
    "30日返金保証を前面に出してリスクを取り除く料金カード。保証シール付き。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["pricing", "guarantee", "risk-reversal"],
  principle:
    "リスクリバーサル（損失回避の中和）。返金保証で購入の損失リスクを売り手側へ移し、決断の心理的ハードルを下げる。",
};

const FEATURES = [
  { ja: "全機能フルアクセス", en: "Full access to all features" },
  { ja: "メンバー無制限", en: "Unlimited members" },
  { ja: "優先サポート", en: "Priority support" },
  { ja: "毎週の新テンプレート", en: "New templates every week" },
];

export default function MoneyBackCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex w-full justify-center px-5">
      {/* 保証シールが箱の外に出るので、そのぶんの余白を外側に確保する */}
      <Card className="relative w-full max-w-sm overflow-visible">
      {/* 保証シール */}
      <div className="absolute -right-3 -top-3 z-10">
        <div className="flex size-[68px] flex-col items-center justify-center rounded-full border-2 border-dashed border-emerald-500/60 bg-emerald-500 text-center text-white shadow-lg">
          <span className="text-[15px] font-extrabold leading-none">30</span>
          <span className="text-[8px] font-semibold leading-tight">
            DAY
            <br />
            GUARANTEE
          </span>
        </div>
      </div>

      <CardHeader className="space-y-2">
        <Badge variant="secondary" className="w-fit">
          {en ? "Pro plan" : "Proプラン"}
        </Badge>
        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-4xl font-bold tracking-tight">¥4,800</span>
          <span className="text-sm text-muted-foreground">{en ? "/ mo" : "/ 月"}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {en
            ? "Try it first — if it's not for you, we'll refund every yen."
            : "まずは試して、合わなければ全額返金します。"}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-2.5 text-sm">
          {FEATURES.map((f) => (
            <li key={f.en} className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-emerald-500" />
              <span>{en ? f.en : f.ja}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-500" />
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {en ? "30-day full money-back guarantee" : "30日間 全額返金保証"}
            </p>
            <p className="text-xs text-muted-foreground">
              {en
                ? "Full refund within 30 days, no questions asked. There's no risk to you."
                : "理由を問わず、30日以内なら全額返金。あなたにリスクはありません。"}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full">{en ? "Start risk-free" : "リスクなしで始める"}</Button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <RotateCcw className="size-3.5" />
          {en ? "Cancel anytime in one click" : "解約はいつでもワンクリック"}
        </p>
      </CardFooter>
      </Card>
    </div>
  );
}
