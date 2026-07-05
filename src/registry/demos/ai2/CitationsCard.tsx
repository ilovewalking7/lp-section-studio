import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "引用元カード",
  category: "AI / チャット",
  description: "回答に番号付き出典を添えるインライン引用カード。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

type Source = { id: number; titleJa: string; titleEn: string; site: string };

const SOURCES: Source[] = [
  { id: 1, titleJa: "公式ドキュメント — はじめに", titleEn: "Official docs — Getting started", site: "docs.example.com" },
  { id: 2, titleJa: "パフォーマンス最適化ガイド", titleEn: "Performance optimization guide", site: "blog.example.dev" },
  { id: 3, titleJa: "リリースノート v4.8", titleEn: "Release notes v4.8", site: "github.com" },
];

export default function CitationsCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[520px] rounded-2xl border bg-card p-5 shadow-sm">
      <p className="text-sm leading-relaxed text-foreground">
        {en ? (
          <>
            This library uses lazy loading to speed up the initial load
            <Cite n={1} hovered={hovered} setHovered={setHovered} />
            . Code splitting further reduces bundle size
            <Cite n={2} hovered={hovered} setHovered={setHovered} />
            , and the latest version also cuts build times
            <Cite n={3} hovered={hovered} setHovered={setHovered} />.
          </>
        ) : (
          <>
            このライブラリは初期ロードを高速化するために遅延読み込みを採用しています
            <Cite n={1} hovered={hovered} setHovered={setHovered} />
            。さらにコード分割によりバンドルサイズを削減し
            <Cite n={2} hovered={hovered} setHovered={setHovered} />
            、最新版ではビルド時間も短縮されました
            <Cite n={3} hovered={hovered} setHovered={setHovered} />。
          </>
        )}
      </p>

      <div className="mt-4 space-y-2 border-t pt-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {en ? "Sources" : "出典"}
        </p>
        {SOURCES.map((s) => (
          <a
            key={s.id}
            href="#"
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "flex items-center gap-2.5 rounded-lg border p-2.5 transition-colors",
              hovered === s.id
                ? "border-violet-500/50 bg-violet-500/5"
                : "hover:bg-accent/50"
            )}
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-[11px] font-bold text-violet-500">
              {s.id}
            </span>
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{en ? s.titleEn : s.titleJa}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {s.site}
              </p>
            </div>
            <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  );
}

function Cite({
  n,
  hovered,
  setHovered,
}: {
  n: number;
  hovered: number | null;
  setHovered: (v: number | null) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(n)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "mx-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-[4px] px-1 align-text-top text-[10px] font-bold transition-colors",
        hovered === n
          ? "bg-violet-500 text-white"
          : "bg-violet-500/15 text-violet-500"
      )}
    >
      {n}
    </button>
  );
}
