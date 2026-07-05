import { useEffect, useRef, useState } from "react";
import { ArrowRight, Rocket, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スティッキー CTA バー",
  category: "ナビゲーション",
  description:
    "フレーム内を少しスクロールすると下端からスライドインする CTA バー。閉じると再表示しない。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

export default function StickyCTABar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShow(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const visible = show && !closed;

  return (
    <div className="w-full bg-muted/30 p-4 sm:p-6">
      <div className="relative mx-auto h-80 max-w-2xl overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div ref={scrollRef} className="h-full overflow-y-auto">
          <div className="space-y-4 p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {en ? "Scroll down to reveal the CTA" : "下にスクロールすると CTA が出現"}
            </p>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-1/3 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted/70" />
                <div className="h-3 w-5/6 rounded bg-muted/70" />
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 transition-all duration-500 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
        >
          <div className="m-3 flex items-center gap-3 rounded-xl border bg-popover/95 p-3 shadow-xl backdrop-blur">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Rocket className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                {en ? "14-day free trial" : "14日間の無料トライアル"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {en
                  ? "No credit card required · cancel anytime"
                  : "クレジットカード不要・いつでも解約可能"}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
            >
              {en ? "Start" : "開始"}
              <ArrowRight className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setClosed(true)}
              aria-label={en ? "Close" : "閉じる"}
              className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-accent"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
