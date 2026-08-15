import { renderToString } from "react-dom/server";
import Landing from "@/pages/Landing";
import { getStats } from "@/lib/stats";

/**
 * 静的プリレンダ用エントリ。
 *
 * マーケ面（ホーム）だけを `react-dom/server` で静的 HTML 化する。
 * スタジオ（重いレジストリ）は SEO 対象外なので含めない＝ SSR バンドルが
 * 880 個のデモを巻き込まずに軽量・確実に動く。クライアントは `createRoot`
 * で改めて描画するため、ハイドレーション不整合の心配もない（クローラ・
 * JS無効環境向けの静的 HTML としてのみ機能する）。
 */

export type PrerenderRoute = "home";

const noop = () => {};

export function render(_route: PrerenderRoute = "home"): string {
  return renderToString(
    <Landing
      stats={getStats()}
      lang="ja"
      onOpenStudio={noop}
    />
  );
}
