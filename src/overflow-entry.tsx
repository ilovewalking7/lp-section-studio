import { createRoot, type Root } from "react-dom/client";
import { StrictMode } from "react";
import { registry } from "@/registry";
import "./index.css";

/**
 * 横スクロール検査のハーネス。scripts/check-overflow.mjs が Playwright から
 * `window.__mount(id)` を呼び、1つずつコンポーネントを描画させる。
 *
 * ページ遷移を挟まず同じタブで差し替えるので、880 個でも数分で終わる。
 * 本番ビルドの入口は index.html のみなので、このファイルは配信物に入らない。
 */
declare global {
  interface Window {
    __ids: string[];
    __mount: (id: string) => Promise<void>;
    __unmount: () => void;
  }
}

const el = document.getElementById("root")!;
let root: Root | null = null;

window.__ids = registry.map((e) => e.id);

window.__mount = async (id: string) => {
  const entry = registry.find((e) => e.id === id);
  if (!entry) throw new Error(`不明な id: ${id}`);
  const Comp = await entry.load();
  root?.unmount();
  root = createRoot(el);
  root.render(
    <StrictMode>
      <Comp />
    </StrictMode>
  );
  // 描画とレイアウト確定を待つ。
  // requestAnimationFrame は headless の構成によっては発火しないことがあり、
  // それだけに頼ると永久に待ち続ける（実際 CI で1時間ハングした）。
  // タイマーと競争させて、どちらか早い方で先に進める。
  await Promise.race([
    new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r(null)))
    ),
    new Promise((r) => setTimeout(r, 150)),
  ]);
  // レイアウトを確実に確定させる
  void document.documentElement.scrollWidth;
};

window.__unmount = () => {
  root?.unmount();
  root = null;
};
