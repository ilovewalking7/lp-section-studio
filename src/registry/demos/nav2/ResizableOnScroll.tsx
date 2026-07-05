import { useEffect, useRef, useState } from "react";
import { Layers, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロール縮小ナビ",
  category: "ナビゲーション",
  description:
    "フレーム内をスクロールするとロゴとパディングが滑らかに縮むレスポンシブな固定ヘッダー。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

const LINKS = [
  { ja: "ホーム", en: "Home" },
  { ja: "事例", en: "Cases" },
  { ja: "価格", en: "Pricing" },
  { ja: "会社", en: "Company" },
];

export default function ResizableOnScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shrunk, setShrunk] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShrunk(el.scrollTop > 24);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full bg-muted/30 p-4 sm:p-6">
      <div className="relative mx-auto h-80 max-w-3xl overflow-hidden rounded-2xl border bg-background shadow-sm">
        <header
          className={cn(
            "sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-5 backdrop-blur-md transition-all duration-300",
            shrunk ? "h-12" : "h-20"
          )}
        >
          <div className="flex items-center gap-2 font-semibold">
            <span
              className={cn(
                "grid place-items-center rounded-lg bg-primary text-primary-foreground transition-all duration-300",
                shrunk ? "size-7" : "size-10"
              )}
            >
              <Layers className={cn("transition-all", shrunk ? "size-3.5" : "size-5")} />
            </span>
            <span
              className={cn(
                "transition-all duration-300",
                shrunk ? "text-sm" : "text-lg"
              )}
            >
              Scale
            </span>
          </div>
          <nav className="hidden items-center gap-4 sm:flex">
            {LINKS.map((l) => (
              <a
                key={l.en}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {en ? l.en : l.ja}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label={en ? "Search" : "検索"}
            className="grid size-8 place-items-center rounded-full border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="size-4" />
          </button>
        </header>

        <div ref={scrollRef} className="h-[calc(20rem-0px)] overflow-y-auto">
          <div className="space-y-4 p-6 pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {en ? "Scroll down to shrink the header" : "下にスクロールしてヘッダーを縮小"}
            </p>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-xl border bg-card"
                style={{ opacity: 1 - i * 0.04 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
