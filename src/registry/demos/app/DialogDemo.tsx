import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ダイアログ",
  category: "アプリUI",
  description: "プレビュー枠内に収まるモーダルダイアログ。確認・キャンセルのアクション付き。",
  align: "center",
};

export default function DialogDemo() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-background">
      {/* デバイスフレーム */}
      <div className="flex min-h-[280px] items-center justify-center p-8">
        <Button onClick={() => setOpen(true)}>
          {en ? "Delete project" : "プロジェクトを削除"}
        </Button>
      </div>

      {/* 暗転オーバーレイ（枠内に限定） */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 z-10 bg-background/80 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* ダイアログ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={cn(
          "absolute inset-x-4 top-1/2 z-20 -translate-y-1/2 rounded-xl border bg-card p-5 shadow-2xl transition-all duration-200",
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label={en ? "Close" : "閉じる"}
          className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 pr-4">
            <h2 id="dialog-title" className="text-base font-semibold text-foreground">
              {en ? "Delete this project?" : "プロジェクトを削除しますか？"}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {en
                ? "This action cannot be undone. The project and all related data will be permanently deleted."
                : "この操作は取り消せません。プロジェクトとすべての関連データが完全に削除されます。"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            {en ? "Cancel" : "キャンセル"}
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setOpen(false)}>
            {en ? "Delete" : "削除する"}
          </Button>
        </div>
      </div>
    </div>
  );
}
