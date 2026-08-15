import { describe, expect, it } from "vitest";
import { render } from "./entry-server";

/**
 * 静的プリレンダの契約テスト。
 * マーケ面（ホーム）が SSR レンダで例外なく“中身入り”HTML を返すこと
 * （= クローラ向けの初期 HTML が空でないこと）をガードする。
 */
describe("entry-server.render がマーケ面の HTML を返す", () => {
  it("home はブランドと h1 見出しを含む", () => {
    const html = render("home");
    expect(html.length).toBeGreaterThan(2000);
    expect(html).toContain("LP Section Studio");
    expect(html).toContain("<h1");
  });

  it("課金・プランの文言が静的HTMLに残っていない", () => {
    const html = render("home");
    // 注: "/月" は料金表デモ（AnchorPricing3D 等）の中身として正当に登場するため
    //     ここでは検査しない。自分のプラン文言だけを対象にする。
    for (const word of ["¥9,800", "全部入り", "Upgrade to Pro", "Pro にアップグレード"]) {
      expect(html, `「${word}」が残っている`).not.toContain(word);
    }
  });
});
