import { createElement, useEffect, useRef, type ReactNode } from "react";
import type { LpAnswers, Swap } from "./types";

/**
 * HTML特殊文字をエスケープする（& < > " ' の5種）。
 * renderToStaticMarkup の出力と同じルールで、from の照合・to の挿入の両方に使う。
 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * レンダ済み静的HTML文字列に対し、各 swap の from を置換する。
 * - from は「HTMLエスケープした形」と「生の形」の両方で探して置換（renderToStaticMarkup の
 *   出力はエスケープ済みだが、日本語文言の多くはエスケープしても変化しないため両対応にしておく）
 * - to 側の値は必ず escapeHtml() を通してから挿入する（ユーザー入力を書き出しHTMLへ差し込むため、
 *   XSS防止として必須）
 */
export function swapHtml(html: string, swaps: Swap[], a: LpAnswers): string {
  let out = html;
  for (const swap of swaps) {
    const to = escapeHtml(swap.to(a));
    const escapedFrom = escapeHtml(swap.from);
    // lib が ES2020 のため String#replaceAll は使えない。split/join で全出現を置換する。
    out = out.split(escapedFrom).join(to);
    // エスケープしても文字列が変わらない場合（多くの日本語文言）は二重置換になるため、
    // 変化がある場合のみ生の形でも追加置換する。
    if (escapedFrom !== swap.from) {
      out = out.split(swap.from).join(to);
    }
  }
  return out;
}

interface SwapBoundaryProps {
  swaps: Swap[];
  answers: LpAnswers;
  children: ReactNode;
}

/**
 * プレビュー用: children 配下のテキストノードを走査し、from に完全一致するものを to に置換する。
 * - Suspense で遅延マウントされるノードにも追随できるよう MutationObserver を併用する
 * - 置換後のテキストは from と一致しなくなるため、再度 apply() が走っても再置換されず無限ループしない
 * - answers/swaps の変更に追随させたい呼び出し側は key={JSON.stringify(answers)} 等で再マウントすること
 * - プレビューの一瞬の素文言表示は許容（書き出しは文字列置換のため影響なし）
 * - このファイルは .ts のため（仕様§2 の命名通り）JSX ではなく createElement で組み立てる
 */
export function SwapBoundary({ swaps, answers, children }: SwapBoundaryProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const apply = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        nodes.push(node as Text);
      }
      for (const textNode of nodes) {
        const text = textNode.textContent;
        if (text === null) continue;
        const hit = swaps.find((swap) => swap.from === text);
        if (hit) textNode.textContent = hit.to(answers);
      }
    };

    apply();

    const observer = new MutationObserver(apply);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [swaps, answers]);

  return createElement("div", { ref }, children);
}
