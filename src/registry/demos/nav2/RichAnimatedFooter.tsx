import { useState } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Send,
  Twitter,
  Waypoints,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リッチアニメフッター",
  category: "ナビゲーション",
  description:
    "ニュースレター登録とリンク列、ホバーで動くソーシャルアイコンを備えたリッチなフッター。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

const COLS: {
  titleJa: string;
  titleEn: string;
  links: { ja: string; en: string }[];
}[] = [
  {
    titleJa: "製品",
    titleEn: "Product",
    links: [
      { ja: "機能", en: "Features" },
      { ja: "料金", en: "Pricing" },
      { ja: "連携", en: "Integrations" },
      { ja: "変更履歴", en: "Changelog" },
    ],
  },
  {
    titleJa: "会社",
    titleEn: "Company",
    links: [
      { ja: "About", en: "About" },
      { ja: "ブログ", en: "Blog" },
      { ja: "採用", en: "Careers" },
      { ja: "お問い合わせ", en: "Contact" },
    ],
  },
  {
    titleJa: "リソース",
    titleEn: "Resources",
    links: [
      { ja: "ドキュメント", en: "Docs" },
      { ja: "ガイド", en: "Guides" },
      { ja: "API", en: "API" },
      { ja: "サポート", en: "Support" },
    ],
  },
];

const SOCIALS: LucideIcon[] = [Twitter, Github, Linkedin, Youtube];

export default function RichAnimatedFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-background p-4 sm:p-6">
      <footer className="mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-card">
        <div className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <Waypoints className="size-5 text-primary" />
              Pathways
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {en
                ? "Get the latest updates delivered to your inbox."
                : "最新のアップデートを受け取りましょう。"}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
              className="mt-4 flex max-w-xs items-center gap-2 rounded-full border bg-background p-1 pl-4"
            >
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDone(false);
                }}
                type="email"
                required
                placeholder={en ? "Email address" : "メールアドレス"}
                aria-label={en ? "Email address" : "メールアドレス"}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label={en ? "Subscribe" : "登録"}
                className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-90"
              >
                <Send className="size-4" />
              </button>
            </form>
            <p
              className={cn(
                "mt-2 text-xs text-emerald-500 transition-opacity",
                done ? "opacity-100" : "opacity-0"
              )}
            >
              {en ? "Thanks for subscribing!" : "登録ありがとうございます！"}
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.titleEn}>
              <p className="text-sm font-medium">
                {en ? col.titleEn : col.titleJa}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.en}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {en ? l.en : l.ja}
                      <ArrowUpRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t px-8 py-5 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Pathways Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={en ? `Social ${i + 1}` : `ソーシャル ${i + 1}`}
                className="grid size-9 place-items-center rounded-full border text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
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
