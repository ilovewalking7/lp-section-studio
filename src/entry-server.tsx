import { renderToString } from "react-dom/server";
import Landing from "@/pages/Landing";
import Pricing from "@/pages/Pricing";
import { getStats } from "@/lib/stats";

/**
 * 静的プリレンダ用エントリ。
 *
 * マーケ面（ホーム / 料金）だけを `react-dom/server` で静的 HTML 化する。
 * スタジオ（重いレジストリ）は SEO 対象外なので含めない＝ SSR バンドルが
 * 880 個のデモを巻き込まずに軽量・確実に動く。クライアントは `createRoot`
 * で改めて描画するため、ハイドレーション不整合の心配もない（クローラ・
 * JS無効環境向けの静的 HTML としてのみ機能する）。
 */

export type PrerenderRoute = "home" | "pricing";

const noop = () => {};

export function render(route: PrerenderRoute): string {
  if (route === "pricing") {
    return renderToString(
      <Pricing
        currentPlan="free"
        lang="ja"
        onChoosePlan={noop}
        onOpenStudio={noop}
      />
    );
  }
  return renderToString(
    <Landing
      stats={getStats()}
      lang="ja"
      onOpenStudio={noop}
      onOpenPricing={noop}
    />
  );
}
