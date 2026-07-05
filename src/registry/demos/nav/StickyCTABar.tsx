import { useState } from "react";
import { ShieldCheck, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "固定CTAバー",
  category: "ナビゲーション",
  description:
    "相対フレーム下部に固定される、解除可能なアクションバー（購入/保存）。",
  align: "full",
  isNew: true,
  tags: ["navigation", "cta", "sticky"],
  principle:
    "常に視界に残るアンカーで意思決定を後押しし（プログレッシブ・ディスクロージャ）、解除可能にすることで圧迫感を与えない。",
};

export default function StickyCTABar() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(true);

  const features = en
    ? [
        "Unlimited members and projects",
        "Real-time analytics dashboard",
        "SSO, audit logs, priority support",
      ]
    : [
        "無制限のメンバーとプロジェクト",
        "リアルタイム分析ダッシュボード",
        "SSO・監査ログ・優先サポート",
      ];

  return (
    <div className="w-full bg-muted/30 p-4 sm:p-6">
      <div className="relative mx-auto h-[26rem] max-w-3xl overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="space-y-4 p-6 sm:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            {en ? "Annual plan 30% OFF" : "年間プラン 30% OFF"}
          </span>
          <h3 className="text-xl font-semibold tracking-tight">
            {en
              ? "Take your team to the next stage with Aurora Pro"
              : "Aurora Pro でチームを次のステージへ"}
          </h3>
          <p className="max-w-prose text-sm text-muted-foreground">
            {en
              ? "Unlimited projects, advanced analytics, and priority support. The bar at the bottom stays visible even as you scroll the preview area."
              : "無制限のプロジェクト、高度な分析、優先サポート。プレビューエリアをスクロールしても、下部のバーは常に表示されたままです。"}
          </p>
          <div className="space-y-2 pt-2">
            {features.map((f) => (
              <p key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="size-4 text-primary" />
                {f}
              </p>
            ))}
          </div>
        </div>

        {open && (
          <div className="absolute inset-x-0 bottom-0 z-10 border-t bg-background/90 p-3 backdrop-blur sm:p-4">
            <div className="flex items-center gap-3">
              <div className="hidden size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary sm:grid">
                <Sparkles className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {en ? "Upgrade to Pro?" : "Pro にアップグレードしますか？"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">¥1,200</span>
                  {en ? "/mo · cancel anytime" : "/月 · いつでもキャンセル可能"}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                {en ? "Later" : "後で"}
              </Button>
              <Button size="sm">{en ? "Start now" : "今すぐ開始"}</Button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={en ? "Close bar" : "バーを閉じる"}
                className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        )}

        {!open && (
          <div className="absolute inset-x-0 bottom-0 p-4 text-center">
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              {en ? "Show bar again" : "バーを再表示"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
