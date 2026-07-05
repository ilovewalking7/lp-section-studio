import { Check, Gift } from "lucide-react";
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
  name: "バリュースタック・オファー",
  category: "価格・オファー",
  description:
    "同梱特典を1つずつ金額化して総額を提示し、それを大きく下回る価格で見せるオファー。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["pricing", "value-stack", "bundle"],
  principle:
    "価値の積み上げ（バリュースタッキング）。個々の価値を可視化して総額を膨らませ、最終価格との差を「圧倒的なお得感」として知覚させる。",
};

const ITEMS = [
  { label: "コアプラットフォーム（年間ライセンス）", labelEn: "Core platform (annual license)", value: 48000 },
  { label: "プレミアムテンプレート集 120点", labelEn: "120 premium templates", value: 24000 },
  { label: "1対1オンボーディング（90分）", labelEn: "1-on-1 onboarding (90 min)", value: 30000 },
  { label: "限定コミュニティへの永久アクセス", labelEn: "Lifetime access to the private community", value: 18000 },
  { label: "四半期ごとの戦略レビュー", labelEn: "Quarterly strategy reviews", value: 36000 },
];

function yen(n: number) {
  return "¥" + n.toLocaleString("ja-JP");
}

export default function ValueStackOffer() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const total = ITEMS.reduce((s, i) => s + i.value, 0);
  const price = 49800;
  const saved = total - price;

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="space-y-2 bg-gradient-to-b from-emerald-500/10 to-transparent">
        <div className="flex items-center justify-between">
          <Badge className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent">
            <Gift className="size-3" /> {en ? "Limited-time bundle" : "期間限定バンドル"}
          </Badge>
          <span className="text-xs text-muted-foreground">{en ? "Ends today" : "本日締切"}</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight">
          {en ? "The complete growth package" : "グロース完全パッケージ"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {en
            ? "Everything you need to get results, bundled into one."
            : "成果に必要なものを、ひとつにまとめました。"}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 pt-5">
        <ul className="space-y-2.5">
          {ITEMS.map((item) => (
            <li
              key={item.labelEn}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <span>{en ? item.labelEn : item.label}</span>
              </span>
              <span className="shrink-0 font-medium tabular-nums text-muted-foreground">
                {yen(item.value)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t pt-3 text-sm">
          <span className="font-medium text-muted-foreground">{en ? "Total value" : "総額"}</span>
          <span className="font-semibold tabular-nums text-muted-foreground line-through decoration-rose-500/70 decoration-2">
            {yen(total)}
          </span>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            {en ? "Your price" : "あなたの価格"}
          </p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            {yen(price)}
          </p>
          <p className="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {en
              ? `Save ${yen(saved)} (${Math.round((saved / total) * 100)}% off)`
              : `${yen(saved)} お得（${Math.round((saved / total) * 100)}% OFF）`}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-600/90">
          {en ? "Claim it now" : "今すぐ受け取る"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          {en
            ? "Includes a 30-day money-back guarantee · cancel anytime"
            : "30日間の返金保証付き・いつでもキャンセル可"}
        </p>
      </CardFooter>
    </Card>
  );
}
