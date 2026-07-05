import { useState } from "react";
import {
  BarChart3,
  Boxes,
  ChevronDown,
  Cpu,
  Plug,
  Shield,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メガメニュー演出",
  category: "ナビゲーション",
  description:
    "ホバーでカテゴリ別に展開する2カラムのメガメニュー。フェード&スライドで滑らかに出現。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Item = {
  icon: LucideIcon;
  titleJa: string;
  titleEn: string;
  descJa: string;
  descEn: string;
};

const MENU: Item[] = [
  { icon: Zap, titleJa: "オートメーション", titleEn: "Automation", descJa: "ワークフローを自動化", descEn: "Automate your workflows" },
  { icon: BarChart3, titleJa: "アナリティクス", titleEn: "Analytics", descJa: "リアルタイム指標", descEn: "Real-time metrics" },
  { icon: Shield, titleJa: "セキュリティ", titleEn: "Security", descJa: "SSO とアクセス制御", descEn: "SSO and access control" },
  { icon: Plug, titleJa: "連携", titleEn: "Integrations", descJa: "100以上の統合", descEn: "100+ integrations" },
  { icon: Cpu, titleJa: "AI アシスト", titleEn: "AI Assist", descJa: "自然言語で操作", descEn: "Control with natural language" },
  { icon: Workflow, titleJa: "パイプライン", titleEn: "Pipelines", descJa: "視覚的に構築", descEn: "Build visually" },
];

const NAV = [
  { ja: "製品", en: "Product" },
  { ja: "ソリューション", en: "Solutions" },
  { ja: "開発者", en: "Developers" },
  { ja: "料金", en: "Pricing" },
];

export default function MegaMenuAnimated() {
  const [open, setOpen] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-muted/30 p-4 sm:p-8">
      <div className="relative mx-auto max-w-4xl">
        <nav className="rounded-xl border bg-background px-5 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <Boxes className="size-5 text-primary" />
              Nexus
            </div>
            <ul className="flex items-center gap-1">
              {NAV.map((l, i) => (
                <li
                  key={l.en}
                  onMouseEnter={() => i === 0 && setOpen(true)}
                  onMouseLeave={() => i === 0 && setOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={i === 0 ? open : undefined}
                    className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {en ? l.en : l.ja}
                    {i === 0 && (
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          open && "rotate-180"
                        )}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={cn(
              "absolute left-0 right-0 top-full z-20 origin-top px-2 pt-2 transition-all duration-200",
              open
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            )}
          >
            <div className="grid grid-cols-1 gap-1 rounded-xl border bg-popover p-3 shadow-xl sm:grid-cols-2">
              {MENU.map((m) => {
                const Icon = m.icon;
                return (
                  <a
                    key={m.titleEn}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">
                        {en ? m.titleEn : m.titleJa}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {en ? m.descEn : m.descJa}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
