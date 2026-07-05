import { useCallback, useRef, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "トースト・スタック",
  category: "ローダー・マイクロ",
  description: "スライド＋フェードで出現し自動で消えるトースト。成功・エラー・情報。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "toast"],
};

const styles = `
@keyframes ldr-toast-in {
  from { opacity: 0; transform: translateX(120%) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes ldr-toast-out {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(120%) scale(0.9); }
}
@keyframes ldr-toast-bar { from { transform: scaleX(1); } to { transform: scaleX(0); } }
`;

type Kind = "success" | "error" | "info";
type Toast = { id: number; kind: Kind; leaving: boolean };

const config: Record<
  Kind,
  { icon: typeof Info; cls: string; msg: string; msgEn: string }
> = {
  success: {
    icon: CheckCircle2,
    cls: "text-emerald-500",
    msg: "保存しました。",
    msgEn: "Saved successfully.",
  },
  error: {
    icon: XCircle,
    cls: "text-red-500",
    msg: "エラーが発生しました。",
    msgEn: "Something went wrong.",
  },
  info: {
    icon: Info,
    cls: "text-sky-500",
    msg: "新しい更新があります。",
    msgEn: "A new update is available.",
  },
};
const DURATION = 3200;

export default function ToastStackAnim() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((ts) => ts.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    window.setTimeout(() => {
      setToasts((ts) => ts.filter((t) => t.id !== id));
    }, 260);
  }, []);

  const push = useCallback(
    (kind: Kind) => {
      const id = nextId.current++;
      setToasts((ts) => [...ts, { id, kind, leaving: false }]);
      window.setTimeout(() => remove(id), DURATION);
    },
    [remove],
  );

  return (
    <div className="relative flex h-[280px] w-full max-w-md flex-col items-center justify-center">
      <style>{styles}</style>

      <div className="flex gap-2">
        {(Object.keys(config) as Kind[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => push(k)}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium capitalize transition-colors hover:bg-accent"
          >
            {k}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute right-0 top-0 flex w-full max-w-xs flex-col items-end gap-2">
        {toasts.map((t) => {
          const { icon: Icon, cls, msg, msgEn } = config[t.kind];
          return (
            <div
              key={t.id}
              className="pointer-events-auto relative w-full overflow-hidden rounded-lg border border-border bg-card p-3 pr-9 shadow-lg"
              style={{
                animation: t.leaving
                  ? "ldr-toast-out 0.26s ease-in forwards"
                  : "ldr-toast-in 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", cls)} />
                <p className="text-sm text-foreground">{en ? msgEn : msg}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(t.id)}
                className="absolute right-2 top-2 rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label={en ? "Close" : "閉じる"}
              >
                <X className="h-3.5 w-3.5" />
              </button>
              {!t.leaving && (
                <span
                  className={cn("absolute bottom-0 left-0 h-0.5 w-full origin-left", cls)}
                  style={{
                    background: "currentColor",
                    animation: `ldr-toast-bar ${DURATION}ms linear forwards`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {toasts.length === 0 && (
        <p className="absolute bottom-6 text-xs text-muted-foreground">
          {en ? "Press a button to show a toast" : "ボタンを押すとトーストが出ます"}
        </p>
      )}
    </div>
  );
}
