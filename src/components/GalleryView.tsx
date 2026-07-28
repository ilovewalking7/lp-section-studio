import {
  Component,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { isFreeComponent } from "@/lib/free";
import { variantLabel } from "@/lib/variant";
import type { RegistryEntry } from "@/registry";
import { tCategory, tName } from "@/registry/i18n";
import type { Lang } from "@/lib/i18n";

/** プレビューの縮小率（カード幅の 1/scale の広さでコンポーネントを描く） */
const PREVIEW_SCALE = 0.5;

const COLLECTION_LABEL: Record<Lang, string> = {
  ja: "コレクション",
  en: "Collection",
};

/** ギャラリー内の1枚が落ちても全体を壊さないための境界 */
class CardBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
          プレビュー不可
        </div>
      );
    }
    return this.props.children;
  }
}

function GalleryCard({
  entry,
  isFav,
  lang,
  onSelect,
  onToggleFav,
}: {
  entry: RegistryEntry;
  isFav: boolean;
  lang: Lang;
  onSelect: (id: string) => void;
  onToggleFav: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [Comp, setComp] = useState<ComponentType | null>(null);
  const [offsetY, setOffsetY] = useState(0);
  const variant = variantLabel(entry);

  // 画面に入ったら初めてマウント（460個を一度に読み込まない）
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || Comp) return;
    let alive = true;
    entry.load().then((c) => {
      if (alive) setComp(() => c);
    });
    return () => {
      alive = false;
    };
  }, [visible, Comp, entry]);

  // 枠より低いコンポーネント（告知バー等）は上端に張り付き、カードが空に見える。
  // その場合だけ縦中央に置いて、一覧を眺めたときに中身が伝わるようにする。
  useEffect(() => {
    if (!Comp || typeof requestAnimationFrame === "undefined") return;
    const measure = () => {
      const frame = frameRef.current;
      const content = contentRef.current;
      if (!frame || !content) return;
      const frameHeight = frame.clientHeight;
      const contentHeight = content.getBoundingClientRect().height;
      if (!frameHeight || !contentHeight) return;
      setOffsetY(
        contentHeight < frameHeight
          ? Math.round((frameHeight - contentHeight) / 2)
          : 0
      );
    };
    const raf = requestAnimationFrame(measure);
    // 遅れて高さが決まるもの（アニメ・遅延表示）のためにもう一度測る
    const timer = setTimeout(measure, 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [Comp]);

  return (
    <div ref={ref} className="group">
      <button
        onClick={() => onSelect(entry.id)}
        className="block w-full text-left"
        aria-label={entry.name}
      >
        {/* 狭い画面ほど枠を低くして、一覧をひと目で走査できるようにする */}
        <div
          ref={frameRef}
          className="relative h-44 overflow-hidden rounded-xl border bg-background transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/10 sm:h-52 lg:h-56"
        >
          {Comp ? (
            <div
              ref={contentRef}
              className="pointer-events-none absolute left-0 top-0 origin-top-left transition-transform duration-300"
              style={{
                transform: `translateY(${offsetY}px) scale(${PREVIEW_SCALE})`,
                width: `${100 / PREVIEW_SCALE}%`,
              }}
            >
              <CardBoundary>
                <Comp />
              </CardBoundary>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          )}
          {entry.level === "advanced" && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-violet-500/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur">
              おすすめ
            </span>
          )}
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent transition group-hover:ring-2 group-hover:ring-primary/50" />
        </div>
      </button>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-medium">
              {tName(lang, entry.id, entry.name)}
            </span>
            {entry.isNew && (
              <span className="rounded bg-emerald-500/15 px-1 text-[10px] font-medium text-emerald-500">
                NEW
              </span>
            )}
            {/* 無料版（MCP の100個）に入っている印。NEW と並んでも読めるよう色だけ変える */}
            {isFreeComponent(entry.id) && (
              <span className="shrink-0 rounded bg-sky-500/15 px-1 text-[10px] font-medium text-sky-500">
                {lang === "ja" ? "無料" : "Free"}
                {/* 「無料版に含まれます」/「Free edition」と読み上げさせる */}
                <span className="sr-only">
                  {lang === "ja" ? "版に含まれます" : " edition"}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="truncate">{tCategory(lang, entry.category)}</span>
            {/* 同名が他にもある時だけ、どちらのものか分かるようコレクション名を出す */}
            {variant && (
              <>
                <span className="opacity-40">·</span>
                <span
                  className="shrink-0 rounded bg-muted px-1 font-mono text-[10px] text-foreground/70"
                  title={`${COLLECTION_LABEL[lang]}: ${variant} · ${entry.id}`}
                >
                  <span className="sr-only">{COLLECTION_LABEL[lang]} </span>
                  {variant}
                </span>
              </>
            )}
            <span className="opacity-40">·</span>
            <span className="shrink-0 opacity-70">React / HTML</span>
          </div>
        </div>
        <button
          aria-label="お気に入り"
          aria-pressed={isFav}
          onClick={() => onToggleFav(entry.id)}
          className="shrink-0 p-1"
        >
          <Star
            className={cn(
              "size-4",
              isFav
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground hover:text-foreground"
            )}
          />
        </button>
      </div>
    </div>
  );
}

export function GalleryView({
  items,
  favs,
  lang,
  onSelect,
  onToggleFav,
}: {
  items: RegistryEntry[];
  favs: string[];
  lang: Lang;
  onSelect: (id: string) => void;
  onToggleFav: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">該当なし</p>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((entry) => (
        <GalleryCard
          key={entry.id}
          entry={entry}
          isFav={favs.includes(entry.id)}
          lang={lang}
          onSelect={onSelect}
          onToggleFav={onToggleFav}
        />
      ))}
    </div>
  );
}
