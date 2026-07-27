/**
 * ミセテLP プレビュー。
 * テンプレの各セクション（SectionSlot）を実コンポーネントとして lazy(entry.load) +
 * Suspense + SwapBoundary で縦に連結表示し、入力内容（answers）へその場で置換する。
 * 並び（非表示セクションの除外・写真セクションの差し込み位置）は書き出しと同じ
 * buildRenderPlan（export.ts）に従う。写真セクションはミセテLP独自の実体
 * （PhotoShowcase）なので lazy にせず直接描画する。
 *
 * answers が変わるたびに key を変えて再マウントする（swap.ts 参照）。SwapBoundary は
 * 一度置換した後のテキストノードは元の from と一致しなくなるため、answers を差し替えた
 * だけでは正しく再置換できない。セクションごと丸ごと作り直すことで、デモの素文言から
 * 毎回スワップをやり直す。
 */
import { lazy, Suspense, useMemo, type ComponentType } from "react";
import { registry } from "@/registry";
import { SwapBoundary } from "./swap";
import { buildRenderPlan } from "./export";
import PhotoShowcase from "./sections/PhotoShowcase";
import type { IndustryTemplate, LpAnswers, SectionSlot } from "./types";

/**
 * セクション読み込み中のスケルトン。スピナーだと読み込み中の高さが実際のセクションと
 * 大きく違い、連結表示が飛び跳ねて見えるため、薄いプレースホルダのブロックで
 * おおよその体裁を保つ。
 */
function SectionFallback() {
  return (
    <div className="w-full animate-pulse px-6 py-16" aria-hidden="true">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="h-8 w-2/3 rounded bg-muted" />
        <div className="h-40 w-full rounded bg-muted" />
      </div>
    </div>
  );
}

/**
 * セクションごとの遅延コンポーネントをテンプレ単位でメモ化する。
 * （answers の変更では作り直さない。再マウントは呼び出し側の key で行う）
 */
function useSectionComponents(sections: SectionSlot[]) {
  return useMemo(
    () =>
      new Map(
        sections.map((section) => [
          section.id,
          lazy(async (): Promise<{ default: ComponentType }> => {
            const entry = registry.find((e) => e.id === section.demoId);
            if (!entry) {
              // registry から外れた場合でもアプリ全体を落とさず、その場に理由を表示する。
              return {
                default: () => (
                  <div className="p-6 text-sm text-destructive">
                    セクション「{section.demoId}」が見つかりません（npm run manifest
                    を確認してください）
                  </div>
                ),
              };
            }
            const Comp = await entry.load();
            return { default: Comp };
          }),
        ])
      ),
    [sections]
  );
}

/**
 * 再マウント用のキー。写真は data URI で1枚あたり数百KBあるため、answers 全体を
 * JSON.stringify すると毎レンダで巨大文字列を作ってしまう。写真は「枚数・alt・
 * dataUrl の長さ」だけを見る（写真を差し替えれば長さかaltがほぼ必ず変わる。仮に
 * 一致しても PhotoShowcase は props から描画するため表示は追従する）。
 */
function remountKeyOf(a: LpAnswers): string {
  const { photos, ...rest } = a;
  const photoKey = photos.map((p) => `${p.alt}:${p.dataUrl.length}`).join("|");
  return `${JSON.stringify(rest)}#${photos.length}#${photoKey}`;
}

export default function LpPreview({
  template,
  answers,
}: {
  template: IndustryTemplate;
  answers: LpAnswers;
}) {
  const comps = useSectionComponents(template.sections);
  const plan = buildRenderPlan(template, answers);
  // answers が変わるたびにキーを変えて再マウントする（仕様§4）
  const remountKey = remountKeyOf(answers);

  return (
    <div className="flex flex-col">
      {plan.map((item, i) => {
        if (item.kind === "photos") {
          return (
            <PhotoShowcase
              key={`photos-${i}`}
              photos={answers.photos}
              theme={template.photoSection.theme}
              eyebrow={template.photoSection.eyebrow}
              heading={template.photoSection.heading}
            />
          );
        }
        const section = item.slot;
        const Comp = comps.get(section.id);
        if (!Comp) return null;
        return (
          <Suspense
            key={`${section.id}-${remountKey}`}
            fallback={<SectionFallback />}
          >
            <SwapBoundary swaps={section.swaps} answers={answers}>
              <Comp />
            </SwapBoundary>
          </Suspense>
        );
      })}
    </div>
  );
}
