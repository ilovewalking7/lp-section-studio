import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { ArrowRight, Loader2, Plus, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { readLang, type Lang } from "@/lib/i18n";
import { tName } from "@/registry/i18n";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタン一覧",
  category: "基本",
  description:
    "全ボタンの総覧。基本バリアントに加え、グラデ・グラス・アウトライン・アイコン・ファン・アニメーション演出の全種を自動集約（新しいボタンを追加すると自動で並びます）。",
  align: "full",
  tags: ["button", "showcase", "index"],
};

type Mod = { default: ComponentType; meta?: { name?: string } };

// 各ボタンフォルダを丸ごと取り込み（eager）。新規追加も自動で反映される。
const gradientMods = import.meta.glob("./btn-gradient/*.tsx", {
  eager: true,
}) as Record<string, Mod>;
const glassMods = import.meta.glob("./btn-glass/*.tsx", {
  eager: true,
}) as Record<string, Mod>;
const outlineMods = import.meta.glob("./btn-outline/*.tsx", {
  eager: true,
}) as Record<string, Mod>;
const iconMods = import.meta.glob("./btn-icon/*.tsx", {
  eager: true,
}) as Record<string, Mod>;
const funMods = import.meta.glob("./btn-fun/*.tsx", {
  eager: true,
}) as Record<string, Mod>;
const animMods = import.meta.glob("./button-anim/*.tsx", {
  eager: true,
}) as Record<string, Mod>;

const GROUPS: { label: { ja: string; en: string }; mods: Record<string, Mod> }[] =
  [
    { label: { ja: "グラデーション", en: "Gradient" }, mods: gradientMods },
    { label: { ja: "グラス", en: "Glass" }, mods: glassMods },
    { label: { ja: "アウトライン", en: "Outline" }, mods: outlineMods },
    { label: { ja: "アイコン", en: "Icon" }, mods: iconMods },
    { label: { ja: "ファン・特殊", en: "Fun & Special" }, mods: funMods },
    { label: { ja: "アニメーション演出", en: "Animated" }, mods: animMods },
  ];

const totalCount =
  GROUPS.reduce((n, g) => n + Object.keys(g.mods).length, 0) + 8; // +基本バリアント

const COPY = {
  ja: {
    title: "ボタン総覧",
    total: (n: number) => `全 ${n} 種`,
    basic: "基本バリアント",
    iconLabel: "アイコン付き",
    loadingLabel: "ローディング",
    del: "削除",
    next: "次へ",
    loading: "読み込み中",
    hintPre: "新しいボタンを",
    hintPost: "に追加すると、ここに自動で並びます。",
  },
  en: {
    title: "All buttons",
    total: (n: number) => `${n} total`,
    basic: "Basics",
    iconLabel: "With icon",
    loadingLabel: "Loading",
    del: "Delete",
    next: "Next",
    loading: "Loading…",
    hintPre: "Drop a new button into",
    hintPost: "and it shows up here automatically.",
  },
} as const;

/** glob のキー（./btn-xxx/Name.tsx）を manifest と同じ id 形式に変換 */
function idFromGlobKey(key: string): string {
  return key
    .replace(/^\.\//, "")
    .replace(/\.tsx$/, "")
    .replace(/[/_]/g, "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function entriesOf(mods: Record<string, Mod>) {
  return Object.entries(mods).sort(([a], [b]) => a.localeCompare(b));
}

function nameOf(lang: Lang, path: string, mod: Mod) {
  const ja =
    mod.meta?.name ?? path.split("/").pop()?.replace(/\.tsx$/, "") ?? path;
  return tName(lang, idFromGlobKey(path), ja);
}

/** 中身が枠より広いときだけ縮小して必ず枠内に収める（はみ出し防止） */
function FitBox({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const ow = o.clientWidth;
      const iw = i.scrollWidth;
      setScale(iw > ow && iw > 0 ? Math.max(0.45, ow / iw) : 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={outer}
      className="flex w-full items-center justify-center overflow-hidden"
    >
      <div
        ref={inner}
        className="shrink-0"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        {children}
      </div>
    </div>
  );
}

function Cell({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[112px] flex-col items-center justify-between gap-3 overflow-hidden rounded-xl border bg-card p-4">
      <div className="flex w-full flex-1 items-center justify-center">
        <FitBox>{children}</FitBox>
      </div>
      <span className="w-full truncate text-center text-[11px] text-muted-foreground">
        {name}
      </span>
    </div>
  );
}

function GroupGrid({
  lang,
  label,
  mods,
}: {
  lang: Lang;
  label: string;
  mods: Record<string, Mod>;
}) {
  const entries = entriesOf(mods);
  if (entries.length === 0) return null;
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] tabular-nums">
          {entries.length}
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {entries.map(([path, mod]) => {
          const C = mod.default;
          return (
            <Cell key={path} name={nameOf(lang, path, mod)}>
              <C />
            </Cell>
          );
        })}
      </div>
    </section>
  );
}

export default function ButtonShowcase() {
  const lang = readLang();
  const t = COPY[lang];
  return (
    <div className="w-full space-y-10 p-1">
      <div className="flex items-baseline gap-3">
        <h2 className="text-lg font-bold tracking-tight">{t.title}</h2>
        <span className="text-sm text-muted-foreground">
          {t.total(totalCount)}
        </span>
      </div>

      {/* 基本バリアント（shadcn） */}
      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t.basic}
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] tabular-nums">
            8
          </span>
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <Cell name="Primary">
            <Button>Primary</Button>
          </Cell>
          <Cell name="Secondary">
            <Button variant="secondary">Secondary</Button>
          </Cell>
          <Cell name="Outline">
            <Button variant="outline">Outline</Button>
          </Cell>
          <Cell name="Ghost">
            <Button variant="ghost">Ghost</Button>
          </Cell>
          <Cell name="Link">
            <Button variant="link">Link</Button>
          </Cell>
          <Cell name="Destructive">
            <Button variant="destructive">
              <Trash2 /> {t.del}
            </Button>
          </Cell>
          <Cell name={t.iconLabel}>
            <Button>
              {t.next} <ArrowRight />
            </Button>
          </Cell>
          <Cell name={t.loadingLabel}>
            <Button disabled>
              <Loader2 className="animate-spin" /> {t.loading}
            </Button>
          </Cell>
        </div>
      </section>

      {/* 各スタイルフォルダを自動集約 */}
      {GROUPS.map((g) => (
        <GroupGrid
          key={g.label.en}
          lang={lang}
          label={g.label[lang]}
          mods={g.mods}
        />
      ))}

      <p className="flex items-center gap-1.5 border-t pt-4 text-xs text-muted-foreground">
        <Star className="size-3.5 text-amber-400" />
        <Plus className="size-3.5" />
        {t.hintPre}{" "}
        <code className="rounded bg-muted px-1">src/registry/demos/btn-*</code>{" "}
        {t.hintPost}
      </p>
    </div>
  );
}
