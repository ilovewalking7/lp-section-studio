import { useState } from "react";
import { BarChart3, Boxes, LifeBuoy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバープレビューメニュー",
  category: "インタラクション",
  description: "ホバーでアンダーラインがスライドし、プレビューパネルが切り替わるナビ。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "nav"],
};

const ITEMS = [
  {
    id: "product",
    label: "製品",
    labelEn: "Product",
    icon: Boxes,
    title: "オールインワン製品",
    titleEn: "All-in-one product",
    body: "設計から運用までを1つのワークスペースで完結。",
    bodyEn: "Everything from design to operations in a single workspace.",
  },
  {
    id: "analytics",
    label: "分析",
    labelEn: "Analytics",
    icon: BarChart3,
    title: "リアルタイム分析",
    titleEn: "Real-time analytics",
    body: "指標を可視化し、意思決定を高速化します。",
    bodyEn: "Visualize your metrics and make decisions faster.",
  },
  {
    id: "ai",
    label: "AI",
    labelEn: "AI",
    icon: Sparkles,
    title: "AIアシスタント",
    titleEn: "AI assistant",
    body: "面倒な作業を自動化し、創造に集中できます。",
    bodyEn: "Automate tedious tasks and focus on creating.",
  },
  {
    id: "support",
    label: "サポート",
    labelEn: "Support",
    icon: LifeBuoy,
    title: "24時間サポート",
    titleEn: "24/7 support",
    body: "いつでも専門チームが課題解決を支援します。",
    bodyEn: "Our expert team helps solve your problems anytime.",
  },
] as const;

export default function HoverPreviewMenu() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? 0;

  return (
    <div className="w-full max-w-md">
      <nav
        onMouseLeave={() => setHover(null)}
        className="relative flex justify-between rounded-xl border bg-card px-2 py-1.5"
      >
        {hover !== null && (
          <div
            className="absolute bottom-1.5 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out"
            style={{
              width: `calc((100% - 1rem) / ${ITEMS.length} - 0.5rem)`,
              left: `calc(0.5rem + (100% - 1rem) / ${ITEMS.length} * ${hover} + 0.25rem)`,
            }}
          />
        )}
        {ITEMS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onMouseEnter={() => setHover(i)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
              hover === i ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <item.icon className="size-4" />
            <span className="hidden sm:inline">{en ? item.labelEn : item.label}</span>
          </button>
        ))}
      </nav>

      <div className="relative mt-3 overflow-hidden rounded-xl border bg-gradient-to-br from-card to-muted/40 p-5">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            aria-hidden={shown !== i}
            className={cn(
              "flex items-start gap-3 transition-all duration-300",
              shown === i
                ? "translate-x-0 opacity-100"
                : "pointer-events-none absolute inset-5 translate-x-3 opacity-0"
            )}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="size-5" />
            </div>
            <div>
              <div className="font-semibold">{en ? item.titleEn : item.title}</div>
              <p className="mt-0.5 text-sm text-muted-foreground">{en ? item.bodyEn : item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
