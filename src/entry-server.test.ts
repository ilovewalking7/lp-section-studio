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

  it("pricing はプラン内容を含む", () => {
    const html = render("pricing");
    expect(html.length).toBeGreaterThan(800);
    expect(html).toContain("Pro");
  });
});
