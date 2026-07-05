/**
 * ミセテLP プレビュー。
 * テンプレの各セクション（SectionSlot）を実コンポーネントとして lazy(entry.load) +
 * Suspense + SwapBoundary で縦に連結表示し、入力内容（answers）へその場で置換する。
 *
 * answers が変わるたびに key を変えて再マウントする（swap.ts 参照）。SwapBoundary は
 * 一度置換した後のテキストノードは元の from と一致しなくなるため、answers を差し替えた
 * だけでは正しく再置換できない。セクションごと丸ごと作り直すことで、デモの素文言から
 * 毎回スワップをやり直す。
 */
import { lazy, Suspense, useMemo, type ComponentType } from "react";
import { Loader2 } from "lucide-react";
import { registry } from "@/registry";
import { SwapBoundary } from "./swap";
import type { IndustryTemplate, LpAnswers, SectionSlot } from "./types";

function SectionFallback() {
  return (
    <div className="flex min-h-[160px] items-center justify-center text-muted-foreground">
      <Loader2 className="size-5 animate-spin" />
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
      sections.map((section) => ({
        section,
        Comp: lazy(async (): Promise<{ default: ComponentType }> => {
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
      })),
    [sections]
  );
}

export default function LpPreview({
  template,
  answers,
}: {
  template: IndustryTemplate;
  answers: LpAnswers;
}) {
  const items = useSectionComponents(template.sections);
  // answers が変わるたびにキーを変えて再マウントする（仕様§4）
  const remountKey = JSON.stringify(answers);

  return (
    <div className="flex flex-col">
      {items.map(({ section, Comp }) => (
        <Suspense
          key={`${section.demoId}-${remountKey}`}
          fallback={<SectionFallback />}
        >
          <SwapBoundary swaps={section.swaps} answers={answers}>
            <Comp />
          </SwapBoundary>
        </Suspense>
      ))}
    </div>
  );
}
