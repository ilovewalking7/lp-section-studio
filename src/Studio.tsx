import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Aperture,
  Award,
  Bell,
  Blocks,
  Box,
  Boxes,
  Cherry,
  ChevronLeft,
  Circle,
  CreditCard,
  Crown,
  Droplets,
  GalleryHorizontalEnd,
  Gamepad2,
  Gem,
  Github,
  Home,
  Move,
  LayoutDashboard,
  LayoutGrid,
  Layers,
  Leaf,
  LineChart,
  ListChecks,
  Loader,
  MessageSquare,
  MousePointerClick,
  MoveVertical,
  Navigation,
  Orbit,
  PanelsTopLeft,
  PartyPopper,
  RectangleHorizontal,
  Repeat,
  Search,
  Settings,
  Shapes,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Square,
  Star,
  Tag,
  Target,
  Terminal,
  Type,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { GalleryView } from "@/components/GalleryView";
import { registry, categories } from "@/registry";
import { tCategory, tName } from "@/registry/i18n";
import { THEME_CATEGORIES } from "@/lib/stats";
import { type PlanId } from "@/lib/plan";
import { type Lang } from "@/lib/i18n";

const CATEGORY_ICONS: Record<string, typeof Boxes> = {
  基本: Blocks,
  "ヒーロー・LP": Sparkles,
  マーケティング: Tag,
  コンバージョン: Target,
  "価格・オファー": ShoppingBag,
  オンボーディング: ListChecks,
  ダッシュボード: LayoutDashboard,
  "AI / チャット": MessageSquare,
  アプリUI: Layers,
  ナビゲーション: Navigation,
  インタラクション: MousePointerClick,
  ボタン: RectangleHorizontal,
  背景アニメ: Aperture,
  テキストアニメ: Type,
  カード演出: CreditCard,
  ボタン演出: Zap,
  スクロール演出: MoveVertical,
  マーキー: Repeat,
  "ローダー・マイクロ": Loader,
  Awwwards: Award,
  "3Dカルーセル": GalleryHorizontalEnd,
  "3Dアニメ": Orbit,
  ドラッグ操作: Move,
  フォーム: LineChart,
  コマース: ShoppingBag,
  設定: Settings,
  和風: Cherry,
  洋風: Crown,
  ミニマル: Square,
  ブルータリスト: Box,
  グラスモーフィズム: Droplets,
  "レトロ・Y2K": Gamepad2,
  ラグジュアリー: Gem,
  プレイフル: PartyPopper,
  ニューモーフィズム: Circle,
  メンフィス: Shapes,
  ダークテック: Terminal,
  北欧: Snowflake,
  ボタニカル: Leaf,
};

const STYLE_COUNT = categories.filter((c) => THEME_CATEGORIES.has(c)).length;

const FAV_KEY = "cs:favorites";

function useFavorites() {
  const [favs, setFavs] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  }, [favs]);
  const toggle = (id: string) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  return { favs, toggle };
}

// スタジオのUI文言（ナビ・ラベル）の二言語辞書
const STUDIO_COPY = {
  ja: {
    subtitle: "ランディングページが完成する部品ライブラリ",
    viewPlan: "プランを見る",
    detail: "詳細",
    gallery: "ギャラリー",
    home: "ホーム",
    pricing: "料金",
    repo: "リポジトリ",
    searchPlaceholder: "検索（名前・タグ）...",
    favorites: "お気に入り",
    items: "件",
    noResults: "該当なし",
    all: "すべて",
    back: "一覧に戻る",
    statSections: "LPセクション",
    statStyles: "デザインスタイル",
    statCategories: "カテゴリ",
    statPrice: "あなたの月額",
    distribute: "コピペ・shadcn add・バニラHTML、3経路で配布",
    advancedTitle: (n: number) => `${n} 個の上級コンポーネント`,
    advancedBody:
      "心理学・マーケティング・Webデザインの観点で最適化。各コンポーネントの「なぜ効く？」に設計意図を記載しています。",
    addTitle: "追加はファイルを置くだけ",
    empty: "コンポーネントがありません",
  },
  en: {
    subtitle: "The section library that finishes your landing page",
    viewPlan: "View plans",
    detail: "Detail",
    gallery: "Gallery",
    home: "Home",
    pricing: "Pricing",
    repo: "Repo",
    searchPlaceholder: "Search (name, tag)…",
    favorites: "Favorites",
    items: "items",
    noResults: "No results",
    all: "All",
    back: "Back to list",
    statSections: "LP sections",
    statStyles: "Design styles",
    statCategories: "Categories",
    statPrice: "Your price / mo",
    distribute: "Copy-paste · shadcn add · vanilla HTML — 3 ways to ship",
    advancedTitle: (n: number) => `${n} advanced components`,
    advancedBody:
      "Tuned with psychology, marketing and web-design in mind. Each one documents why it works.",
    addTitle: "Adding is just dropping a file",
    empty: "No components",
  },
} as const;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xl font-bold tracking-tight">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export default function Studio({
  plan,
  lang,
  setLang,
  onHome,
  onPricing,
}: {
  plan: PlanId;
  lang: Lang;
  setLang: (l: Lang) => void;
  onHome: () => void;
  onPricing: () => void;
}) {
  const s = STUDIO_COPY[lang];
  const [query, setQuery] = useState("");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(registry[0]?.id);
  const [view, setView] = useState<"detail" | "gallery">("gallery");
  const [cameFromGallery, setCameFromGallery] = useState(false);
  const { favs, toggle } = useFavorites();
  const mainRef = useRef<HTMLElement>(null);
  const galleryScrollRef = useRef(0);

  const advancedCount = registry.filter((e) => e.level === "advanced").length;
  const styleCount = STYLE_COUNT;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return registry.filter((e) => {
      if (onlyFavs && !favs.includes(e.id)) return false;
      if (catFilter && e.category !== catFilter) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        (e.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, onlyFavs, catFilter, favs]);

  const active =
    registry.find((e) => e.id === activeId) ?? filtered[0] ?? registry[0];

  // 詳細を選んだら、そのプレビューを画面内に出す（上までスクロールしなくて済む）
  useEffect(() => {
    if (view === "detail") {
      mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeId, view]);

  // ブラウザの「戻る」ボタン / 画面内「一覧に戻る」でギャラリーに戻る
  useEffect(() => {
    const onPop = () => {
      setView((v) => (v === "detail" && cameFromGallery ? "gallery" : v));
      if (cameFromGallery) {
        setCameFromGallery(false);
        requestAnimationFrame(() =>
          window.scrollTo({ top: galleryScrollRef.current })
        );
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [cameFromGallery]);

  const select = (id: string) => {
    // ギャラリーから開くときは、戻れるよう履歴とスクロール位置を記録
    if (view === "gallery") {
      galleryScrollRef.current = window.scrollY;
      setCameFromGallery(true);
      window.history.pushState({ cs: "detail" }, "");
    }
    setActiveId(id);
    setView("detail");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Boxes className="size-4" />
            </div>
            <div className="leading-tight">
              <div>LP Section Studio</div>
              <div className="hidden text-[10px] font-normal text-muted-foreground sm:block">
                {s.subtitle}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {registry.length} sections
          </Badge>
          <button
            onClick={onPricing}
            className={cn(
              "hidden rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide sm:inline-flex",
              plan === "free"
                ? "bg-muted text-muted-foreground"
                : "bg-violet-500/15 text-violet-500"
            )}
            title={s.viewPlan}
          >
            {plan}
          </button>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex rounded-md border p-0.5">
              <Button
                size="sm"
                variant={view === "gallery" ? "secondary" : "ghost"}
                onClick={() => setView("gallery")}
              >
                <LayoutGrid /> {s.gallery}
              </Button>
              <Button
                size="sm"
                variant={view === "detail" ? "secondary" : "ghost"}
                onClick={() => setView("detail")}
              >
                <PanelsTopLeft /> {s.detail}
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={onHome}
              className="hidden sm:flex"
            >
              <Home /> {s.home}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onPricing}
              className="hidden sm:flex"
            >
              <Tag /> {s.pricing}
            </Button>
            <a
              href="https://github.com/ilovewalking7/app-035"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground lg:flex"
            >
              <Github className="size-4" /> {s.repo}
            </a>
            <LangToggle lang={lang} setLang={setLang} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-16 max-h-[calc(100vh-5rem)] space-y-3 overflow-y-auto pr-1">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={s.searchPlaceholder}
                className="pl-8"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                size="sm"
                variant={onlyFavs ? "secondary" : "ghost"}
                onClick={() => setOnlyFavs((v) => !v)}
                className="gap-1.5"
              >
                <Star
                  className={cn(
                    "size-3.5",
                    onlyFavs && "fill-amber-400 text-amber-400"
                  )}
                />
                {s.favorites}
                {favs.length > 0 && ` (${favs.length})`}
              </Button>
              <span className="text-xs text-muted-foreground">
                {filtered.length} {s.items}
              </span>
            </div>

            <nav className="space-y-5 pb-6">
              {categories.map((cat) => {
                const items = filtered.filter((e) => e.category === cat);
                if (items.length === 0) return null;
                const Icon = CATEGORY_ICONS[cat] ?? Boxes;
                return (
                  <div key={cat}>
                    <div className="mb-1.5 flex items-center gap-1.5 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Icon className="size-3.5" />
                      {tCategory(lang, cat)}
                    </div>
                    <ul className="space-y-0.5">
                      {items.map((e) => (
                        <li key={e.id}>
                          <div
                            className={cn(
                              "group flex items-center rounded-md transition-colors",
                              view === "detail" && active?.id === e.id
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-accent/50"
                            )}
                          >
                            <button
                              onClick={() => select(e.id)}
                              className={cn(
                                "flex-1 truncate px-2 py-1.5 text-left text-sm",
                                view === "detail" && active?.id === e.id
                                  ? "font-medium"
                                  : "text-muted-foreground group-hover:text-foreground"
                              )}
                            >
                              {tName(lang, e.id, e.name)}
                              {e.level === "advanced" && (
                                <span className="ml-1.5 text-[10px] text-violet-500">
                                  ★
                                </span>
                              )}
                            </button>
                            <button
                              aria-label="お気に入り"
                              onClick={() => toggle(e.id)}
                              className="px-2 opacity-0 transition-opacity group-hover:opacity-100 aria-pressed:opacity-100"
                              aria-pressed={favs.includes(e.id)}
                            >
                              <Star
                                className={cn(
                                  "size-3.5",
                                  favs.includes(e.id)
                                    ? "fill-amber-400 text-amber-400 opacity-100"
                                    : "text-muted-foreground"
                                )}
                              />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-2 text-sm text-muted-foreground">
                  {s.noResults}
                </p>
              )}
            </nav>
          </div>
        </aside>

        <main ref={mainRef} className="min-w-0 flex-1 scroll-mt-20">
          {/* 数字で訴求するバンド（LP部品ライブラリの規模感） */}
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border bg-gradient-to-r from-violet-500/5 via-transparent to-transparent p-4">
            <Stat value={`${registry.length}+`} label={s.statSections} />
            <Stat value={`${styleCount}`} label={s.statStyles} />
            <Stat value={`${categories.length}`} label={s.statCategories} />
            <Stat value="¥0" label={s.statPrice} />
            <span className="ml-auto hidden text-xs text-muted-foreground lg:block">
              {s.distribute}
            </span>
          </div>

          {/* スタイル/カテゴリのフィルタチップ（探しやすさ） */}
          <div className="mb-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
            <FilterChip
              active={catFilter === null}
              onClick={() => setCatFilter(null)}
            >
              {s.all}
            </FilterChip>
            {categories.map((cat) => {
              const count = registry.filter((e) => e.category === cat).length;
              const Icon = CATEGORY_ICONS[cat] ?? Boxes;
              return (
                <FilterChip
                  key={cat}
                  active={catFilter === cat}
                  onClick={() => setCatFilter((c) => (c === cat ? null : cat))}
                >
                  <Icon className="size-3.5" />
                  {tCategory(lang, cat)}
                  <span className="text-[10px] opacity-60">{count}</span>
                </FilterChip>
              );
            })}
          </div>

          {view === "gallery" ? (
            <GalleryView
              items={filtered}
              favs={favs}
              lang={lang}
              onSelect={select}
              onToggleFav={toggle}
            />
          ) : active ? (
            <>
              {cameFromGallery && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="mb-3 gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="size-4" /> {s.back}
                </Button>
              )}
              <PreviewCanvas
                entry={active}
                plan={plan}
                lang={lang}
                onUpgrade={onPricing}
              />
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
                  <p className="flex items-center gap-1.5 font-medium text-foreground">
                    <Sparkles className="size-4 text-violet-500" />
                    {s.advancedTitle(advancedCount)}
                  </p>
                  <p className="mt-1">{s.advancedBody}</p>
                </div>
                <div className="rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
                  <p className="flex items-center gap-1.5 font-medium text-foreground">
                    <Bell className="size-4 text-primary" />
                    {s.addTitle}
                  </p>
                  <p className="mt-1">
                    {lang === "ja" ? "ファイル " : "Drop a "}
                    <code className="rounded bg-muted px-1.5 py-0.5">
                      .tsx
                    </code>{" "}
                    {lang === "ja" ? "を " : "into "}
                    <code className="rounded bg-muted px-1.5 py-0.5">
                      src/registry/demos/
                    </code>{" "}
                    {lang === "ja"
                      ? "に置くだけで一覧に自動追加されます。"
                      : "and it appears in the list automatically."}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">{s.empty}</p>
          )}
        </main>
      </div>
    </div>
  );
}
