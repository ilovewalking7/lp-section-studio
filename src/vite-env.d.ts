/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Microsoft Clarity プロジェクトID（未設定なら分析は無効）。 */
  readonly VITE_CLARITY_ID?: string;
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
