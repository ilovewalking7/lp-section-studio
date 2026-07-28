import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { registry } from "@/registry";

/**
 * キーボード操作可能性の検査。
 *
 * axe は「その要素の属性が正しいか」を見るが、「キーボードだけで実際に
 * 触れるか」は見ない。ここはその穴を埋める。
 *
 * ルール1: role で対話部品を名乗る要素は、フォーカスできなければならない。
 *   <div role="button"> に tabindex が無いと、マウスでしか押せない。
 *
 * ルール2: 対話要素を持つコンポーネントには、キーボードで到達できる要素が
 *   最低1つ無ければならない。tabindex="-1" は roving tabindex（タブ一覧で
 *   矢印キー移動させる正しい実装）で使うので単体では違反にしない。しかし
 *   全部が -1 なら、そのコンポーネントはキーボードから触れない。
 *
 * jsdom には描画が無いのでフォーカスリングの視認性までは見られない。
 * そこは check-contrast.mjs（ring トークン）と目視に委ねている。
 */
afterEach(() => cleanup());

const NATIVE = "a[href],button,input,select,textarea,summary,[contenteditable]";

/** role を名乗ったら自力でフォーカスを受け取る必要がある部品 */
const WIDGET_ROLES = ["button", "link", "checkbox", "switch", "radio"];

const cases = registry.map((e) => [e.id, e] as const);

describe.skipIf(cases.length === 0)("キーボードで操作できる", () => {
  it.each(cases)("%s", async (_id, entry) => {
    const Comp = await entry.load();
    const { container } = render(<Comp />);

    // ルール1
    const notFocusable: string[] = [];
    for (const role of WIDGET_ROLES) {
      for (const el of container.querySelectorAll(`[role="${role}"]`)) {
        if (el.matches(NATIVE) || el.hasAttribute("tabindex")) continue;
        notFocusable.push(
          `role="${role}" の <${el.tagName.toLowerCase()}> に tabindex がありません: ` +
            el.outerHTML.replace(/\s+/g, " ").slice(0, 140)
        );
      }
    }
    expect(notFocusable, `\n${entry.path}\n${notFocusable.join("\n")}\n`).toEqual(
      []
    );

    // ルール2
    const interactive = [
      ...container.querySelectorAll(NATIVE),
      ...WIDGET_ROLES.flatMap((r) => [
        ...container.querySelectorAll(`[role="${r}"]`),
      ]),
    ];
    if (interactive.length > 0) {
      const reachable = interactive.some((el) => {
        const ti = el.getAttribute("tabindex");
        if (ti !== null) return Number(ti) >= 0;
        return !el.hasAttribute("disabled");
      });
      expect(
        reachable,
        `\n${entry.path}\n対話要素が ${interactive.length} 個あるのに、` +
          `キーボードで到達できるものが1つもありません（全て tabindex="-1" か disabled）。\n`
      ).toBe(true);
    }
  });
});
