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

/** 1パス同時置換の規則1件。from に完全一致した箇所を to（差し込む確定文字列）へ置き換える。 */
export interface ReplaceRule {
  from: string;
  to: string;
}

/**
 * 複数の置換規則を「1パス・同時」に適用する。
 *
 * なぜ1パスか: 規則ごとに split/join を重ねる逐次置換だと、先に差し込んだ利用者入力が
 * 後続規則の from に一致した場合に再度置換されてしまう（例: プラン1の価格に「¥1,980」と
 * 入力すると、次の規則「¥1,980 → プラン2の価格」に食われてプラン2の値へ化ける）。
 * そのため入力を先頭から1回だけ走査し、置換して出力に確定させた部分は二度と走査しない。
 *
 * 規則:
 * - from の全出現を置換する
 * - 同じ位置で複数の from が一致しうる場合は「長い from」を優先する（部分文字列の取り違え防止）
 * - 同じ位置・同じ長さで競合したら先に渡された規則を優先する
 * - from が空文字の規則は無視する（走査位置が進まず無限ループになるため）
 *
 * 計算量: 各規則の「次の出現位置」を覚えておき、走査位置が追い越したものだけ indexOf で
 * 再探索する。最悪 O(入力長 × 規則数) だが、実際に走るのはネイティブの indexOf のみで、
 * セクションHTML（数十KB）× スワップ数十件の規模では十分速い。
 */
export function replaceAllInOnePass(input: string, rules: ReplaceRule[]): string {
  const active = rules.filter((rule) => rule.from !== "");
  if (active.length === 0) return input;

  // next[i] = active[i].from が pos 以降で最初に現れる位置。-1 は「以降もう現れない」
  const next = active.map((rule) => input.indexOf(rule.from));

  let pos = 0;
  let out = "";
  for (;;) {
    let bestIdx = -1;
    let bestAt = -1;
    for (let i = 0; i < active.length; i++) {
      // 走査位置が追い越した規則だけ、pos 以降で探し直す（-1 は探し直さない）
      if (next[i] !== -1 && next[i] < pos) {
        next[i] = input.indexOf(active[i].from, pos);
      }
      const at = next[i];
      if (at === -1) continue;
      const better =
        bestIdx === -1 ||
        at < bestAt ||
        (at === bestAt && active[i].from.length > active[bestIdx].from.length);
      if (better) {
        bestIdx = i;
        bestAt = at;
      }
    }
    if (bestIdx === -1) break;
    // 置換結果は出力バッファへ確定させ、走査位置をマッチの直後まで進める（＝再走査しない）
    out += input.slice(pos, bestAt) + active[bestIdx].to;
    pos = bestAt + active[bestIdx].from.length;
  }
  return out + input.slice(pos);
}

/**
 * レンダ済み静的HTML文字列に対し、各 swap の from を置換する。
 * - from は「HTMLエスケープした形」と「生の形」の両方で探して置換（renderToStaticMarkup の
 *   出力はエスケープ済みだが、日本語文言の多くはエスケープしても変化しないため両対応にしておく）
 * - to 側の値は必ず escapeHtml() を通してから挿入する（ユーザー入力を書き出しHTMLへ差し込むため、
 *   XSS防止として必須）
 * - 全 swap を1パスで同時に適用する（replaceAllInOnePass）。逐次置換だと差し込んだ利用者入力が
 *   後続 swap の from に一致したときに二重置換されるため
 */
export function swapHtml(html: string, swaps: Swap[], a: LpAnswers): string {
  const rules: ReplaceRule[] = [];
  for (const swap of swaps) {
    const to = escapeHtml(swap.to(a));
    const escapedFrom = escapeHtml(swap.from);
    rules.push({ from: escapedFrom, to });
    // エスケープしても文字列が変わらない場合（多くの日本語文言）は同じ規則の重複になるため、
    // 変化がある場合のみ生の形も規則に加える。
    if (escapedFrom !== swap.from) {
      rules.push({ from: swap.from, to });
    }
  }
  return replaceAllInOnePass(html, rules);
}

interface SwapBoundaryProps {
  swaps: Swap[];
  answers: LpAnswers;
  children: ReactNode;
}

/**
 * プレビュー用: children 配下のテキストノードを走査し、from に完全一致するものを to に置換する。
 * - Suspense で遅延マウントされるノードにも追随できるよう MutationObserver を併用する
 * - 一度置換したノードは、その内容が自分の書き込んだ値のままである限り再置換しない
 *   （置換で差し込んだ利用者入力が別スワップの from と一致すると、characterData の変化で
 *   再び apply() が走った際に二重置換され、値が別項目の内容へ化けるため。書き出し側
 *   swapHtml の1パス化と同じ不具合のDOM版）。React が同じノードを別の文言へ描き替えた
 *   場合は書き込んだ値と一致しなくなるので、改めてスワップ対象に戻る
 * - answers/swaps の変更に追随させたい呼び出し側は key={JSON.stringify(answers)} 等で再マウントすること
 * - プレビューの一瞬の素文言表示は許容（書き出しは文字列置換のため影響なし）
 * - このファイルは .ts のため（仕様§2 の命名通り）JSX ではなく createElement で組み立てる
 */
export function SwapBoundary({ swaps, answers, children }: SwapBoundaryProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // テキストノード → そのノードへ自分が最後に書き込んだ値
    const written = new WeakMap<Text, string>();

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
        // 自分が書き込んだ値のままのノードは対象外（＝置換結果を再走査しない）
        if (written.get(textNode) === text) continue;
        const hit = swaps.find((swap) => swap.from !== "" && swap.from === text);
        if (!hit) continue;
        const next = hit.to(answers);
        written.set(textNode, next);
        textNode.textContent = next;
      }
    };

    apply();

    const observer = new MutationObserver(apply);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [swaps, answers]);

  return createElement("div", { ref }, children);
}
