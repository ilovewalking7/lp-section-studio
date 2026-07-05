import { useState } from "react";
import {
  Boxes,
  ChevronDown,
  CreditCard,
  LayoutGrid,
  LifeBuoy,
  LineChart,
  Lock,
  Menu,
  Search,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メガメニューナビ",
  category: "ナビゲーション",
  description:
    "ホバー/クリックでアイコン付きリンク列を展開する一流のメガメニュー。相対フレーム内に収まる。",
  align: "full",
  isNew: true,
  tags: ["navigation", "navbar", "megamenu"],
  principle:
    "関連リンクを意味のある列にグループ化することで認知負荷を下げ（情報設計）、広いホバー面でフィッツの法則に従い選択を高速化する。",
};

type MenuLink = {
  icon: LucideIcon;
  title: { ja: string; en: string };
  desc: { ja: string; en: string };
  badge?: { ja: string; en: string };
};

const COLUMNS: { heading: { ja: string; en: string }; links: MenuLink[] }[] = [
  {
    heading: { ja: "プロダクト", en: "Product" },
    links: [
      {
        icon: LayoutGrid,
        title: { ja: "ダッシュボード", en: "Dashboard" },
        desc: { ja: "全指標を一画面で俯瞰", en: "Every metric on one screen" },
      },
      {
        icon: Workflow,
        title: { ja: "ワークフロー", en: "Workflows" },
        desc: { ja: "自動化で手作業を排除", en: "Automate away manual work" },
      },
      {
        icon: LineChart,
        title: { ja: "アナリティクス", en: "Analytics" },
        desc: { ja: "リアルタイム計測", en: "Real-time measurement" },
        badge: { ja: "新", en: "New" },
      },
    ],
  },
  {
    heading: { ja: "ソリューション", en: "Solutions" },
    links: [
      {
        icon: Zap,
        title: { ja: "高速デプロイ", en: "Fast deploys" },
        desc: { ja: "数秒で本番反映", en: "Ship to prod in seconds" },
      },
      {
        icon: Lock,
        title: { ja: "セキュリティ", en: "Security" },
        desc: { ja: "SOC2 / SSO 対応", en: "SOC2 / SSO ready" },
      },
      {
        icon: CreditCard,
        title: { ja: "課金管理", en: "Billing" },
        desc: { ja: "従量・定額を柔軟に", en: "Flexible usage & flat plans" },
      },
    ],
  },
];

const NAV = [
  { ja: "プロダクト", en: "Product" },
  { ja: "価格", en: "Pricing" },
  { ja: "ドキュメント", en: "Docs" },
  { ja: "会社情報", en: "Company" },
];

export default function MegaMenuNavbar() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full bg-gradient-to-b from-muted/40 to-background p-4 sm:p-8">
      <div className="relative mx-auto max-w-5xl">
        <nav
          className="flex items-center justify-between gap-4 rounded-2xl border bg-card/80 px-4 py-3 shadow-sm backdrop-blur"
          aria-label={en ? "Main" : "メイン"}
        >
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Boxes className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Aurora</span>
          </div>

          <ul className="hidden items-center gap-1 md:flex">
            <li>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  open
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {en ? "Product" : "プロダクト"}
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform",
                    open && "rotate-180"
                  )}
                />
              </button>
            </li>
            {NAV.slice(1).map((item) => (
              <li key={item.en}>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {en ? item.en : item.ja}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label={en ? "Search" : "検索"}>
              <Search />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              {en ? "Log in" : "ログイン"}
            </Button>
            <Button size="sm">{en ? "Get started free" : "無料で始める"}</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label={en ? "Menu" : "メニュー"}>
              <Menu />
            </Button>
          </div>
        </nav>

        {open && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 origin-top">
            <div className="overflow-hidden rounded-2xl border bg-popover p-2 shadow-xl">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {COLUMNS.map((col) => (
                  <div key={col.heading.en} className="p-2">
                    <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {en ? col.heading.en : col.heading.ja}
                    </p>
                    <ul className="space-y-1">
                      {col.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.title.en}>
                            <a
                              href="#"
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-accent"
                            >
                              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border bg-background text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                                <Icon className="size-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-foreground">
                                    {en ? link.title.en : link.title.ja}
                                  </span>
                                  {link.badge && (
                                    <Badge className="h-4 px-1.5 text-[10px]">
                                      {en ? link.badge.en : link.badge.ja}
                                    </Badge>
                                  )}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                  {en ? link.desc.en : link.desc.ja}
                                </span>
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                <div className="hidden p-2 lg:block">
                  <a
                    href="#"
                    className="flex h-full flex-col justify-between rounded-xl border bg-gradient-to-br from-primary/10 to-transparent p-4"
                  >
                    <Sparkles className="size-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Aurora AI</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {en
                          ? "AI suggests your best workflows automatically. Try it now."
                          : "AI が最適なワークフローを自動提案。今すぐ体験。"}
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between rounded-xl bg-muted/50 px-4 py-2.5">
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <LifeBuoy className="size-4" />
                  {en
                    ? "Need help? Our support team is here for you."
                    : "お困りですか？サポートチームが対応します。"}
                </span>
                <Button variant="link" size="sm" className="h-auto p-0">
                  {en ? "Help center" : "ヘルプセンター"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
