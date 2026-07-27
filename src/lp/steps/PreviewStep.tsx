/**
 * ステップ3: プレビュー。
 * ビューポート切替と前後の導線をスティッキーなツールバーにまとめ、
 * 長いLPをスクロール中でも「編集に戻る」「書き出しへ」を常に押せるようにする。
 */
import { Component, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Info, Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import LpPreview from "../LpPreview";
import type { IndustryTemplate, LpAnswers } from "../types";

export type Viewport = "mobile" | "tablet" | "desktop";

export const VIEWPORTS: Record<
  Viewport,
  { label: string; width: string; icon: typeof Monitor }
> = {
  mobile: { label: "モバイル", width: "375px", icon: Smartphone },
  tablet: { label: "タブレット", width: "768px", icon: Tablet },
  desktop: { label: "PC", width: "100%", icon: Monitor },
};

interface PreviewErrorBoundaryProps {
  onReset: () => void;
  children: ReactNode;
}
interface PreviewErrorBoundaryState {
  hasError: boolean;
}

/**
 * プレビュー描画（LpPreview）専用の保険。共有URL・保存済みプロジェクトはいずれも
 * localStorage/URLという「アプリの外」から来るデータのため、decodeShare の深い形状
 * 検証をすり抜けたり保存後にスキーマが変わったりした場合、プレビュー配下が予期せぬ
 * 例外を投げる可能性がある。componentDidCatch で捕まえてアプリ全体を巻き込まず、
 * 「入力に戻る」導線だけを提示するフォールバックに留める。
 */
export class PreviewErrorBoundary extends Component<
  PreviewErrorBoundaryProps,
  PreviewErrorBoundaryState
> {
  state: PreviewErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): PreviewErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.error("プレビューの描画に失敗しました:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="space-y-4 rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">
            プレビューの表示に失敗しました。入力に戻ってやり直してください。
          </p>
          <Button variant="outline" onClick={this.props.onReset}>
            入力に戻る
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function PreviewStep({
  template,
  answers,
  viewport,
  onViewport,
  onBack,
  onNext,
}: {
  template: IndustryTemplate;
  answers: LpAnswers;
  viewport: Viewport;
  onViewport: (v: Viewport) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">プレビュー</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {template.name}
          テンプレートで、入力内容を反映した見た目を確認できます。
        </p>
      </div>

      {/* スクロールしても操作できるツールバー */}
      <div className="sticky top-16 z-30 -mx-1 flex flex-wrap items-center gap-2 rounded-lg border bg-background/95 px-3 py-2 shadow-sm backdrop-blur">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-1.5 size-4" aria-hidden /> 編集に戻る
        </Button>
        <div
          className="flex rounded-md border p-0.5"
          role="group"
          aria-label="表示幅を切り替え"
        >
          {(Object.keys(VIEWPORTS) as Viewport[]).map((v) => {
            const Icon = VIEWPORTS[v].icon;
            const active = viewport === v;
            return (
              <Button
                key={v}
                size="icon"
                variant={active ? "secondary" : "ghost"}
                className="size-8"
                aria-label={VIEWPORTS[v].label}
                aria-pressed={active}
                onClick={() => onViewport(v)}
              >
                <Icon />
              </Button>
            );
          })}
        </div>
        <Button size="sm" className="ml-auto" onClick={onNext}>
          書き出しへ <ArrowRight className="ml-1.5 size-4" aria-hidden />
        </Button>
      </div>

      <p className="flex items-start gap-2 rounded-md border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        縦書きの屋号など一部の意匠はプレビューでは元のまま表示され、書き出したHTMLでは店名に置き換わります。
      </p>

      <div className="flex justify-center overflow-x-auto rounded-lg border bg-muted/30 p-4">
        <div
          className="w-full transition-[max-width] duration-300"
          style={{ maxWidth: VIEWPORTS[viewport].width }}
        >
          <div className="overflow-hidden rounded-md border bg-background shadow-sm">
            <PreviewErrorBoundary onReset={onBack}>
              <LpPreview template={template} answers={answers} />
            </PreviewErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
}
