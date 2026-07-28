import { describe, expect, it } from "vitest";
import { render } from "./entry-server";

/**
 * 静的プリレンダの契約テスト。
 * マーケ面（ホーム / 料金）が SSR レンダで例外なく“中身入り”HTML を返すこと
 * （= クローラ向けの初期 HTML が空でないこと）をガードする。
 */
describe("entry-server.render がマーケ面の HTML を返す", () => {
  it("home はブランドと h1 見出しを含む", () => {
    const html = render("home");
    expect(html.length).toBeGreaterThan(2000);
    expect(html).toContain("LP Section Studio");
    expect(html).toContain("<h1");
  });

  it("pricing はプラン内容と価格を含む", () => {
    const html = render("pricing");
    expect(html.length).toBeGreaterThan(800);
    // 買い切りの2択。プラン名と価格が静的HTMLに入っていないと、
    // クローラにも JS 無効環境にも料金が伝わらない。
    expect(html).toContain("無料");
    expect(html).toContain("全部入り");
    expect(html).toContain("¥9,800");
    expect(html).toContain("買い切り");
    // 月額の名残が残っていないこと
    expect(html).not.toContain("/月");
  });
});
