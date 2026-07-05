import { useState } from "react";
import { Check, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "エンタープライズ問い合わせ",
  category: "価格・オファー",
  description: "価格は応相談。営業へつなぐ大企業向けセクション。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const feats = [
  { ja: "カスタム契約・SLA", en: "Custom contracts & SLA" },
  { ja: "SSO / SCIM プロビジョニング", en: "SSO / SCIM provisioning" },
  { ja: "専任カスタマーサクセス", en: "Dedicated customer success" },
  { ja: "オンプレ / 専用クラウド", en: "On-prem / dedicated cloud" },
  { ja: "セキュリティレビュー対応", en: "Security review support" },
  { ja: "請求書・年間一括払い", en: "Invoicing & annual billing" },
];

export default function EnterpriseContact() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto grid max-w-5xl items-stretch gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
        <div className="bg-gradient-to-br from-primary/90 to-primary p-8 text-primary-foreground sm:p-10">
          <Building2 className="size-9" />
          <h2 className="mt-5 text-2xl font-bold tracking-tight">
            {en ? "Enterprise" : "エンタープライズ"}
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            {en
              ? "Flexible, secure plans for large organizations."
              : "大規模組織のための、柔軟でセキュアなプラン。"}
          </p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-4xl font-bold">
              {en ? "Let's talk" : "応相談"}
            </span>
          </div>
          <ul className="mt-7 space-y-3 text-sm">
            {feats.map((f) => (
              <li key={f.en} className="flex items-center gap-2">
                <Check className="size-4 shrink-0" />
                {en ? f.en : f.ja}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card p-8 sm:p-10">
          <h3 className="text-lg font-semibold text-foreground">
            {en ? "Talk to sales" : "営業に相談する"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {en
              ? "We'll get back to you within one business day."
              : "1営業日以内にご連絡します。"}
          </p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="ent-name" className="mb-1.5 block text-sm font-medium text-foreground">
                {en ? "Name" : "お名前"}
              </label>
              <Input id="ent-name" placeholder={en ? "Taro Yamada" : "山田 太郎"} />
            </div>
            <div>
              <label htmlFor="ent-email" className="mb-1.5 block text-sm font-medium text-foreground">
                {en ? "Work email" : "会社メール"}
              </label>
              <Input
                id="ent-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="group w-full">
              {en ? "Contact us" : "問い合わせる"}
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            {en
              ? "By submitting, you agree to the terms of service."
              : "送信することで利用規約に同意したものとみなされます。"}
          </p>
        </div>
      </div>
    </div>
  );
}
