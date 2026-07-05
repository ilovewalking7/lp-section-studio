import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "トースト通知",
  category: "アプリUI",
  description: "成功・エラー・情報のバリアント。自動消滅と手動クローズに対応した積み重ね通知。",
  align: "center",
};

type Variant = "success" | "error" | "info";

type Toast = {
  id: number;
  variant: Variant;
  title: string;
  description: string;
};

const VARIANTS: Record<
  Variant,
  {
    icon: typeof Info;
    ring: string;
    text: string;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    ring: "text-emerald-500",
    text: "text-emerald-500",
    title: "保存しました",
    titleEn: "Saved",
    description: "変更内容は正常に反映されました。",
    descriptionEn: "Your changes were applied successfully.",
  },
  error: {
    icon: AlertCircle,
    ring: "text-rose-500",
    text: "text-rose-500",
    title: "送信に失敗しました",
    titleEn: "Failed to send",
    description: "ネットワーク接続を確認してください。",
    descriptionEn: "Please check your network connection.",
  },
  info: {
    icon: Info,
    ring: "text-sky-500",
    text: "text-sky-500",
    title: "新しい更新があります",
    titleEn: "A new update is available",
    description: "再読み込みで最新版を利用できます。",
    descriptionEn: "Reload to get the latest version.",
  },
};

const ORDER: Variant[] = ["success", "error", "info"];

function ToastItem({
  toast,
  onClose,
  en,
}: {
  toast: Toast;
  onClose: (id: number) => void;
  en: boolean;
}) {
  const cfg = VARIANTS[toast.variant];
  const Icon = cfg.icon;
  return (
    <div className="flex w-full items-start gap-3 rounded-lg border bg-card p-3.5 shadow-lg duration-300 animate-in slide-in-from-bottom-2 fade-in">
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", cfg.ring)} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">
          {en ? cfg.titleEn : cfg.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {en ? cfg.descriptionEn : cfg.description}
        </p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        aria-label={en ? "Close notification" : "通知を閉じる"}
        className="rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ToastStack() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);
  const cursor = useRef(0);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback(() => {
    const variant = ORDER[cursor.current % ORDER.length];
    cursor.current += 1;
    const cfg = VARIANTS[variant];
    const id = nextId.current++;
    const toast: Toast = { id, variant, title: cfg.title, description: cfg.description };
    setToasts((prev) => [...prev.slice(-3), toast]);
    timers.current[id] = setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  useEffect(() => {
    const snapshot = timers.current;
    return () => {
      Object.values(snapshot).forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5">
      <Button onClick={push}>{en ? "Show notification" : "通知を表示"}</Button>

      <div className="flex w-full flex-col gap-2">
        {toasts.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            {en
              ? "Press the button to stack notifications."
              : "ボタンを押して通知を積み重ねます。"}
          </p>
        ) : (
          toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={dismiss} en={en} />
          ))
        )}
      </div>
    </div>
  );
}
