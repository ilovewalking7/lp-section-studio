import { useState } from "react";
import { Check, ChevronDown, Gauge, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "モデル選択ドロップダウン",
  category: "AI / チャット",
  description: "速度・性能バッジ付きでAIモデルを切り替えるメニュー。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

type Model = {
  id: string;
  name: string;
  descJa: string;
  descEn: string;
  icon: typeof Zap;
  badgeJa: string;
  badgeEn: string;
  badgeClass: string;
};

const MODELS: Model[] = [
  {
    id: "opus",
    name: "Opus 4.8",
    descJa: "最も高性能・複雑な推論向け",
    descEn: "Most capable — for complex reasoning",
    icon: Sparkles,
    badgeJa: "最高性能",
    badgeEn: "Top",
    badgeClass: "bg-violet-500/10 text-violet-500",
  },
  {
    id: "sonnet",
    name: "Sonnet 4",
    descJa: "速度と知能のバランス",
    descEn: "Balanced speed and intelligence",
    icon: Gauge,
    badgeJa: "おすすめ",
    badgeEn: "Recommended",
    badgeClass: "bg-sky-500/10 text-sky-500",
  },
  {
    id: "haiku",
    name: "Haiku 3.5",
    descJa: "最速・軽量タスク向け",
    descEn: "Fastest — for lightweight tasks",
    icon: Zap,
    badgeJa: "最速",
    badgeEn: "Fastest",
    badgeClass: "bg-emerald-500/10 text-emerald-500",
  },
];

export default function ModelPickerDropdown() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(MODELS[1]);

  return (
    <div className="w-full max-w-[320px]">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-2.5 rounded-xl border bg-card px-3.5 py-2.5 text-left shadow-sm transition-colors hover:bg-accent/50"
        >
          <selected.icon className="size-4 shrink-0 text-violet-500" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{selected.name}</p>
            <p className="truncate text-[11px] text-muted-foreground">
              {en ? selected.descEn : selected.descJa}
            </p>
          </div>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border bg-card p-1 shadow-xl">
            {MODELS.map((m) => {
              const active = m.id === selected.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelected(m);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-accent",
                    active && "bg-accent/60"
                  )}
                >
                  <m.icon className="size-4 shrink-0 text-violet-500" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium">
                        {m.name}
                      </span>
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[9px] font-semibold",
                          m.badgeClass
                        )}
                      >
                        {en ? m.badgeEn : m.badgeJa}
                      </span>
                    </div>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {en ? m.descEn : m.descJa}
                    </p>
                  </div>
                  {active && (
                    <Check className="size-4 shrink-0 text-violet-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
