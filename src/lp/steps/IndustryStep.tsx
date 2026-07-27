/**
 * ステップ1: 業種選択。
 *
 * ここは初回訪問者が最初に見る画面のため、テンプレ選択だけでなく
 * 価値訴求（何ができて・何が手に入るか）と、再訪者が続きから開ける導線を置く。
 * 業種カードは実 <button>（div+role="button" は使わない）。カード内のモックアップは
 * 画像を使わず、テンプレの実配色（accentHex / photoSection.theme）だけで組み立てる。
 */
import {
  ArrowRight,
  Clock,
  FileCode2,
  FolderOpen,
  Leaf,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LP_TEMPLATES } from "../templates";
import type { SavedProject, ShareState } from "../share";
import type { IndustryTemplate } from "../types";

/** 業種テンプレの雰囲気を伝えるアイコン */
const TEMPLATE_ICON: Record<string, typeof Waves> = {
  ryokan: Waves,
  salon: Leaf,
  clinic: Stethoscope,
  restaurant: UtensilsCrossed,
};

const TRUST_CHIPS: { icon: typeof Clock; label: string }[] = [
  { icon: Clock, label: "所要3分" },
  { icon: ShieldCheck, label: "登録不要" },
  { icon: FileCode2, label: "HTMLはあなたのもの" },
];

const HOW_IT_WORKS: { step: string; title: string; body: string }[] = [
  {
    step: "①",
    title: "業種を選ぶ",
    body: "お店に近いテンプレートを選びます。業種ごとに配色・書体・構成を組んであるので、デザインはそのまま使えます。",
  },
  {
    step: "②",
    title: "質問に答える",
    body: "店名・キャッチコピー・料金・写真などを入力します。サンプル文が入っているので、書き換えるだけで完成します。",
  },
  {
    step: "③",
    title: "HTMLを書き出す",
    body: "1枚のHTMLファイルとしてダウンロード。無料のホスティングやお使いのサーバーに置けば、その日から公開できます。",
  },
];

export default function IndustryStep({
  draft,
  onResumeDraft,
  onDiscardDraft,
  projects,
  onLoadProject,
  onSelect,
  pendingTemplate,
  onConfirmTemplate,
  onCancelTemplate,
}: {
  /** 自動保存されたドラフト（あれば再開を提示する。勝手には復元しない） */
  draft: ShareState | null;
  onResumeDraft: () => void;
  onDiscardDraft: () => void;
  projects: SavedProject[];
  onLoadProject: (p: SavedProject) => void;
  onSelect: (t: IndustryTemplate) => void;
  /** 入力済みの状態で別の業種が選ばれたときの切り替え先（確認待ち。無ければ null） */
  pendingTemplate: IndustryTemplate | null;
  onConfirmTemplate: () => void;
  onCancelTemplate: () => void;
}) {
  return (
    <section className="space-y-12">
      {draft && (
        <ResumeDraftBanner
          draft={draft}
          onResume={onResumeDraft}
          onDiscard={onDiscardDraft}
        />
      )}

      {/* ヒーロー */}
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="gap-1.5">
          <Sparkles className="size-3.5" aria-hidden />
          無料ではじめられます
        </Badge>
        {/*
          日本語は単語の途中でも改行されるため、そのままだと「プロ品質のLPが完/成。」の
          ように意味の切れ目でない位置で折り返る。文節ごとに inline-block で包み、
          折り返しを文節の境界だけに制限する（日本語見出しの定石）。
        */}
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="inline-block">質問に答えるだけで、</span>
          <span className="inline-block">プロ品質のLPが完成。</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          業種別のテンプレートに沿って入力するだけ。できあがったLPは
          <strong className="font-semibold text-foreground">1枚のHTML</strong>
          として持ち帰れます。サーバー契約もアカウント登録も不要です。
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {TRUST_CHIPS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <Icon className="size-3.5 text-primary" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* 業種カード */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            業種を選んでください
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            業種に合わせたデザインテンプレートで、質の高いLPをすぐに作成できます。
          </p>
        </div>
        {pendingTemplate && (
          <SwitchTemplateBanner
            template={pendingTemplate}
            onConfirm={onConfirmTemplate}
            onCancel={onCancelTemplate}
          />
        )}
        {/* テンプレが増減しても崩れないよう、カード幅で折り返す（auto-fit） */}
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {LP_TEMPLATES.map((t) => {
            const Icon = TEMPLATE_ICON[t.id] ?? Sparkles;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelect(t)}
                className="group flex flex-col gap-3 rounded-lg border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/50 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <TemplateMockup template={t} />
                <span className="flex items-center gap-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-base font-semibold text-card-foreground">
                    {t.name}
                  </span>
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {t.description}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary">
                  このテンプレートで作る
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 保存済みプロジェクトからの再開導線 */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            保存したLPから続ける
          </h2>
          <ul className="divide-y rounded-lg border bg-card">
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {p.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {new Date(p.updatedAt).toLocaleDateString("ja-JP")} 更新
                  </span>
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0"
                  onClick={() => onLoadProject(p)}
                >
                  <FolderOpen className="mr-1.5 size-3.5" aria-hidden />
                  開く
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3ステップの説明 */}
      <div className="space-y-4">
        <h2 className="text-center text-xl font-semibold tracking-tight">
          ① 業種を選ぶ → ② 質問に答える → ③ HTMLを書き出す
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {HOW_IT_WORKS.map((s) => (
            <li key={s.step} className="rounded-lg border bg-card p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span
                  className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary"
                  aria-hidden
                >
                  {s.step}
                </span>
                {s.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 自動保存されたドラフトからの再開（再開 / 新規で始める の2択のみ） */
function ResumeDraftBanner({
  draft,
  onResume,
  onDiscard,
}: {
  draft: ShareState;
  onResume: () => void;
  onDiscard: () => void;
}) {
  const templateName =
    LP_TEMPLATES.find((t) => t.id === draft.t)?.name ?? "テンプレート";
  const shopName = draft.a.shopName.trim() || "無題のLP";
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-primary/40 bg-primary/5 p-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold">前回の続きから再開しますか？</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          自動保存された内容：{shopName}（{templateName}）
        </p>
      </div>
      <div className="ml-auto flex flex-wrap gap-2">
        <Button size="sm" onClick={onResume}>
          続きから再開する
        </Button>
        <Button size="sm" variant="ghost" onClick={onDiscard}>
          新規で始める
        </Button>
      </div>
    </div>
  );
}

/**
 * 別の業種テンプレへ切り替える前の確認。
 * 入力済みの内容は切り替え先のサンプル文言に置き換わるため、押し間違いで消さないよう
 * ここで一度受け止める（ネイティブの confirm は使わず、意匠を ResumeDraftBanner に揃える）。
 */
function SwitchTemplateBanner({
  template,
  onConfirm,
  onCancel,
}: {
  template: IndustryTemplate;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold">
          「{template.name}」に切り替えますか？
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          入力済みの内容は「{template.name}
          」のサンプル文言に置き換わります（写真はそのまま引き継ぎます）。
        </p>
      </div>
      <div className="ml-auto flex flex-wrap gap-2">
        <Button size="sm" onClick={onConfirm}>
          切り替える
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          やめる
        </Button>
      </div>
    </div>
  );
}

/**
 * 業種カードに載せるLPの縮小モックアップ。
 * 画像は一切使わず、テンプレの実配色（photoSection.theme の背景・文字色、accentHex）で
 * ナビ帯・見出し・本文・3カラム・フッター帯を積む。文字色は currentColor 経由で
 * bg-current + opacity に流すため、テンプレを増やしても指定は1か所で済む。
 */
function TemplateMockup({ template }: { template: IndustryTemplate }) {
  const accent = template.accentHex;
  const { bg, text } = template.photoSection.theme;
  return (
    <span
      aria-hidden
      className={cn(
        "block overflow-hidden rounded-md border border-black/10 shadow-sm",
        bg,
        text
      )}
    >
      {/* ナビ帯 */}
      <span className="flex items-center gap-1.5 border-b border-black/10 px-2.5 py-2">
        <span className="block h-1.5 w-8 rounded-full bg-current opacity-70" />
        <span className="ml-auto block h-1 w-4 rounded-full bg-current opacity-30" />
        <span className="block h-1 w-4 rounded-full bg-current opacity-30" />
        <span className="block h-1 w-4 rounded-full bg-current opacity-30" />
      </span>
      {/* ヒーロー */}
      <span className="block space-y-1.5 px-2.5 py-3">
        <span
          className="block h-1 w-6 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="block h-2.5 w-11/12 rounded-sm bg-current opacity-80" />
        <span className="block h-2.5 w-2/3 rounded-sm bg-current opacity-80" />
        <span className="block h-1 w-full rounded-full bg-current opacity-25" />
        <span className="block h-1 w-4/5 rounded-full bg-current opacity-25" />
        <span
          className="mt-1 block h-3.5 w-16 rounded-sm"
          style={{ backgroundColor: accent }}
        />
      </span>
      {/* 3カラムの小ブロック */}
      <span className="grid grid-cols-3 gap-1.5 px-2.5 pb-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block space-y-1 rounded-sm border border-black/10 p-1.5"
          >
            <span className="block h-1 w-3/4 rounded-full bg-current opacity-60" />
            <span className="block h-1 w-full rounded-full bg-current opacity-20" />
            <span className="block h-1 w-2/3 rounded-full bg-current opacity-20" />
          </span>
        ))}
      </span>
      {/* フッター帯 */}
      <span
        className="flex items-center gap-1 px-2.5 py-2"
        style={{ backgroundColor: accent }}
      >
        <span className="block h-1 w-10 rounded-full bg-white/70" />
        <span className="ml-auto block h-1 w-5 rounded-full bg-white/40" />
      </span>
    </span>
  );
}
