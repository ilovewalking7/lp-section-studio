import { useState } from "react";
import {
  ArrowRight,
  Boxes,
  Github,
  Globe,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リッチフッター",
  category: "ナビゲーション",
  description:
    "リンク列・ニュースレター入力・SNSアイコン・法務行を備えたマーケティング向けフッター。",
  align: "full",
  isNew: true,
  tags: ["navigation", "footer", "marketing"],
  principle:
    "サイトの最終接点でリンクを意味カテゴリに整理し（情報設計）、ニュースレターで離脱前の再エンゲージを促す。",
};

const COLUMNS: {
  heading: string;
  headingEn: string;
  links: { ja: string; en: string }[];
}[] = [
  {
    heading: "プロダクト",
    headingEn: "Product",
    links: [
      { ja: "機能", en: "Features" },
      { ja: "価格", en: "Pricing" },
      { ja: "連携", en: "Integrations" },
      { ja: "変更履歴", en: "Changelog" },
      { ja: "ロードマップ", en: "Roadmap" },
    ],
  },
  {
    heading: "リソース",
    headingEn: "Resources",
    links: [
      { ja: "ドキュメント", en: "Docs" },
      { ja: "ガイド", en: "Guides" },
      { ja: "API", en: "API" },
      { ja: "ブログ", en: "Blog" },
      { ja: "コミュニティ", en: "Community" },
    ],
  },
  {
    heading: "会社",
    headingEn: "Company",
    links: [
      { ja: "会社概要", en: "About" },
      { ja: "採用", en: "Careers" },
      { ja: "プレス", en: "Press" },
      { ja: "パートナー", en: "Partners" },
      { ja: "お問い合わせ", en: "Contact" },
    ],
  },
];

const SOCIAL: { icon: LucideIcon; label: string }[] = [
  { icon: Twitter, label: "X" },
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

export default function RichFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="w-full bg-muted/20 p-4 sm:p-6">
      <footer className="mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Boxes className="size-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Aurora</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              {en
                ? "A first-class workflow platform that maximizes your team's productivity."
                : "チームの生産性を最大化する、一流のワークフロープラットフォーム。"}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="max-w-sm"
            >
              <label
                htmlFor="footer-newsletter"
                className="mb-2 block text-sm font-medium"
              >
                {en ? "Get the latest updates" : "最新情報を受け取る"}
              </label>
              <div className="flex gap-2">
                <Input
                  id="footer-newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSent(false);
                  }}
                  placeholder="you@example.com"
                  className="flex-1"
                />
                <Button type="submit" aria-label={en ? "Subscribe" : "購読する"}>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              <p
                className={cn(
                  "mt-2 text-xs",
                  sent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {sent
                  ? en
                    ? "Thanks for subscribing. We've sent a confirmation email."
                    : "登録ありがとうございます。確認メールを送信しました。"
                  : en
                    ? "One product update a month. Unsubscribe anytime."
                    : "月1回のプロダクト更新。いつでも解除できます。"}
              </p>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-sm font-semibold">
                  {en ? col.headingEn : col.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.ja}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {en ? link.en : link.ja}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t px-8 py-5 sm:flex-row sm:px-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>© 2026 Aurora Inc.</span>
            <a href="#" className="transition-colors hover:text-foreground">
              {en ? "Terms" : "利用規約"}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              {en ? "Privacy" : "プライバシー"}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookie
            </a>
            <span className="inline-flex items-center gap-1">
              <Globe className="size-3.5" />
              {en ? "English" : "日本語"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {SOCIAL.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
