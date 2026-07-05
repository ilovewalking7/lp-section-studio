import { useEffect, useRef, useState } from "react";
import { FileText, CheckCircle2, X, UploadCloud } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アップロード進捗",
  category: "ローダー・マイクロ",
  description: "アニメ進捗バーと完了状態を持つファイルアップロードカード（JS擬似）。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "upload"],
};

type Phase = "idle" | "uploading" | "done";

export default function UploadProgress() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [phase, setPhase] = useState<Phase>("uploading");
  const [pct, setPct] = useState(0);
  const raf = useRef<number | null>(null);

  const run = () => {
    setPhase("uploading");
    setPct(0);
    const start = performance.now();
    const DURATION = 2600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 2);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setPhase("done");
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    run();
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sizeMB = 4.8;
  const uploaded = ((pct / 100) * sizeMB).toFixed(1);

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          {phase === "done" ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          ) : (
            <FileText className="h-6 w-6 text-primary" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium text-foreground">design-system.zip</p>
            {phase === "done" ? (
              <button
                type="button"
                onClick={run}
                className="shrink-0 text-xs font-medium text-primary hover:underline"
              >
                {en ? "Re-upload" : "再アップ"}
              </button>
            ) : (
              <X className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
            {phase === "done"
              ? `${sizeMB} MB · ${en ? "Done" : "完了"}`
              : `${uploaded} / ${sizeMB} MB · ${pct}%`}
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-colors"
          style={{
            width: `${pct}%`,
            backgroundColor:
              phase === "done" ? "rgb(16 185 129)" : "hsl(var(--primary))",
          }}
        />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <UploadCloud className="h-3.5 w-3.5" />
        {phase === "done"
          ? en
            ? "Saved to the server"
            : "サーバーに保存されました"
          : en
            ? "Uploading…"
            : "アップロード中…"}
      </div>
    </div>
  );
}
