import { useMemo, useState } from "react";
import {
  ArrowRight,
  CornerDownLeft,
  CreditCard,
  FileText,
  LayoutGrid,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コマンドバー",
  category: "ナビゲーション",
  description:
    "useState で絞り込むインライン結果ドロップダウン付きの検索/コマンドバー。相対フレーム内に収まる。",
  align: "center",
  isNew: true,
  tags: ["navigation", "command", "search"],
  principle:
    "入力に応じて選択肢を即時に絞り込むことで認知負荷を最小化し（ヒックの法則）、キーボード中心の操作で熟練ユーザーの速度を最大化する。",
};

type Command = {
  icon: LucideIcon;
  label: { ja: string; en: string };
  group: { ja: string; en: string };
  hint?: string;
};

const COMMANDS: Command[] = [
  {
    icon: LayoutGrid,
    label: { ja: "ダッシュボードを開く", en: "Open dashboard" },
    group: { ja: "移動", en: "Navigate" },
    hint: "G D",
  },
  {
    icon: FileText,
    label: { ja: "新規ドキュメント", en: "New document" },
    group: { ja: "作成", en: "Create" },
    hint: "N",
  },
  {
    icon: Users,
    label: { ja: "メンバーを招待", en: "Invite members" },
    group: { ja: "アクション", en: "Actions" },
  },
  {
    icon: CreditCard,
    label: { ja: "請求を表示", en: "View billing" },
    group: { ja: "移動", en: "Navigate" },
  },
  {
    icon: User,
    label: { ja: "プロフィール設定", en: "Profile settings" },
    group: { ja: "設定", en: "Settings" },
    hint: "G P",
  },
  {
    icon: Settings,
    label: { ja: "ワークスペース設定", en: "Workspace settings" },
    group: { ja: "設定", en: "Settings" },
  },
];

export default function CommandBar() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(0);

  const results = useMemo(
    () =>
      COMMANDS.filter((c) =>
        (en ? c.label.en : c.label.ja)
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      ),
    [query, en]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    results.forEach((c) => {
      const key = en ? c.group.en : c.group.ja;
      const arr = map.get(key) ?? [];
      arr.push(c);
      map.set(key, arr);
    });
    return Array.from(map.entries());
  }, [results, en]);

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="relative mx-auto max-w-xl">
        <div className="overflow-hidden rounded-2xl border bg-popover shadow-lg">
          <div className="flex items-center gap-3 border-b px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown")
                  setActive((a) => Math.min(results.length - 1, a + 1));
                if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
              }}
              placeholder={
                en
                  ? "Search commands, or type an action…"
                  : "コマンドを検索、または操作を入力…"
              }
              aria-label={en ? "Search commands" : "コマンドを検索"}
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
              ESC
            </kbd>
          </div>

          {open && (
            <div className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  {en
                    ? `No results match "${query}"`
                    : `「${query}」に一致する結果はありません`}
                </p>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      {group}
                    </p>
                    <ul>
                      {items.map((cmd) => {
                        const idx = results.indexOf(cmd);
                        const Icon = cmd.icon;
                        const on = idx === active;
                        return (
                          <li key={cmd.label.en}>
                            {/* aria-selected は listbox の option 用で button には
                                付けられない。ここは「今どれを指しているか」を
                                示せれば十分なので aria-current を使う。 */}
                            <button
                              type="button"
                              onMouseEnter={() => setActive(idx)}
                              aria-current={on ? "true" : undefined}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                                on
                                  ? "bg-accent text-accent-foreground"
                                  : "text-foreground"
                              )}
                            >
                              <Icon className="size-4 shrink-0 text-muted-foreground" />
                              <span className="flex-1 truncate">
                                {en ? cmd.label.en : cmd.label.ja}
                              </span>
                              {cmd.hint && (
                                <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                  {cmd.hint}
                                </kbd>
                              )}
                              {on && (
                                <ArrowRight className="size-4 text-muted-foreground" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CornerDownLeft className="size-3" />
              {en ? "Select" : "選択"}
            </span>
            <span>
              {en
                ? `${results.length} results`
                : `${results.length} 件の結果`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
