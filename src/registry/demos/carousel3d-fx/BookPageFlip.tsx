import { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "ブック・ページめくり",
  category: "3Dカルーセル",
  description: "本のページが背表紙を軸に3Dでめくれていくページめくりカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Page = { id: number; titleJa: string; titleEn: string; bodyJa: string; bodyEn: string; from: string; to: string };

const PAGES: Page[] = [
  { id: 1, titleJa: "第一章", titleEn: "Chapter One", bodyJa: "霧の港で物語は始まった。", bodyEn: "The story began at a fog-bound harbor.", from: "#fde68a", to: "#fca5a5" },
  { id: 2, titleJa: "第二章", titleEn: "Chapter Two", bodyJa: "灯台の灯が真実を照らす。", bodyEn: "The lighthouse beam lit up the truth.", from: "#a5b4fc", to: "#67e8f9" },
  { id: 3, titleJa: "第三章", titleEn: "Chapter Three", bodyJa: "風は北へ、彼女は南へ。", bodyEn: "The wind went north; she went south.", from: "#6ee7b7", to: "#7dd3fc" },
  { id: 4, titleJa: "第四章", titleEn: "Chapter Four", bodyJa: "最後の手紙が燃え尽きた。", bodyEn: "The last letter burned to ash.", from: "#f0abfc", to: "#fda4af" },
];

export default function BookPageFlip() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex h-72 max-w-xl items-center justify-center"
        style={{ perspective: "1600px" }}
      >
        <div className="relative h-64 w-44 rounded-r-lg bg-muted shadow-inner">
          <div
            className="absolute inset-y-0 right-0 w-44"
            style={{ transformStyle: "preserve-3d" }}
          >
            {PAGES.map((p, i) => {
              const turned = i < active;
              return (
                <div
                  key={p.id}
                  className="absolute inset-0 origin-left rounded-r-lg p-4 shadow-lg transition-transform duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                    transform: turned ? "rotateY(-160deg)" : "rotateY(0deg)",
                    zIndex: turned ? i : PAGES.length - i,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <p className="text-sm font-bold text-slate-800">{en ? p.titleEn : p.titleJa}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-700">{en ? p.bodyEn : p.bodyJa}</p>
                  <BookOpen className="absolute bottom-3 right-3 h-5 w-5 text-slate-700/60" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Previous page" : "前のページ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm text-muted-foreground">
          {active} / {PAGES.length}
        </span>
        <button
          onClick={() => setActive((a) => Math.min(PAGES.length, a + 1))}
          disabled={active === PAGES.length}
          className={cn(
            "rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted",
            active === PAGES.length && "opacity-30"
          )}
          aria-label={en ? "Next page" : "次のページ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
