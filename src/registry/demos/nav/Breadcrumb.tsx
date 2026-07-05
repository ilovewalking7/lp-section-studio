import { useState } from "react";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パンくずリスト",
  category: "ナビゲーション",
  description:
    "区切り記号・中間の折りたたみ（オーバーフロー）・現在ページ表示を備えたパンくずナビ。",
  align: "full",
  isNew: true,
  tags: ["navigation", "breadcrumb"],
  principle:
    "現在地までの階層を可視化して方向感覚を与え（情報の匂い）、長い経路は中間を省略して幅を制御しつつ展開可能にする。",
};

const TRAIL = [
  { ja: "ホーム", en: "Home" },
  { ja: "ワークスペース", en: "Workspace" },
  { ja: "プロジェクト", en: "Projects" },
  { ja: "デザインシステム", en: "Design System" },
  { ja: "コンポーネント", en: "Components" },
  { ja: "ボタン", en: "Button" },
];

export default function Breadcrumb() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [expanded, setExpanded] = useState(false);

  const first = TRAIL[0];
  const last = TRAIL[TRAIL.length - 1];
  const secondLast = TRAIL[TRAIL.length - 2];
  const collapsed = TRAIL.slice(1, TRAIL.length - 2);

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-4 shadow-sm">
        <nav aria-label={en ? "Breadcrumb" : "パンくずリスト"}>
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            <li className="flex items-center">
              <a
                href="#"
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Home className="size-4" />
                <span className="sr-only sm:not-sr-only">
                  {en ? first.en : first.ja}
                </span>
              </a>
            </li>

            <Sep />

            {!expanded ? (
              <li className="flex items-center">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  aria-label={en ? "Show hidden levels" : "省略された階層を表示"}
                  className="flex items-center rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </li>
            ) : (
              collapsed.map((item) => (
                <li key={item.en} className="flex items-center">
                  <a
                    href="#"
                    className="max-w-[10rem] truncate rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {en ? item.en : item.ja}
                  </a>
                  <Sep />
                </li>
              ))
            )}

            {!expanded && <Sep />}

            <li className="flex items-center">
              <a
                href="#"
                className="max-w-[12rem] truncate rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {en ? secondLast.en : secondLast.ja}
              </a>
            </li>

            <Sep />

            <li>
              <span
                aria-current="page"
                className="rounded-md px-2 py-1 font-medium text-foreground"
              >
                {en ? last.en : last.ja}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

function Sep() {
  return (
    <ChevronRight
      className={cn("size-4 shrink-0 text-muted-foreground/50")}
      aria-hidden
    />
  );
}
