/**
 * 共有状態の正規化・自動保存まわりのテスト。
 *
 * 共有URL（#c=）は第三者が任意のJSONを組み立てて配布できるため、ここが緩むと
 * プレビュー描画が想定外の形で例外を投げアプリ全体が落ちる（過去に実際に起きた欠陥）。
 * 同時に、機能追加で LpAnswers にフィールドが増えても「以前に発行された共有URL・
 * 保存済みプロジェクト」を壊さないことも保証する必要がある。その両立を検証する。
 */
import { beforeEach, describe, expect, it } from "vitest";
import {
  clearDraft,
  decodeShare,
  encodeShare,
  listProjects,
  loadDraft,
  saveDraft,
  saveProject,
  type ShareState,
} from "./share";
import { LP_TEMPLATES } from "./templates";
import { MAX_PHOTOS, type LpAnswers } from "./types";

const template = LP_TEMPLATES[0];

function baseAnswers(): LpAnswers {
  return structuredClone(template.defaults);
}

/** 旧バージョン（testimonials/photos/hiddenSections が無い時代）の回答を再現する */
function legacyAnswers(): Record<string, unknown> {
  const a = baseAnswers() as unknown as Record<string, unknown>;
  delete a.testimonials;
  delete a.photos;
  delete a.hiddenSections;
  return a;
}

/** 任意のオブジェクトを共有ハッシュ文字列にする（encodeShare は写真を落とすため素で作る） */
function toHash(value: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

beforeEach(() => {
  localStorage.clear();
});

describe("decodeShare の正規化", () => {
  it("正しい状態はそのまま復元できる", () => {
    const state: ShareState = { t: template.id, a: baseAnswers() };
    const decoded = decodeShare(encodeShare(state));
    expect(decoded?.t).toBe(template.id);
    expect(decoded?.a.shopName).toBe(state.a.shopName);
    expect(decoded?.a.testimonials).toHaveLength(3);
  });

  it("旧形式（新フィールドなし）もテンプレ既定値で補って復元できる", () => {
    const decoded = decodeShare(toHash({ t: template.id, a: legacyAnswers() }));
    expect(decoded).not.toBeNull();
    expect(decoded?.a.testimonials).toHaveLength(3);
    expect(decoded?.a.photos).toEqual([]);
    expect(decoded?.a.hiddenSections).toEqual([]);
  });

  it("骨格が壊れていれば復元しない（features 欠落・plans長さ違い・型違い）", () => {
    const a = baseAnswers() as unknown as Record<string, unknown>;
    delete a.features;
    expect(decodeShare(toHash({ t: template.id, a }))).toBeNull();

    const b = baseAnswers() as unknown as Record<string, unknown>;
    b.plans = [{ name: "x", price: "y", desc: "z" }];
    expect(decodeShare(toHash({ t: template.id, a: b }))).toBeNull();

    const c = baseAnswers() as unknown as Record<string, unknown>;
    c.shopName = 42;
    expect(decodeShare(toHash({ t: template.id, a: c }))).toBeNull();
  });

  it("存在しないテンプレIDは復元しない", () => {
    expect(
      decodeShare(toHash({ t: "no-such-template", a: baseAnswers() }))
    ).toBeNull();
  });

  it("data:image 以外の写真URLは受け付けない（imgのsrcに任意スキームを載せない）", () => {
    const a = baseAnswers() as unknown as Record<string, unknown>;
    a.photos = [{ dataUrl: "javascript:alert(1)", alt: "x" }];
    const decoded = decodeShare(toHash({ t: template.id, a }));
    // 不正な写真配列は丸ごと空に正規化される（復元自体は成功する）
    expect(decoded).not.toBeNull();
    expect(decoded?.a.photos).toEqual([]);
  });

  it("写真は上限枚数までに切り詰められる", () => {
    const a = baseAnswers() as unknown as Record<string, unknown>;
    a.photos = Array.from({ length: MAX_PHOTOS + 2 }, (_, i) => ({
      dataUrl: `data:image/jpeg;base64,AAAA${i}`,
      alt: `写真${i}`,
    }));
    const decoded = decodeShare(toHash({ t: template.id, a }));
    expect(decoded?.a.photos).toHaveLength(MAX_PHOTOS);
  });

  it("壊れた文字列・不正JSONでも例外を投げず null を返す", () => {
    expect(decodeShare("!!!not-base64!!!")).toBeNull();
    expect(decodeShare(toHash("just a string"))).toBeNull();
    expect(decodeShare("")).toBeNull();
  });
});

describe("encodeShare", () => {
  it("共有URLには写真を載せない（URL長の限界を超えるため）", () => {
    const a = baseAnswers();
    a.photos = [{ dataUrl: `data:image/jpeg;base64,${"A".repeat(5000)}`, alt: "露天風呂" }];
    const encoded = encodeShare({ t: template.id, a });
    expect(encoded.length).toBeLessThan(4000);
    expect(decodeShare(encoded)?.a.photos).toEqual([]);
  });
});

describe("保存済みプロジェクト", () => {
  it("保存して読み出せる", () => {
    const state: ShareState = { t: template.id, a: baseAnswers() };
    expect(saveProject("うちの宿", state)).toBe(true);
    const list = listProjects();
    expect(list).toHaveLength(1);
    expect(list[0].name).toBe("うちの宿");
    expect(list[0].state.a.shopName).toBe(state.a.shopName);
  });

  it("旧形式で保存されたプロジェクトも新フィールドを補って開ける", () => {
    localStorage.setItem(
      "misete:projects",
      JSON.stringify([
        {
          id: "old-1",
          name: "以前の下書き",
          updatedAt: 1,
          state: { t: template.id, a: legacyAnswers() },
        },
      ])
    );
    const list = listProjects();
    expect(list).toHaveLength(1);
    expect(list[0].state.a.testimonials).toHaveLength(3);
  });

  it("復元できない壊れた項目は一覧から除外する", () => {
    localStorage.setItem(
      "misete:projects",
      JSON.stringify([
        { id: "broken", name: "壊れ", updatedAt: 1, state: { t: "nope", a: {} } },
        {
          id: "ok",
          name: "正常",
          updatedAt: 2,
          state: { t: template.id, a: baseAnswers() },
        },
      ])
    );
    const list = listProjects();
    expect(list.map((p) => p.name)).toEqual(["正常"]);
  });
});

describe("自動保存（ドラフト）", () => {
  it("保存して読み出せる／破棄できる", () => {
    const state: ShareState = { t: template.id, a: baseAnswers() };
    expect(saveDraft(state)).toBe("saved");
    expect(loadDraft()?.a.shopName).toBe(state.a.shopName);
    clearDraft();
    expect(loadDraft()).toBeNull();
  });

  it("容量超過のときは写真を落として本文だけでも保存する", () => {
    const original = Storage.prototype.setItem;
    let callCount = 0;
    // 1回目（写真あり）は容量超過で失敗、2回目（写真なし）は成功する状況を再現する
    Storage.prototype.setItem = function (key: string, value: string) {
      callCount += 1;
      if (callCount === 1) throw new Error("QuotaExceededError");
      return original.call(this, key, value);
    };
    try {
      const a = baseAnswers();
      a.photos = [{ dataUrl: "data:image/jpeg;base64,AAAA", alt: "外観" }];
      expect(saveDraft({ t: template.id, a })).toBe("saved-without-photos");
      expect(loadDraft()?.a.photos).toEqual([]);
      expect(loadDraft()?.a.shopName).toBe(a.shopName);
    } finally {
      Storage.prototype.setItem = original;
    }
  });

  it("2回とも失敗したら failed を返す（例外は投げない）", () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error("QuotaExceededError");
    };
    try {
      expect(saveDraft({ t: template.id, a: baseAnswers() })).toBe("failed");
    } finally {
      Storage.prototype.setItem = original;
    }
  });
});
