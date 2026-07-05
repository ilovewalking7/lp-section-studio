import { useState } from "react";
import { LayoutGrid, List, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "セグメントコントロール",
  category: "インタラクション",
  description: "アクティブな丸ピルが滑るiOS風セグメント切替。",
  align: "center",
  isNew: true,
  tags: ["animation", "micro-interaction", "toggle"],
  principle:
    "選択ピルが滑ることで前後の状態が連続的に繋がり、どこへ移動したかが一目で分かる。瞬時に切り替わるより認知負荷が低い。",
};

const OPTIONS = [
  { id: "grid", ja: "グリッド", en: "Grid", icon: LayoutGrid },
  { id: "list", ja: "リスト", en: "List", icon: List },
  { id: "compact", ja: "コンパクト", en: "Compact", icon: Rows3 },
] as const;

export default function SegmentedControl() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-flex rounded-full bg-muted p-1">
        <div
          className="absolute inset-y-1 rounded-full bg-background shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            width: `calc((100% - 0.5rem) / ${OPTIONS.length})`,
            transform: `translateX(${active * 100}%)`,
          }}
        />
        {OPTIONS.map((opt, i) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => setActive(i)}
              className={cn(
                "relative z-10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                active === i
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {en ? opt.en : opt.ja}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {en ? "Current view:" : "現在の表示:"}{" "}
        <span className="font-semibold text-foreground">
          {en ? OPTIONS[active].en : OPTIONS[active].ja}
        </span>
      </p>
    </div>
  );
}
