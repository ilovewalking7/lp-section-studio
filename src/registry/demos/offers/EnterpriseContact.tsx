import { Building2, ShieldCheck, Headset, Plug, ArrowRight } from "lucide-react";
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
  name: "エンタープライズ問い合わせ",
  category: "価格・オファー",
  description:
    "価格を表示せず、機能と専任サポートを訴求して商談につなげるエンタープライズ向けカード。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["enterprise", "contact", "sales"],
  principle:
    "価格の非提示（アンカー回避）。価格を出さず価値を会話で伝えることで価格基準点の固定を避け、要件に応じた高単価提案を可能にする。",
};

const FEATURES = [
  { icon: ShieldCheck, label: "SSO / SAML・監査ログ・SLA 99.99%", labelEn: "SSO / SAML, audit logs, 99.99% SLA" },
  { icon: Headset, label: "専任カスタマーサクセス担当 (CSM)", labelEn: "Dedicated customer success manager (CSM)" },
  { icon: Plug, label: "カスタム連携・オンプレ / 専用クラウド", labelEn: "Custom integrations, on-prem / private cloud" },
  { icon: Building2, label: "全社導入・ボリューム割引・請求書払い", labelEn: "Company-wide rollout, volume discounts, invoicing" },
];

export default function EnterpriseContact() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </div>
          <Badge variant="secondary">Enterprise</Badge>
        </div>
        <h3 className="text-xl font-bold tracking-tight">
          {en ? "A dedicated plan for large organizations" : "大規模組織のための専用プラン"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {en
            ? "We tailor it to your requirements. Let's start with a conversation."
            : "要件に合わせて設計します。まずはお話を聞かせてください。"}
        </p>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-3xl font-bold tracking-tight">
            {en ? "Custom quote" : "カスタム見積もり"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {en
            ? "We propose the best price based on your scale and requirements."
            : "利用規模・必要要件に応じて最適な価格をご提案します。"}
        </p>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 text-sm">
          {FEATURES.map(({ icon: Icon, label, labelEn }) => (
            <li key={labelEn} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
                <Icon className="size-3.5" />
              </span>
              <span>{en ? labelEn : label}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full">
          {en ? "Contact sales" : "営業に問い合わせる"} <ArrowRight className="size-4" />
        </Button>
        <Button variant="ghost" className="w-full">
          {en ? "Download the brochure" : "資料をダウンロード"}
        </Button>
        <p className="pt-1 text-center text-xs text-muted-foreground">
          {en ? "We usually reply within one business day." : "通常1営業日以内にご返信します。"}
        </p>
      </CardFooter>
    </Card>
  );
}
