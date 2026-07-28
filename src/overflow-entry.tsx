import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import { StrictMode } from "react";
import { registry } from "@/registry";
import { generateVanillaHtml } from "@/lib/vanilla";
import "./index.css";

/**
 * ブラウザ側のハーネス。Playwright から呼び出して使う。
 *
 * - `window.__mount(id)` … 1つずつ描画させる（scripts/check-overflow.mjs が
 *   横スクロール検査に使う）
 * - `window.__staticHtml(id)` … React 抜きの静的 HTML を作る
 *   （scripts/build-static-html.mjs が使う）
 *
 * どちらもページ遷移を挟まず同じタブで差し替えるので、880 個でも数分で終わる。
 * 本番ビルドの入口は index.html のみなので、このファイルは配信物に入らない。
 */
declare global {
  interface Window {
    __ids: string[];
    __mount: (id: string) => Promise<void>;
    __unmount: () => void;
    __staticHtml: (id: string) => Promise<string>;
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

  // React 18 の createRoot は既定で非同期に確定するので、flushSync で
  // その場で確定させる。こうすると描画待ちが要らなくなる。
  //
  // 以前は requestAnimationFrame を待っていたが、headless の構成によっては
  // rAF が発火せず、CI で1時間ハングした。タイマーと競争させる形に直したが、
  // 今度は rAF が来ない環境で毎回タイマー分だけ待つことになり、
  // 880 件で 2 分以上を無駄に積んでいた。待ち自体を無くすのが正しい。
  flushSync(() => {
    root!.render(
      <StrictMode>
        <Comp />
      </StrictMode>
    );
  });

  // 確定後に effect が走って寸法を変える部品があるので、マイクロタスクを
  // 1周ぶん空けてから測る。scrollWidth の読み取り自体がレイアウトを
  // 強制するため、これ以上の待ちは要らない。
  await new Promise((r) => setTimeout(r, 0));
};

window.__unmount = () => {
  root?.unmount();
  root = null;
};

window.__staticHtml = async (id: string) => {
  const entry = registry.find((e) => e.id === id);
  if (!entry) throw new Error(`不明な id: ${id}`);
  const Comp = await entry.load();
  return generateVanillaHtml(Comp);
};
