import { useState } from "react";
import { LayoutDashboard, Workflow, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "タブ切替の機能紹介",
  category: "マーケティング",
  description:
    "タブで機能を切り替えると、下のスライダーがなめらかに移動し、内容がフェードで入れ替わる。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const TABS = [
  {
    icon: LayoutDashboard,
    label: "ダッシュボード",
    labelEn: "Dashboard",
    title: "全体が、ひと目で。",
    titleEn: "See everything at a glance.",
    body: "重要な指標をまとめて表示。気になる数字はクリックで深掘りできます。",
    bodyEn: "All your key metrics in one view. Click any number to dig deeper.",
    bullets: ["カスタマイズ自在", "リアルタイム更新", "共有リンク"],
    bulletsEn: ["Fully customizable", "Real-time updates", "Shareable links"],
    tone: "from-violet-500/20 to-indigo-500/10",
  },
  {
    icon: Workflow,
    label: "自動化",
    labelEn: "Automation",
    title: "繰り返しは、機械に。",
    titleEn: "Let machines handle the repetition.",
    body: "トリガーとアクションを組み合わせ、ノーコードで業務を自動化します。",
    bodyEn: "Combine triggers and actions to automate work, no code required.",
    bullets: ["条件分岐", "スケジュール実行", "外部連携"],
    bulletsEn: ["Conditional logic", "Scheduled runs", "External integrations"],
    tone: "from-sky-500/20 to-cyan-500/10",
  },
  {
    icon: ShieldCheck,
    label: "セキュリティ",
    labelEn: "Security",
    title: "守りは、堅く。",
    titleEn: "Defense, locked down tight.",
    body: "エンタープライズ級の保護を標準装備。監査ログも完備しています。",
    bodyEn: "Enterprise-grade protection built in, complete with audit logs.",
    bullets: ["SSO対応", "暗号化", "権限管理"],
    bulletsEn: ["SSO support", "Encryption", "Access control"],
    tone: "from-emerald-500/20 to-teal-500/10",
  },
];

export default function TabbedFeatures() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const Icon = tab.icon;

  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "One platform, endless possibilities." : "ひとつのプラットフォーム、無限の使い方。"}
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="機能"
          className="relative mx-auto flex max-w-md rounded-full border bg-muted/40 p-1"
        >
          <span
            aria-hidden
            className="absolute inset-y-1 rounded-full bg-background shadow-sm transition-all duration-300 ease-out"
            style={{ width: `calc((100% - 8px) / 3)`, left: `calc(4px + ${active} * (100% - 8px) / 3)` }}
          />
          {TABS.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                active === i ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <t.icon className="size-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        <div
          key={active}
          className="mt-8 grid items-center gap-8 rounded-3xl border bg-card p-6 sm:p-10 lg:grid-cols-2"
          style={{ animation: "tf-fade .4s ease-out" }}
        >
          <div>
            <span className="inline-flex size-11 items-center justify-center rounded-xl border bg-background">
              <Icon className="size-5 text-primary" />
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              {tab.title}
            </h3>
            <p className="mt-2 text-pretty text-muted-foreground">{tab.body}</p>
            <ul className="mt-5 space-y-2">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <ArrowRight className="size-4 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border">
            <div
              aria-hidden
              className={cn("absolute inset-0 bg-gradient-to-br", tab.tone)}
            />
            <Icon className="relative size-20 text-foreground/70" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes tf-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
