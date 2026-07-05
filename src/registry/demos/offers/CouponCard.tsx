import { useState } from "react";
import { Check, Copy, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "クーポンチケット",
  category: "価格・オファー",
  description:
    "破線の切り取り線を持つプロモコードカード。コピーボタンと有効期限付き。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["coupon", "promo", "scarcity"],
  principle:
    "損失回避と希少性。期限と限定割引を明示することで「逃したくない」心理を刺激し、即時行動を促す。",
};

const CODE = "WELCOME30";

export default function CouponCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(CODE).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-card to-card shadow-sm">
        {/* 上部: 割引バナー */}
        <div className="flex items-center justify-between gap-3 p-5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-rose-500">
              <Tag className="size-3.5" /> {en ? "First-time coupon" : "初回限定クーポン"}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-rose-500">
                30%
              </span>
              <span className="text-lg font-semibold text-rose-500">OFF</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {en ? "Applies to all annual plans" : "すべての年額プランに適用"}
            </p>
          </div>
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-rose-500/40 text-center text-[11px] font-bold leading-tight text-rose-500">
            SAVE
            <br />
            ¥1,440
          </div>
        </div>

        {/* 切り取り線（チケットエッジ） */}
        <div className="relative h-6">
          <div
            className="absolute left-3 right-3 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-border"
            aria-hidden
          />
          <span
            className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-background"
            aria-hidden
          />
          <span
            className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-background"
            aria-hidden
          />
        </div>

        {/* 下部: コード + コピー */}
        <div className="space-y-3 p-5 pt-3">
          <div className="flex items-stretch gap-2">
            <div className="flex flex-1 items-center justify-center rounded-md border border-dashed bg-muted/50 px-3 py-2 font-mono text-base font-bold tracking-[0.2em]">
              {CODE}
            </div>
            <Button
              onClick={copy}
              variant={copied ? "secondary" : "default"}
              className={cn(copied && "text-emerald-600 dark:text-emerald-400")}
            >
              {copied ? (
                <>
                  <Check className="size-4" /> {en ? "Copied" : "コピー済"}
                </>
              ) : (
                <>
                  <Copy className="size-4" /> {en ? "Copy" : "コピー"}
                </>
              )}
            </Button>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5 text-rose-500" />
            <span className="font-medium text-foreground">{en ? "Jun 30, 2026" : "2026年6月30日"}</span>
            {en ? " · first 500 only" : "まで有効・先着500名"}
          </p>
        </div>
      </div>
    </div>
  );
}
