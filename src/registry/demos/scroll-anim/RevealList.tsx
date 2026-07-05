import { useEffect, useRef, useState } from "react";
import { Check, Zap, Shield, Sparkles, Rocket, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リスト・スタガー出現",
  category: "スクロール演出",
  description: "リスト項目が入域時に時間差で順番に現れる（IO）。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "reveal", "stagger"],
};

const ITEMS = [
  { icon: Zap, t: "高速レンダリング", tEn: "Fast rendering", d: "遅延ロードで初期表示が軽快。", dEn: "Lazy loading keeps first paint snappy." },
  { icon: Shield, t: "型安全", tEn: "Type-safe", d: "strict TypeScript で堅牢。", dEn: "Rock-solid with strict TypeScript." },
  { icon: Sparkles, t: "美しい演出", tEn: "Beautiful motion", d: "CSS トランジションのみで動作。", dEn: "Runs on CSS transitions alone." },
  { icon: Rocket, t: "依存ゼロ", tEn: "Zero dependencies", d: "追加 npm パッケージ不要。", dEn: "No extra npm packages needed." },
  { icon: Heart, t: "アクセシブル", tEn: "Accessible", d: "セマンティックな構造。", dEn: "Semantic, accessible structure." },
  { icon: Check, t: "コピー可能", tEn: "Copy-ready", d: "自己完結で移植が容易。", dEn: "Self-contained and easy to port." },
];

export default function RevealList() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<Set<number>>(new Set());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        setShown((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            if (e.isIntersecting) next.add(Number((e.target as HTMLElement).dataset.idx));
          }
          return next;
        });
      },
      { root, threshold: 0.5 },
    );
    root.querySelectorAll<HTMLElement>("[data-idx]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div ref={rootRef} className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-background p-6">
        <h3 className="mb-1 text-lg font-bold text-foreground">{en ? "Key features" : "主な特徴"}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{en ? "They appear one by one as you scroll." : "スクロールで順に現れます。"}</p>
        <ul className="flex flex-col gap-3 pb-10">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <li
                key={it.t}
                data-idx={i}
                style={{ transitionDelay: shown.has(i) ? `${(i % 3) * 90}ms` : "0ms" }}
                className={cn(
                  "flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-500 ease-out",
                  shown.has(i) ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
                )}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{en ? it.tEn : it.t}</p>
                  <p className="text-sm text-muted-foreground">{en ? it.dEn : it.d}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
