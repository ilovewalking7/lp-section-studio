import { useEffect, useState } from "react";
import { GitBranch, GitCommitHorizontal, Globe, Loader2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デプロイ・カード",
  category: "ダークテック",
  description: "コミット・ブランチ・進捗を示すデプロイ状況カード。",
  align: "center",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

const STEPS = [
  { id: "queue", ja: "キュー", en: "Queued" },
  { id: "build", ja: "ビルド", en: "Build" },
  { id: "deploy", ja: "デプロイ", en: "Deploy" },
  { id: "done", ja: "完了", en: "Done" },
];

export default function DeployCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 8 : p + 4));
    }, 700);
    return () => window.clearInterval(id);
  }, []);

  const done = progress >= 100;
  const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress / (100 / STEPS.length)));

  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0d1117] text-zinc-200 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "grid size-8 place-items-center rounded-lg border",
              done
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                : "border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
            )}
          >
            {done ? <Rocket className="size-4" /> : <Loader2 className="size-4 animate-spin" />}
          </span>
          <div>
            <h3 className="text-sm font-medium text-white">
              {en ? "Production deploy" : "プロダクションデプロイ"}
            </h3>
            <p className="font-mono text-xs text-zinc-500">
              {done
                ? en
                  ? "Live"
                  : "公開完了"
                : en
                  ? `${STEPS[stepIndex].en}…`
                  : `${STEPS[stepIndex].ja}中…`}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[10px]",
            done ? "bg-emerald-400/10 text-emerald-300" : "bg-cyan-400/10 text-cyan-300"
          )}
        >
          {done ? "READY" : "BUILDING"}
        </span>
      </div>

      <div className="space-y-3 px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <GitBranch className="size-3.5 text-zinc-500" />
          <span className="text-zinc-300">main</span>
          <span className="text-zinc-600">·</span>
          <GitCommitHorizontal className="size-3.5 text-zinc-500" />
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-300">a3f9c21</span>
          <span className="truncate text-zinc-500">feat: edge caching</span>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-500">{en ? "Progress" : "進捗"}</span>
            <span className="text-zinc-300">{Math.min(100, progress)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                done ? "bg-emerald-400" : "bg-gradient-to-r from-cyan-400 to-emerald-400"
              )}
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  i < stepIndex || done
                    ? "bg-emerald-400"
                    : i === stepIndex
                      ? "bg-cyan-400"
                      : "bg-white/10"
                )}
              />
              <span
                className={cn(
                  "font-mono text-[10px]",
                  i <= stepIndex || done ? "text-zinc-300" : "text-zinc-600"
                )}
              >
                {en ? s.en : s.ja}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3">
        <Globe className="size-3.5 text-zinc-500" />
        <a href="#" className="font-mono text-xs text-cyan-400 hover:underline">
          app.forge.dev
        </a>
        <span className="ml-auto font-mono text-xs text-zinc-600">iad1 · 42s</span>
      </div>
    </div>
  );
}
