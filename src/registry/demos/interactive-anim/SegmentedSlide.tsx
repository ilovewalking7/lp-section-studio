import { useState } from "react";
import { LayoutGrid, List, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "セグメントスライド",
  category: "インタラクション",
  description: "背景ハイライトがスライドして選択肢を切り替えるセグメントコントロール。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "segmented"],
};

const PERIODS = [
  { ja: "日", en: "Day" },
  { ja: "週", en: "Week" },
  { ja: "月", en: "Month" },
  { ja: "年", en: "Year" },
] as const;
const VIEWS = [
  { id: "grid", label: "グリッド", labelEn: "Grid", icon: LayoutGrid },
  { id: "list", label: "リスト", labelEn: "List", icon: List },
  { id: "rows", label: "行", labelEn: "Rows", icon: Rows3 },
] as const;

export default function SegmentedSlide() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [period, setPeriod] = useState(1);
  const [view, setView] = useState(0);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="relative flex w-full rounded-lg bg-muted p-1">
        <div
          className="absolute inset-y-1 rounded-md bg-background shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            width: `calc((100% - 0.5rem) / ${PERIODS.length})`,
            transform: `translateX(${period * 100}%)`,
          }}
        />
        {PERIODS.map((p, i) => (
          <button
            key={p.en}
            type="button"
            onClick={() => setPeriod(i)}
            className={cn(
              "relative z-10 flex-1 rounded-md py-1.5 text-sm font-medium transition-colors",
              period === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {en ? p.en : p.ja}
          </button>
        ))}
      </div>

      <div className="relative flex rounded-lg bg-muted p-1">
        <div
          className="absolute inset-y-1 rounded-md bg-primary shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            width: `calc((100% - 0.5rem) / ${VIEWS.length})`,
            transform: `translateX(${view * 100}%)`,
          }}
        />
        {VIEWS.map((v, i) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(i)}
            className={cn(
              "relative z-10 flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              view === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <v.icon className="size-4" />
            <span className="hidden sm:inline">{en ? v.labelEn : v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
