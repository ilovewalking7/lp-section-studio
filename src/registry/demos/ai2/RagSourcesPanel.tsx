import { useState } from "react";
import { Database, FileText, Globe, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "RAG参照ソースパネル",
  category: "AI / チャット",
  description: "検索拡張生成で参照したチャンクと一致度を表示。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

type Source = {
  id: number;
  icon: typeof FileText;
  titleJa: string;
  titleEn: string;
  snippetJa: string;
  snippetEn: string;
  score: number;
  kindJa: string;
  kindEn: string;
};

const SOURCES: Source[] = [
  {
    id: 1,
    icon: FileText,
    titleJa: "設計ガイド.pdf — 3章",
    titleEn: "design-guide.pdf — Chapter 3",
    snippetJa: "遅延読み込みは初期バンドルを軽量化し、初回描画を高速化する基本手法です。",
    snippetEn: "Lazy loading is a core technique that slims the initial bundle and speeds up first paint.",
    score: 0.94,
    kindJa: "ドキュメント",
    kindEn: "Document",
  },
  {
    id: 2,
    icon: Database,
    titleJa: "ナレッジベース #482",
    titleEn: "Knowledge base #482",
    snippetJa: "import.meta.glob を使うとファイル追加だけで自動的にレジストリへ反映されます。",
    snippetEn: "With import.meta.glob, simply adding a file registers it automatically.",
    score: 0.88,
    kindJa: "DB",
    kindEn: "DB",
  },
  {
    id: 3,
    icon: Globe,
    titleJa: "公式ブログ — パフォーマンス",
    titleEn: "Official blog — Performance",
    snippetJa: "コード分割により未使用コードの読み込みを避け、TTI を改善できます。",
    snippetEn: "Code splitting avoids loading unused code and improves time to interactive.",
    score: 0.81,
    kindJa: "Web",
    kindEn: "Web",
  },
];

export default function RagSourcesPanel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="w-full max-w-[480px] rounded-2xl border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 px-1">
        <Quote className="size-4 text-violet-500" />
        <p className="text-sm font-semibold">{en ? "Sources referenced" : "参照したソース"}</p>
        <span className="ml-auto text-[11px] text-muted-foreground">
          {en ? `${SOURCES.length} retrieved` : `${SOURCES.length}件を取得`}
        </span>
      </div>

      <div className="space-y-2">
        {SOURCES.map((s) => {
          const expanded = open === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setOpen(expanded ? null : s.id)}
              className={cn(
                "w-full rounded-xl border p-3 text-left transition-colors",
                expanded ? "border-violet-500/40 bg-violet-500/5" : "hover:bg-accent/50"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <s.icon className="size-3.5" />
                </div>
                <p className="min-w-0 flex-1 truncate text-sm font-medium">
                  {en ? s.titleEn : s.titleJa}
                </p>
                <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                  {Math.round(s.score * 100)}%
                </span>
              </div>

              <div className="mt-2 flex items-center gap-1.5">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500"
                    style={{ width: `${s.score * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{en ? s.kindEn : s.kindJa}</span>
              </div>

              {expanded && (
                <p className="mt-2 border-l-2 border-violet-500/40 pl-2.5 text-xs leading-relaxed text-muted-foreground">
                  {en ? s.snippetEn : s.snippetJa}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
