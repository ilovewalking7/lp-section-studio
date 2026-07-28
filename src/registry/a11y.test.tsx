import { cleanup, render } from "@testing-library/react";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import axe from "axe-core";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { registry } from "@/registry";

/**
 * 全コンポーネントの構造アクセシビリティ検査（axe-core）。
 *
 * 各デモを jsdom にマウントして axe を実行する。コンポーネントを追加すると
 * 自動でこのテストの対象になる。
 *
 * color-contrast だけは無効化している。jsdom には描画エンジンが無く色を
 * 計算できないため。色は `npm run check:contrast` がトークン定義そのものを
 * 数値で検査していて、そちらの方が網羅的（全組み合わせを機械的に確認できる）。
 * 構造は axe、色はトークン検査、と役割を分けている。
 *
 * ── 既知の未修正分について ──
 * 検査の導入時点で 880 個中 29 個に違反が残っていた。これを直すまで CI を
 * 赤にし続けると検査自体が無視されるようになるため、a11y-baseline.json に
 * 列挙して一時的に許容している。ただし次の2方向で固定している:
 *   1. baseline に無いコンポーネントの違反は即座に失敗（新規混入を止める）
 *   2. baseline にあるのに違反が無くなったものも失敗（直したら必ず消す）
 * これで一覧は減る方向にしか動かない。
 *
 *   npm run test:a11y                        検査
 *   UPDATE_A11Y_BASELINE=1 npm run test:a11y 一覧を再生成
 */
afterEach(() => cleanup());

const BASELINE_PATH = resolve(process.cwd(), "src/registry/a11y-baseline.json");
const baseline: string[] = JSON.parse(readFileSync(BASELINE_PATH, "utf-8"));
const baselineSet = new Set(baseline);
const updating = process.env.UPDATE_A11Y_BASELINE === "1";

/** 実行中に観測した「違反があったコンポーネント」 */
const violating: string[] = [];

const cases = registry.map((e) => [e.id, e] as const);

describe.skipIf(cases.length === 0)("全デモに a11y 違反が無い", () => {
  it.each(cases)("%s", async (id, entry) => {
    const Comp = await entry.load();
    const { container } = render(<Comp />);
    const res = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    if (res.violations.length > 0) violating.push(id);
    if (updating || baselineSet.has(id)) return;

    const report = res.violations
      .map(
        (v) =>
          `${v.id} (${v.impact}): ${v.help}\n` +
          v.nodes
            .map((n) => `    ${n.html.replace(/\s+/g, " ").slice(0, 160)}`)
            .join("\n") +
          `\n    → ${v.helpUrl}`
      )
      .join("\n\n");
    expect(res.violations, `\n${entry.path}\n\n${report}\n`).toEqual([]);
  });

  it("既知一覧に、もう違反していないものが残っていない", () => {
    if (updating) {
      writeFileSync(BASELINE_PATH, JSON.stringify(violating.sort(), null, 2) + "\n");
      return;
    }
    const stale = baseline.filter((id) => !violating.includes(id));
    expect(
      stale,
      `\n直ったのに a11y-baseline.json に残っています。削除してください:\n` +
        stale.map((s) => `  ${s}`).join("\n") +
        `\n`
    ).toEqual([]);
  });
});

afterAll(() => {
  if (!updating && violating.length) {
    console.log(
      `\na11y: ${violating.length} 個に違反が残っています（a11y-baseline.json 参照）。`
    );
  }
});
