import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { registry } from "@/registry";

/**
 * 全コンポーネントの「実レンダリング・スモークテスト」。
 * 各デモを jsdom 上で実際にマウント→アンマウントし、
 *   1) 例外を投げない
 *   2) React の console.error / warn（key 重複・不正DOMネスト・controlled input 等）を出さない
 * ことを保証する。MC21 級「エラーゼロ」を回帰テストとして固定する。
 */
afterEach(() => cleanup());

describe("全デモが例外・警告なくレンダリングできる", () => {
  it.each(registry.map((e) => [e.id, e] as const))(
    "%s",
    async (_id, entry) => {
      const origErr = console.error;
      const origWarn = console.warn;
      const issues: string[] = [];
      const capture = (...args: unknown[]) => {
        issues.push(
          args.map((a) => (typeof a === "string" ? a : String(a))).join(" ")
        );
      };
      console.error = capture;
      console.warn = capture;
      try {
        const Comp = await entry.load();
        const { unmount } = render(<Comp />);
        unmount();
      } finally {
        console.error = origErr;
        console.warn = origWarn;
      }
      expect(issues, issues.join("\n---\n")).toEqual([]);
    }
  );
});
