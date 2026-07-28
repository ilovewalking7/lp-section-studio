import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { registry } from "@/registry";
import { FREE_IDS } from "./freeIds";
import { FREE_EDITION_COUNT } from "./freeCount";

/**
 * 無料版（MCP に同梱する100個）のドリフト検査。
 *
 * `freeIds.ts` / `freeCount.ts` は `mcp/data/components.json` から自動生成する派生物なので、
 * 元データや registry が動いたときに黙って腐りうる。
 * ここで「全IDが registry に実在する」「件数が included と一致する」を固定し、
 * スタジオの『無料100個』表示が実際の無料版とずれないことを保証する。
 */

const bundle = JSON.parse(
  readFileSync(resolve(process.cwd(), "mcp/data/components.json"), "utf-8")
) as { included: number; items: { id: string }[] };

describe("無料版の ID 一覧が registry と一致している", () => {
  it("FREE_IDS の全IDが registry に実在する", () => {
    const known = new Set(registry.map((e) => e.id));
    const missing = FREE_IDS.filter((id) => !known.has(id));
    expect(missing, `registry に無いID: ${missing.join(", ")}`).toEqual([]);
  });

  it("件数が mcp/data/components.json の included と一致する", () => {
    expect(FREE_IDS.length).toBe(bundle.included);
    expect(FREE_EDITION_COUNT).toBe(bundle.included);
    expect(bundle.items.length).toBe(bundle.included);
  });

  it("元データと同じID集合で、重複が無い", () => {
    expect(new Set(FREE_IDS).size).toBe(FREE_IDS.length);
    expect([...FREE_IDS].sort()).toEqual(
      [...new Set(bundle.items.map((i) => i.id))].sort()
    );
  });
});
