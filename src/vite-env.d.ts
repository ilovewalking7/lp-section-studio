/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Microsoft Clarity プロジェクトID（未設定なら分析は無効）。 */
  readonly VITE_CLARITY_ID?: string;
  /** ミセテLP フル版（¥9,800 買い切り）の Stripe 決済リンク（未設定ならデモモード）。 */
  readonly VITE_STRIPE_LINK_LP?: string;
  /** 公開サイトのベースURL（共有URL・OGP生成に使用）。 */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*?raw" {
  const content: string;
  export default content;
}

declare module "react-dom/server.browser" {
  export function renderToStaticMarkup(element: unknown): string;
}
