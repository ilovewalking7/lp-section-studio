import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Studio from "./Studio";
import { registry } from "@/registry";

/**
 * スタジオが「全コンポーネント無料・課金要素なし」であることの契約テスト。
 *
 * 以前は無料100個 / 買い切り880個の二重構成だったが、MIT で全公開したため
 * 課金導線は撤去した。ここでは **課金要素が復活していないこと** を固定する。
 */
afterEach(() => cleanup());

function renderStudio() {
  return render(
    <Studio lang="ja" setLang={() => {}} onHome={() => {}} />
  );
}

describe("スタジオに課金要素が無い", () => {
  it("全コンポーネントが対象で、絞り込みの初期状態で件数が全件と一致する", () => {
    renderStudio();
    expect(registry.length).toBeGreaterThan(800);
    // 件数表示に全件数が出ている（無料版だけに絞られていない）
    expect(screen.getAllByText(new RegExp(String(registry.length))).length).toBeGreaterThan(0);
  });

  it("無料/有料を分ける UI が存在しない", () => {
    renderStudio();
    for (const label of [/無料\d+個/, /^料金$/, /Pro にアップグレード/, /本日のコピー上限/]) {
      expect(screen.queryAllByText(label), `${label} が残っている`).toHaveLength(0);
    }
  });

  it("価格・プランの文字列が画面に出ていない", () => {
    const { container } = renderStudio();
    const text = container.textContent ?? "";
    for (const word of ["¥9,800", "買い切り", "全部入り", "アップグレード"]) {
      expect(text, `「${word}」が残っている`).not.toContain(word);
    }
  });
});
