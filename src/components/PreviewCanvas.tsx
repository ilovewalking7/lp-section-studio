import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  Code2,
  Eye,
  FileCode2,
  Lightbulb,
  Loader2,
  Lock,
  Monitor,
  Smartphone,
  Sparkles,
  Tablet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";
import {
  generateVanillaHtml,
  generateDynamicVanillaHtml,
} from "@/lib/vanilla";
import {
  FREE_DAILY_COPY_LIMIT,
  getTodayCopies,
  incTodayCopies,
  isPro,
  type PlanId,
} from "@/lib/plan";
import type { Lang } from "@/lib/i18n";
import { tDesc, tName } from "@/registry/i18n";
import type { RegistryEntry } from "@/registry";

type Tab = "preview" | "code" | "vanilla";
type Viewport = "mobile" | "tablet" | "desktop";

const PREVIEW_COPY = {
  ja: {
    preview: "プレビュー",
    code: "コード",
    vanilla: "バニラ",
    advanced: "上級",
    vanillaProTitle: "バニラHTMLエクスポートは Pro 機能です",
    vanillaProBody: "React 不要の素のHTMLを書き出して、どこにでも貼れます。",
    upgrade: "Pro にアップグレード",
    limitReached: `本日のコピー上限（${FREE_DAILY_COPY_LIMIT}回）に達しました。`,
    makeUnlimited: "無制限にする",
    principle: "なぜ効く？ — 設計意図",
    vStatic: "静的",
    vDynamic: "動的",
  },
  en: {
    preview: "Preview",
    code: "Code",
    vanilla: "Vanilla",
    advanced: "Advanced",
    vanillaProTitle: "Vanilla HTML export is a Pro feature",
    vanillaProBody: "Export plain HTML (no React) and paste it anywhere.",
    upgrade: "Upgrade to Pro",
    limitReached: `Daily copy limit (${FREE_DAILY_COPY_LIMIT}) reached.`,
    makeUnlimited: "Go unlimited",
    principle: "Why it works — design intent",
    vStatic: "Static",
    vDynamic: "Dynamic",
  },
} as const;

const VIEWPORTS: Record<Viewport, { width: string; icon: typeof Monitor }> = {
  mobile: { width: "375px", icon: Smartphone },
  tablet: { width: "768px", icon: Tablet },
  desktop: { width: "100%", icon: Monitor },
};

function Spinner() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center text-muted-foreground">
      <Loader2 className="size-5 animate-spin" />
    </div>
  );
}

/** Pro 限定機能（バニラHTMLエクスポート）のロック表示 */
function ProLock({ lang, onUpgrade }: { lang: Lang; onUpgrade: () => void }) {
  const c = PREVIEW_COPY[lang];
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/30 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
        <Lock className="size-5" />
      </div>
      <div>
        <p className="font-medium">{c.vanillaProTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{c.vanillaProBody}</p>
      </div>
      <Button onClick={onUpgrade} className="gap-1.5">
        <Sparkles className="size-4" /> {c.upgrade}
      </Button>
    </div>
  );
}

/** Free のコピー上限の案内（残数 / 上限到達） */
function CopyLimitNote({
  lang,
  blocked,
  onUpgrade,
}: {
  lang: Lang;
  blocked: boolean;
  onUpgrade: () => void;
}) {
  const c = PREVIEW_COPY[lang];
  const remaining = Math.max(0, FREE_DAILY_COPY_LIMIT - getTodayCopies());
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md border p-2.5 text-xs",
        blocked
          ? "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400"
          : "border-border bg-muted/30 text-muted-foreground"
      )}
    >
      <Lock className="size-3.5 shrink-0" />
      {blocked ? (
        <span>{c.limitReached}</span>
      ) : lang === "ja" ? (
        <span>
          Free プラン：本日のコピーは残り <b>{remaining}</b> /{" "}
          {FREE_DAILY_COPY_LIMIT} 回
        </span>
      ) : (
        <span>
          Free: <b>{remaining}</b> / {FREE_DAILY_COPY_LIMIT} copies left today
        </span>
      )}
      <Button
        size="sm"
        variant="ghost"
        className="ml-auto h-7 gap-1 text-amber-600 hover:text-amber-700 dark:text-amber-400"
        onClick={onUpgrade}
      >
        <Sparkles className="size-3.5" /> {c.makeUnlimited}
      </Button>
    </div>
  );
}

export function PreviewCanvas({
  entry,
  plan,
  lang,
  onUpgrade,
}: {
  entry: RegistryEntry;
  plan: PlanId;
  lang: Lang;
  onUpgrade: () => void;
}) {
  const c = PREVIEW_COPY[lang];
  const [tab, setTab] = useState<Tab>("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [source, setSource] = useState<string | null>(null);
  const [vanilla, setVanilla] = useState<string | null>(null);
  const [vanillaMode, setVanillaMode] = useState<"static" | "dynamic">(
    "static"
  );
  const [copyBlocked, setCopyBlocked] = useState(false);

  const pro = isPro(plan);

  // Free のコピー上限ゲート（Pro/Studio は無制限）
  const onBeforeCopy = () => {
    if (pro) return true;
    if (getTodayCopies() >= FREE_DAILY_COPY_LIMIT) {
      setCopyBlocked(true);
      return false;
    }
    incTodayCopies();
    return true;
  };

  // コンポーネント本体を遅延ロード（選択時に初めて該当チャンクを取得）
  const Demo = useMemo(
    () => lazy(() => entry.load().then((c) => ({ default: c }))),
    [entry.id]
  );

  // 切り替えのたびにソース/バニラはリセット
  useEffect(() => {
    setSource(null);
    setVanilla(null);
  }, [entry.id]);

  // コードタブを開いた時だけソース取得
  useEffect(() => {
    if (tab !== "code" || source !== null) return;
    let alive = true;
    entry.loadSource().then((s) => {
      if (alive) setSource(s);
    });
    return () => {
      alive = false;
    };
  }, [tab, source, entry]);

  // モード切替（静的⇄動的）で再生成させる
  useEffect(() => {
    setVanilla(null);
  }, [vanillaMode]);

  // バニラタブを開いた時だけHTMLを生成（Pro 限定機能）
  useEffect(() => {
    if (tab !== "vanilla" || vanilla !== null || !pro) return;
    let alive = true;
    const build =
      vanillaMode === "dynamic"
        ? entry.loadSource().then((src) => generateDynamicVanillaHtml(src))
        : entry.load().then((Comp) => generateVanillaHtml(Comp));
    build
      .then((html) => {
        if (alive) setVanilla(html);
      })
      .catch((e: unknown) => {
        if (alive) setVanilla(`<!-- 生成エラー: ${(e as Error).message} -->`);
      });
    return () => {
      alive = false;
    };
  }, [tab, vanilla, vanillaMode, entry]);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              {tName(lang, entry.id, entry.name)}
            </h2>
            {entry.level === "advanced" && (
              <Badge className="bg-violet-500/15 text-violet-500 hover:bg-violet-500/15">
                {c.advanced}
              </Badge>
            )}
            {entry.isNew && (
              <Badge className="bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/15">
                NEW
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {tDesc(lang, entry.id, entry.description)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {tab === "preview" && (
            <div className="flex rounded-md border p-0.5">
              {(Object.keys(VIEWPORTS) as Viewport[]).map((v) => {
                const Icon = VIEWPORTS[v].icon;
                return (
                  <Button
                    key={v}
                    size="icon"
                    variant={viewport === v ? "secondary" : "ghost"}
                    className="size-8"
                    aria-label={v}
                    onClick={() => setViewport(v)}
                  >
                    <Icon />
                  </Button>
                );
              })}
            </div>
          )}
          <div className="flex rounded-md border p-0.5">
            <Button
              size="sm"
              variant={tab === "preview" ? "secondary" : "ghost"}
              onClick={() => setTab("preview")}
            >
              <Eye /> {c.preview}
            </Button>
            <Button
              size="sm"
              variant={tab === "code" ? "secondary" : "ghost"}
              onClick={() => setTab("code")}
            >
              <Code2 /> {c.code}
            </Button>
            <Button
              size="sm"
              variant={tab === "vanilla" ? "secondary" : "ghost"}
              onClick={() => setTab("vanilla")}
            >
              {pro ? <FileCode2 /> : <Lock className="text-amber-500" />}{" "}
              {c.vanilla}
            </Button>
          </div>
        </div>
      </div>

      {tab === "preview" ? (
        <div className="flex justify-center rounded-lg border bg-background">
          <div
            className="w-full transition-[max-width] duration-300"
            style={{ maxWidth: VIEWPORTS[viewport].width }}
          >
            <div
              className={cn(
                "flex min-h-[280px] p-8",
                entry.align === "full" && "p-0",
                entry.align === "start"
                  ? "items-start justify-start"
                  : "items-center justify-center"
              )}
            >
              {/* center/start も w-full の枠を与える。これが無いと shrink-to-fit
                  になり、w-full のコンポーネントが最小幅（日本語は1文字幅）へ
                  潰れて縦に崩れる。 */}
              <div
                className={cn(
                  entry.align === "full"
                    ? "w-full"
                    : cn(
                        "flex w-full min-w-0",
                        entry.align === "start"
                          ? "justify-start"
                          : "justify-center"
                      )
                )}
              >
                <Suspense fallback={<Spinner />}>
                  <Demo />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      ) : tab === "code" ? (
        source === null ? (
          <Spinner />
        ) : (
          <div className="space-y-2">
            {!pro && (
              <CopyLimitNote
                lang={lang}
                blocked={copyBlocked}
                onUpgrade={onUpgrade}
              />
            )}
            <CodeBlock code={source} onBeforeCopy={onBeforeCopy} />
          </div>
        )
      ) : !pro ? (
        <ProLock lang={lang} onUpgrade={onUpgrade} />
      ) : (
        <div className="space-y-2">
          <div className="flex w-fit rounded-md border p-0.5">
            <Button
              size="sm"
              variant={vanillaMode === "static" ? "secondary" : "ghost"}
              onClick={() => setVanillaMode("static")}
            >
              {c.vStatic}
            </Button>
            <Button
              size="sm"
              variant={vanillaMode === "dynamic" ? "secondary" : "ghost"}
              onClick={() => setVanillaMode("dynamic")}
            >
              {c.vDynamic}
            </Button>
          </div>
          <div className="flex gap-2 rounded-md border border-sky-500/30 bg-sky-500/5 p-3 text-xs text-muted-foreground">
            <FileCode2 className="mt-0.5 size-3.5 shrink-0 text-sky-500" />
            {vanillaMode === "dynamic" ? (
              lang === "ja" ? (
                <span>
                  <b className="text-foreground">動く</b>1枚HTML。React/Tailwind/Babel
                  を CDN（import map）で読み込み、<b className="text-foreground">
                    state・アニメもそのまま動作
                  </b>
                  します。依存UIと cn は同梱。開く時にCDNへの通信が必要です。
                </span>
              ) : (
                <span>
                  A <b className="text-foreground">live</b>, single-file HTML.
                  Loads React/Tailwind/Babel from a CDN (import map), so{" "}
                  <b className="text-foreground">state and animations actually run</b>
                  . UI deps and cn are bundled. Needs network access when opened.
                </span>
              )
            ) : lang === "ja" ? (
              <span>
                React 不要の<b className="text-foreground">素のHTML</b>（Tailwind
                CDN込み）。保存してそのまま開けます。lucide
                はインラインSVG化済み。
                <b className="text-foreground">初期状態のスナップショット</b>
                なので、カウントダウン等の動きは含まれません（必要なら動的版へ）。
              </span>
            ) : (
              <span>
                Plain <b className="text-foreground">HTML</b> with no React
                (Tailwind CDN included) — save and open it directly. lucide icons
                are inlined as SVG. This is a{" "}
                <b className="text-foreground">snapshot of the initial state</b>,
                so animations aren't included (use Dynamic for those).
              </span>
            )}
          </div>
          {vanilla === null ? (
            <Spinner />
          ) : (
            <CodeBlock code={vanilla} onBeforeCopy={onBeforeCopy} />
          )}
        </div>
      )}

      {entry.principle && (
        <div className="flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <div>
            <div className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {c.principle}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{entry.principle}</p>
          </div>
        </div>
      )}

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
