/**
 * ステップ4: 書き出し・共有。
 * 主役は「HTMLをダウンロード」。共有URL・HTMLコピー・プロジェクト保存は副次に置き、
 * 最後に「公開するには？」の手順を畳んで置く。
 *
 * props は状態（ExportStatus）・保存パネル（ProjectPanel）・操作（ExportActions）の
 * 3つにまとめる（個別に20個以上渡すと呼び出し側の見通しが悪くなるため）。
 */
import { useRef } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  FolderOpen,
  Info,
  Loader2,
  Save,
  Share2,
  Sparkles,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LpPlanId } from "../lpPlan";
import { LP_PLANS, getStripeLink } from "../lpPlan";
import type { SavedProject } from "../share";
import type { IndustryTemplate, LpAnswers } from "../types";

/** 書き出しまわりの状態 */
export interface ExportStatus {
  plan: LpPlanId;
  /** 買い切り版（フル）を持っているか。バッジ非表示・OGP出力の可否になる */
  paid: boolean;
  downloading: boolean;
  copyingHtml: boolean;
  copiedShare: boolean;
  /** 完了のお知らせ（aria-live で読み上げる。数秒で消える） */
  notice: string | null;
  error: string | null;
}

/** プロジェクト保存パネルの状態 */
export interface ProjectPanel {
  projects: SavedProject[];
  projectName: string;
  saveError: string | null;
}

/** 書き出しステップから呼び出せる操作 */
export interface ExportActions {
  onProjectNameChange: (v: string) => void;
  onDownload: () => void;
  onCopyHtml: () => void;
  onCopyShareUrl: () => void;
  onSaveProject: () => void;
  onLoadProject: (p: SavedProject) => void;
  onDeleteProject: (id: string) => void;
  onSetPlan: (p: LpPlanId) => void;
  onBack: () => void;
}

export default function ExportStep({
  template,
  answers,
  status,
  projectPanel,
  actions,
}: {
  template: IndustryTemplate;
  answers: LpAnswers;
  status: ExportStatus;
  projectPanel: ProjectPanel;
  actions: ExportActions;
}) {
  const { paid, downloading, copyingHtml, copiedShare } = status;
  const pricingHeadingRef = useRef<HTMLHeadingElement>(null);

  /*
   * 「バッジなしで書き出したい」人の導線。別サービス（Component Studio）の料金ページへ
   * 飛ばすと、ビルダーの作業から離脱するうえ、そこで買ってもプラン状態は別キー
   * （cs:plan / lp:plan）のためバッジは消えない。同じ画面の下にある
   * 料金プランへスクロールし、ビルダーから離脱させない。
   * 先にフォーカスを移してから（preventScroll でジャンプを抑えて）滑らかに送る。
   */
  const goToPricing = () => {
    pricingHeadingRef.current?.focus({ preventScroll: true });
    pricingHeadingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 tabIndex={-1} className="text-2xl font-bold tracking-tight">
          書き出し・共有
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          完成したLPをHTMLとして持ち帰るか、共有URLで誰にでも見せられます。
        </p>
      </div>

      <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
        書き出し対象:{" "}
        <span className="font-medium text-foreground">{template.name}</span> ／{" "}
        {answers.shopName}
      </div>

      {status.error && (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
        >
          {status.error}
        </p>
      )}
      <p
        aria-live="polite"
        className="min-h-5 text-sm font-medium text-emerald-700 dark:text-emerald-400"
      >
        {status.notice ?? ""}
      </p>

      {/* 主役: HTMLダウンロード */}
      <Card className="border-primary/40">
        <CardHeader>
          <CardTitle className="text-lg">HTMLをダウンロード</CardTitle>
          <CardDescription>
            画像もCSSも埋め込んだ1枚のHTMLファイルです。サーバーに置くだけで公開できます。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!paid && (
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/30 p-2.5 text-xs text-muted-foreground">
              <Info className="size-3.5 shrink-0" aria-hidden />
              <span>
                無料版：書き出しは何回でもできます。フッターに「Made with
                ミセテLP」バッジが入ります。
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto h-7 gap-1"
                onClick={goToPricing}
              >
                <Sparkles className="size-3.5" aria-hidden />{" "}
                バッジなしで書き出す（フル版 ¥9,800 買い切り）
              </Button>
            </div>
          )}

          <Button
            size="lg"
            className="h-12 w-full text-base sm:w-auto sm:min-w-72"
            onClick={actions.onDownload}
            disabled={downloading}
          >
            {downloading ? (
              <Loader2 className="mr-2 size-5 animate-spin" aria-hidden />
            ) : (
              <Download className="mr-2 size-5" aria-hidden />
            )}
            HTMLをダウンロード
          </Button>

          <ul className="grid gap-2 text-xs sm:grid-cols-2">
            <li className="flex items-start gap-1.5 rounded-md border bg-muted/20 p-2.5">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
              <span className="text-muted-foreground">
                <b className="text-foreground">無料</b>
                ：書き出し無制限／フッターに「Made with ミセテLP」バッジ
              </span>
            </li>
            <li className="flex items-start gap-1.5 rounded-md border bg-muted/20 p-2.5">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
              <span className="text-muted-foreground">
                <b className="text-foreground">フル（¥9,800 買い切り）</b>
                ：バッジなし／OGP（SNSでの見え方）設定つき
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 副次: 共有URL・HTMLコピー・保存 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">共有・コピー・保存</CardTitle>
          <CardDescription>
            共有URLは無料・無制限です。HTMLのコピーはダウンロードと同じ成果物（無料版はフッターのバッジ入り）を渡します。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={actions.onCopyShareUrl}
            >
              {copiedShare ? (
                <Check
                  className="mr-1.5 size-4 text-emerald-700 dark:text-emerald-400"
                  aria-hidden
                />
              ) : (
                <Share2 className="mr-1.5 size-4" aria-hidden />
              )}
              {copiedShare ? "コピーしました" : "共有URLをコピー"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={actions.onCopyHtml}
              disabled={copyingHtml}
            >
              {copyingHtml ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" aria-hidden />
              ) : (
                <Copy className="mr-1.5 size-4" aria-hidden />
              )}
              HTMLをコピー
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            共有URLに写真は含まれません（URLが長くなりすぎるため）。写真ごと渡すときはHTMLをダウンロードしてください。
          </p>

          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-medium">プロジェクト保存</p>
            {projectPanel.saveError && (
              <p
                role="alert"
                className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
              >
                {projectPanel.saveError}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <label htmlFor="lp-project-name" className="sr-only">
                プロジェクト名
              </label>
              <Input
                id="lp-project-name"
                value={projectPanel.projectName}
                onChange={(e) => actions.onProjectNameChange(e.target.value)}
                placeholder="プロジェクト名"
                className="max-w-xs"
              />
              <Button variant="outline" onClick={actions.onSaveProject}>
                <Save className="mr-1.5 size-4" aria-hidden /> 保存
              </Button>
            </div>
            {projectPanel.projects.length > 0 && (
              <ul className="divide-y rounded-md border">
                {projectPanel.projects.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
                  >
                    <span className="truncate">{p.name}</span>
                    <span className="flex shrink-0 gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => actions.onLoadProject(p)}
                      >
                        <FolderOpen className="mr-1 size-3.5" aria-hidden /> 読込
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        aria-label={`${p.name}を削除`}
                        onClick={() => actions.onDeleteProject(p.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      <PublishGuide />

      {/* 「バッジなしで書き出す」の着地点（goToPricing） */}
      <section className="space-y-3">
        <h2
          ref={pricingHeadingRef}
          tabIndex={-1}
          className="text-base font-semibold"
        >
          料金プラン
        </h2>
        <p className="text-xs text-muted-foreground">
          ※ 決済は未接続です。下のボタンでの切り替えは、機能の違いを試すためのデモです。
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {LP_PLANS.map((tier) => {
            const isCurrent = status.plan === tier.id;
            const link = tier.id === "free" ? null : getStripeLink();
            return (
              <Card
                key={tier.id}
                className={cn(
                  "flex flex-col",
                  tier.highlight && !isCurrent && "border-primary/40",
                  isCurrent && "border-primary ring-1 ring-primary"
                )}
              >
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <p className="text-2xl font-bold text-foreground">
                    {tier.priceLabel}
                  </p>
                  {tier.priceNote && (
                    <p className="text-xs text-muted-foreground">
                      {tier.priceNote}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-1.5 text-sm">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-1.5 text-muted-foreground"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-primary"
                          aria-hidden
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-1.5">
                  {isCurrent ? (
                    <Button disabled variant="secondary" className="w-full">
                      現在のプラン
                    </Button>
                  ) : link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({}), "w-full")}
                    >
                      <ExternalLink className="mr-1.5 size-4" aria-hidden />{" "}
                      フル版を購入
                    </a>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => actions.onSetPlan(tier.id)}
                      >
                        デモモードで{tier.name}版を試す
                      </Button>
                      <p className="text-center text-[11px] text-muted-foreground">
                        ※ 現在は決済未接続のデモです。
                      </p>
                    </>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="flex justify-start">
        <Button variant="outline" onClick={actions.onBack}>
          <ArrowLeft className="mr-1.5 size-4" aria-hidden /> プレビューに戻る
        </Button>
      </div>
    </section>
  );
}

/** 公開手段の案内（無料で置ける方法を手順つきで3つ） */
function PublishGuide() {
  return (
    <details className="group rounded-lg border bg-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg p-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        作ったLPを公開するには？
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="space-y-5 border-t p-4 text-sm">
        <p className="text-muted-foreground">
          ダウンロードしたHTMLファイル1つを置くだけで公開できます。無料でできる方法を3つ紹介します。
        </p>

        <div className="space-y-2">
          <h3 className="font-semibold">① Netlify Drop（いちばん手軽・無料）</h3>
          <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>
              <a
                href="https://app.netlify.com/drop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                app.netlify.com/drop
                <ExternalLink className="ml-1 inline size-3" aria-hidden />
              </a>
              を開きます。
            </li>
            <li>
              書き出したHTMLファイルを、ページの枠の中へドラッグ&amp;ドロップします。
            </li>
            <li>
              数秒で公開URLが発行されます（例:
              https://xxxx.netlify.app）。そのURLを名刺やSNSに載せられます。
            </li>
          </ol>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">② Cloudflare Pages（無料・直接アップロード）</h3>
          <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>
              <a
                href="https://pages.cloudflare.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cloudflare Pages
                <ExternalLink className="ml-1 inline size-3" aria-hidden />
              </a>
              に無料登録してログインします。
            </li>
            <li>
              「プロジェクトを作成」→「直接アップロード」を選びます（Gitの知識は不要です）。
            </li>
            <li>
              HTMLファイルを
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">
                index.html
              </code>
              という名前にしてアップロードすると公開されます。
            </li>
          </ol>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">③ 契約中のレンタルサーバーにFTPで置く</h3>
          <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>
              すでにホームページ用のサーバー（さくら・ロリポップ・エックスサーバーなど）を契約している場合はこちら。
            </li>
            <li>
              FTPソフト（FileZilla
              など）や管理画面のファイルマネージャーでサーバーに接続します。
            </li>
            <li>
              公開フォルダ（
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">
                public_html
              </code>
              や
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">
                www
              </code>
              など）に
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">
                index.html
              </code>
              としてアップロードします。
            </li>
          </ol>
        </div>

        <p className="text-xs text-muted-foreground">
          いずれの方法でも、あとから独自ドメイン（例:
          your-shop.com）を設定できます。設定方法は各サービスの「カスタムドメイン」の項目をご覧ください。
        </p>
      </div>
    </details>
  );
}
