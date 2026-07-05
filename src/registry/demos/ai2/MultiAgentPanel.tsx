import { useEffect, useState } from "react";
import { Bug, Loader2, PenTool, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マルチエージェントパネル",
  category: "AI / チャット",
  description: "複数エージェントが並行して作業する進捗パネル。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

type Agent = {
  id: string;
  nameJa: string;
  nameEn: string;
  roleJa: string;
  roleEn: string;
  icon: typeof Search;
  color: string;
  target: number;
};

const AGENTS: Agent[] = [
  { id: "r", nameJa: "リサーチャー", nameEn: "Researcher", roleJa: "情報収集", roleEn: "Gathering info", icon: Search, color: "text-sky-500", target: 100 },
  { id: "w", nameJa: "ライター", nameEn: "Writer", roleJa: "ドラフト作成", roleEn: "Drafting", icon: PenTool, color: "text-violet-500", target: 72 },
  { id: "t", nameJa: "テスター", nameEn: "Tester", roleJa: "検証", roleEn: "Verifying", icon: Bug, color: "text-amber-500", target: 45 },
  { id: "v", nameJa: "レビュアー", nameEn: "Reviewer", roleJa: "品質確認", roleEn: "Quality check", icon: ShieldCheck, color: "text-emerald-500", target: 20 },
];

export default function MultiAgentPanel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const t = window.setInterval(() => {
      setProgress((prev) => {
        const next: Record<string, number> = {};
        let allDone = true;
        for (const a of AGENTS) {
          const cur = prev[a.id] ?? 0;
          next[a.id] = Math.min(a.target, cur + 3);
          if (next[a.id] < a.target) allDone = false;
        }
        if (allDone) window.clearInterval(t);
        return next;
      });
    }, 90);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="w-full max-w-[440px] rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold">{en ? "Orchestration" : "オーケストレーション"}</p>
        <span className="flex items-center gap-1.5 rounded-full bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-500">
          <Loader2 className="size-3 animate-spin" />
          {en ? "Running" : "実行中"}
        </span>
      </div>

      <div className="space-y-3">
        {AGENTS.map((a) => {
          const p = progress[a.id] ?? 0;
          const done = p >= a.target;
          return (
            <div key={a.id} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted",
                  a.color
                )}
              >
                <a.icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium">{en ? a.nameEn : a.nameJa}</p>
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    {p}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-[width] duration-200 ease-out",
                      done ? "bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-sky-500"
                    )}
                    style={{ width: `${p}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {done ? (en ? "Done" : "完了") : en ? a.roleEn : a.roleJa}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
