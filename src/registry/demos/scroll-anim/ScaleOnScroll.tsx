import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロールでスケール",
  category: "スクロール演出",
  description: "ヒーローカードが視界に入ると拡大して迫り出す。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "scale"],
};

export default function ScaleOnScroll() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const target = root.querySelector<HTMLElement>("[data-hero]");
    if (!target) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { root, threshold: 0.6 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div ref={rootRef} className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-background p-6">
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          {en ? "↓ Scroll down" : "↓ 下にスクロール"}
        </div>
        <div className="flex min-h-[300px] items-center justify-center py-8">
          <div
            data-hero
            className={cn(
              "flex aspect-[4/3] w-full max-w-md flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-center text-white shadow-2xl transition-all duration-700 ease-out",
              active ? "scale-100 opacity-100 blur-0" : "scale-75 opacity-50 blur-[2px]",
            )}
          >
            <h3 className="text-3xl font-black">SCALE IN</h3>
            <p className="mt-2 text-white/80">{en ? "Scales up as it enters view" : "視界に入ると拡大します"}</p>
          </div>
        </div>
        <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
          スクロール領域の終わり
        </div>
      </div>
    </div>
  );
}
