/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Microsoft Clarity プロジェクトID（未設定なら分析は無効）。 */
  readonly VITE_CLARITY_ID?: string;
  /** 公開サイトのベースURL（プリレンダのcanonical/OGPに使用）。 */
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
