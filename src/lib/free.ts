import { FREE_IDS } from "@/registry/freeIds";

/**
 * 無料版（MCP に同梱する 100 個）の判定。
 *
 * ID の一覧は `mcp/data/components.json` から自動生成した
 * `src/registry/freeIds.ts` を単一の真実として参照する。
 * 元データは HTML 本体込みで 1.1MB あるので、フロントには ID だけを載せる。
 *
 * 件数（FREE_EDITION_COUNT）はここでは再輸出しない。ID 一覧と同じモジュールを
 * 経由すると、数字しか使わない LP の初期チャンクにも ID 100 件が載ってしまう。
 * 数字だけ要る側は `@/registry/freeCount` を読むこと。
 */

const FREE_ID_SET: ReadonlySet<string> = new Set(FREE_IDS);

/** このコンポーネントが無料版に含まれるか */
export function isFreeComponent(id: string): boolean {
  return FREE_ID_SET.has(id);
}
