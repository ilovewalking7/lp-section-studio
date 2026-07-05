import { useState } from "react";
import { Bell, Eye, Moon, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメスイッチ",
  category: "インタラクション",
  description: "つまみがバネのように動き色が切り替わるトグルスイッチ群。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "switch"],
};

const ROWS = [
  { icon: Moon, label: "ダークモード", labelEn: "Dark mode", desc: "目に優しい暗い配色", descEn: "Easy-on-the-eyes dark palette", on: true },
  { icon: Bell, label: "通知", labelEn: "Notifications", desc: "新着をプッシュ通知", descEn: "Push alerts for new items", on: false },
  { icon: Wifi, label: "自動接続", labelEn: "Auto-connect", desc: "既知のネットワークに接続", descEn: "Connect to known networks", on: true },
  { icon: Eye, label: "プレビュー", labelEn: "Preview", desc: "リンクの内容を先読み", descEn: "Prefetch link contents", on: false },
] as const;

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
        on ? "bg-primary" : "bg-muted-foreground/30"
      )}
    >
      <span
        className={cn(
          "absolute top-1 size-5 rounded-full bg-white shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)]",
          on ? "left-6 w-5" : "left-1"
        )}
      />
    </button>
  );
}

export default function AnimatedSwitch() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [state, setState] = useState<boolean[]>(ROWS.map((r) => r.on));

  return (
    <div className="w-full max-w-sm divide-y rounded-xl border bg-card">
      {ROWS.map((row, i) => (
        <div key={row.labelEn} className="flex items-center gap-3 p-4">
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-lg transition-colors",
              state[i] ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}
          >
            <row.icon className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium">{en ? row.labelEn : row.label}</div>
            <div className="truncate text-xs text-muted-foreground">{en ? row.descEn : row.desc}</div>
          </div>
          <Toggle
            on={state[i]}
            label={en ? row.labelEn : row.label}
            onToggle={() =>
              setState((s) => s.map((v, j) => (j === i ? !v : v)))
            }
          />
        </div>
      ))}
    </div>
  );
}
