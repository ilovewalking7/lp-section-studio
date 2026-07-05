import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "料金カード",
  category: "マーケティング",
  description: "プラン・特典・CTA を含む価格表示カード。",
};

const features = [
  { ja: "コンポーネント無制限", en: "Unlimited components" },
  { ja: "ライブプレビュー", en: "Live preview" },
  { ja: "ワンクリックでコードをコピー", en: "One-click code copy" },
  { ja: "ダーク / ライトテーマ", en: "Dark / light theme" },
  { ja: "サブスク費用 0円", en: "No subscription fees" },
];

export default function PricingCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{en ? "My Studio" : "マイ・スタジオ"}</CardTitle>
          <Badge variant="secondary">{en ? "Popular" : "おすすめ"}</Badge>
        </div>
        <CardDescription>
          {en ? "Your own component library" : "自分専用のコンポーネント置き場"}
        </CardDescription>
        <div className="flex items-baseline gap-1 pt-2">
          <span className="text-4xl font-bold tracking-tight">¥0</span>
          <span className="text-sm text-muted-foreground">
            {en ? "/ mo" : "/ 月"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5 text-sm">
          {features.map((f) => (
            <li key={f.en} className="flex items-center gap-2">
              <Check className="size-4 text-primary" />
              <span>{en ? f.en : f.ja}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          {en ? "Get started" : "これで始める"}
        </Button>
      </CardFooter>
    </Card>
  );
}
