import { useState } from "react";
import { Check, ChevronDown, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "モデル選択",
  category: "AI / チャット",
  description: "バッジ付きでAIモデルを選べるドロップダウン。",
  align: "center",
};

type Model = {
  id: string;
  name: string;
  ja: string;
  en: string;
  badge: "Fast" | "Smart";
};

const models: Model[] = [
  {
    id: "flash",
    name: "Studio Flash",
    ja: "軽量・低遅延。日常的な質問に最適。",
    en: "Lightweight and low-latency. Great for everyday questions.",
    badge: "Fast",
  },
  {
    id: "pro",
    name: "Studio Pro",
    ja: "推論力と速度のバランス型。",
    en: "A balance of reasoning power and speed.",
    badge: "Smart",
  },
  {
    id: "ultra",
    name: "Studio Ultra",
    ja: "最難関のタスク向けの最上位モデル。",
    en: "Our top-tier model for the hardest tasks.",
    badge: "Smart",
  },
];

function BadgePill({ kind }: { kind: Model["badge"] }) {
  const fast = kind === "Fast";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
        fast
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-violet-500/10 text-violet-400"
      )}
    >
      {fast ? <Zap className="size-3" /> : <Sparkles className="size-3" />}
      {kind}
    </span>
  );
}

export default function ModelPicker() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<Model>(models[1]);

  return (
    <div className="w-full max-w-[360px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border bg-card px-3 py-2.5 text-sm shadow-sm transition-colors hover:bg-accent/50"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Sparkles className="size-4 text-violet-400" />
          <span className="font-medium text-foreground">{selected.name}</span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="mt-2 overflow-hidden rounded-lg border bg-popover p-1 shadow-lg">
          {models.map((m) => {
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
                  "flex w-full items-start gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-accent",
                  active && "bg-accent/60"
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {m.name}
                    </span>
                    <BadgePill kind={m.badge} />
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {en ? m.en : m.ja}
                  </p>
                </div>
                <Check
                  className={cn(
                    "mt-0.5 size-4 shrink-0 text-violet-400",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
