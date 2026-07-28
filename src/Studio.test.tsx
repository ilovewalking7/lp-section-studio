import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Studio from "./Studio";
import { registry } from "@/registry";
import { isFreeComponent } from "@/lib/free";
import { FREE_EDITION_COUNT } from "@/registry/freeCount";

/**
 * スタジオの「無料100個」絞り込みの振る舞いテスト。
 * 880個のうちどれが無料版に入っているのかを画面から判別できること
 * （トグル・バッジ・件数表示）を固定する。
 */
afterEach(() => cleanup());

const FREE_LABEL = `無料${FREE_EDITION_COUNT}個`;

function renderStudio() {
  return render(
    <Studio
      plan="free"
      lang="ja"
      setLang={() => {}}
      onHome={() => {}}
      onPricing={() => {}}
    />
  );
}

const toggle = () => screen.getByRole("button", { name: FREE_LABEL });

/** 無料版に入っていない側の代表（名前が無料版と重複しないものを選ぶ） */
const paidEntry = registry.find(
  (e) =>
    !isFreeComponent(e.id) &&
    !registry.some((o) => o.name === e.name && isFreeComponent(o.id))
)!;
const freeEntry = registry.find((e) => isFreeComponent(e.id))!;

describe("スタジオの無料100個フィルタ", () => {
  it("トグルを押すと無料版の100個だけになり、件数とバッジが出る", () => {
    renderStudio();
    // 実 button + aria-pressed（支援技術に ON/OFF が伝わること）
    expect(toggle().tagName).toBe("BUTTON");
    expect(toggle().getAttribute("aria-pressed")).toBe("false");
    expect(screen.queryAllByText(paidEntry.name).length).toBeGreaterThan(0);

    fireEvent.click(toggle());

    expect(toggle().getAttribute("aria-pressed")).toBe("true");
    expect(screen.queryAllByText(paidEntry.name)).toHaveLength(0);
    expect(screen.queryAllByText(freeEntry.name).length).toBeGreaterThan(0);
    // 「無料100個のうち 100 件」
    expect(
      screen.getAllByText(`${FREE_LABEL}のうち ${FREE_EDITION_COUNT} 件`).length
    ).toBeGreaterThan(0);
    // 無料版のカードにだけ付くバッジ（読み上げは「無料版に含まれます」）
    const badges = screen.getAllByText("無料");
    expect(badges).toHaveLength(FREE_EDITION_COUNT);
    expect(badges[0].textContent).toBe("無料版に含まれます");
  });

  it("検索と AND で併用できる", () => {
    renderStudio();
    fireEvent.click(toggle());
    fireEvent.change(screen.getByPlaceholderText("検索（名前・タグ）..."), {
      target: { value: "hero" },
    });

    const expected = registry.filter(
      (e) =>
        isFreeComponent(e.id) &&
        [e.name, e.description, e.category, ...(e.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes("hero")
    ).length;

    expect(expected).toBeGreaterThan(0);
    expect(expected).toBeLessThan(FREE_EDITION_COUNT);
    expect(
      screen.getAllByText(`${FREE_LABEL}のうち ${expected} 件`).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("無料")).toHaveLength(expected);
  });

  it("月額を前提にした統計表示が残っていない", () => {
    renderStudio();
    expect(screen.queryByText("あなたの月額")).toBeNull();
    expect(screen.queryByText("¥0")).toBeNull();
    expect(screen.getByText("無料で使える数")).toBeTruthy();
  });
});
