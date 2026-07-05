import { useState } from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメーションパンくず",
  category: "ナビゲーション",
  description:
    "クリックで階層を切り替えられるパンくずリスト。各セグメントがスタガーでフェードインする。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Seg = { ja: string; en: string };

const TRAILS: Record<string, { label: Seg; trail: Seg[] }> = {
  home: {
    label: { ja: "ホーム", en: "Home" },
    trail: [{ ja: "ホーム", en: "Home" }],
  },
  docs: {
    label: { ja: "ドキュメント", en: "Docs" },
    trail: [
      { ja: "ホーム", en: "Home" },
      { ja: "ドキュメント", en: "Docs" },
    ],
  },
  design: {
    label: { ja: "デザイン", en: "Design" },
    trail: [
      { ja: "ホーム", en: "Home" },
      { ja: "ドキュメント", en: "Docs" },
      { ja: "デザイン", en: "Design" },
    ],
  },
  detail: {
    label: { ja: "詳細", en: "Detail" },
    trail: [
      { ja: "ホーム", en: "Home" },
      { ja: "ドキュメント", en: "Docs" },
      { ja: "デザイン", en: "Design" },
      { ja: "コンポーネント詳細", en: "Component detail" },
    ],
  },
};

export default function AnimatedBreadcrumb() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [key, setKey] = useState<keyof typeof TRAILS>("detail");
  const trail = TRAILS[key].trail;

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TRAILS) as (keyof typeof TRAILS)[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKey(k)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                key === k ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              )}
            >
              {en ? TRAILS[k].label.en : TRAILS[k].label.ja}
            </button>
          ))}
        </div>

        <nav
          aria-label={en ? "Breadcrumb" : "パンくず"}
          className="rounded-xl border bg-background px-4 py-3"
        >
          <ol key={key} className="flex flex-wrap items-center gap-1 text-sm">
            {trail.map((seg, i) => {
              const last = i === trail.length - 1;
              return (
                <li
                  key={seg.en}
                  className="flex animate-[crumb_360ms_ease-out_both] items-center gap-1"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {i > 0 && (
                    <ChevronRight className="size-4 text-muted-foreground/60" />
                  )}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-current={last ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors",
                      last
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {i === 0 && <Home className="size-3.5" />}
                    {en ? seg.en : seg.ja}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      <style>{`@keyframes crumb{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}
