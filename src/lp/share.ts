import { LP_TEMPLATES } from "./templates";
import {
  MAX_PHOTOS,
  type Feature,
  type LpAnswers,
  type LpPhoto,
  type PricePlan,
  type Testimonial,
} from "./types";

/** 共有URLに載せる状態。t = テンプレID、a = 回答一式。 */
export interface ShareState {
  t: string;
  a: LpAnswers;
}

/** LpAnswers のうち文字列であるべきフィールド一覧（深い形状検証に使う） */
const STRING_FIELDS = [
  "shopName",
  "area",
  "tagline",
  "intro",
  "phone",
  "address",
  "hours",
  "ctaLabel",
  "ctaHref",
] as const satisfies readonly (keyof LpAnswers)[];

function isFeature(v: unknown): v is Feature {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as { title?: unknown }).title === "string" &&
    typeof (v as { desc?: unknown }).desc === "string"
  );
}

function isPricePlan(v: unknown): v is PricePlan {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as { name?: unknown }).name === "string" &&
    typeof (v as { price?: unknown }).price === "string" &&
    typeof (v as { desc?: unknown }).desc === "string"
  );
}

function isTestimonial(v: unknown): v is Testimonial {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as { headline?: unknown }).headline === "string" &&
    typeof (v as { body?: unknown }).body === "string" &&
    typeof (v as { name?: unknown }).name === "string" &&
    typeof (v as { meta?: unknown }).meta === "string"
  );
}

/**
 * 写真1枚の検証。dataUrl は必ず `data:image/` で始まることまで確認する。
 * 共有URL・保存データは第三者が組み立てられるため、`<img src>` に任意スキーム
 * （javascript: など）が入り込む余地を残さない。
 */
function isPhoto(v: unknown): v is LpPhoto {
  if (typeof v !== "object" || v === null) return false;
  const dataUrl = (v as { dataUrl?: unknown }).dataUrl;
  const alt = (v as { alt?: unknown }).alt;
  return (
    typeof dataUrl === "string" &&
    dataUrl.startsWith("data:image/") &&
    typeof alt === "string"
  );
}

/**
 * 共有URL・保存データから復元した回答を、安全な LpAnswers に正規化する。
 *
 * - 骨格（文字列フィールド / features / plans）が壊れていれば null（＝復元しない）。
 *   共有URLは第三者が任意のJSONを組み立てて配布できるため、ここを緩めると
 *   プレビュー描画（LpPreview/SwapBoundary）が想定外の形で例外を投げクラッシュしうる。
 * - 後から追加されたフィールド（testimonials / photos / hiddenSections）は、
 *   欠落・型不一致ならテンプレの既定値（または空）で補う。これにより機能追加前に
 *   発行された共有URL・保存済みプロジェクトも壊さずに開ける。
 */
function normalizeLpAnswers(templateId: string, a: unknown): LpAnswers | null {
  if (typeof a !== "object" || a === null) return null;
  const obj = a as Record<string, unknown>;
  for (const key of STRING_FIELDS) {
    if (typeof obj[key] !== "string") return null;
  }
  if (
    !Array.isArray(obj.features) ||
    obj.features.length !== 3 ||
    !obj.features.every(isFeature)
  ) {
    return null;
  }
  if (
    !Array.isArray(obj.plans) ||
    obj.plans.length !== 3 ||
    !obj.plans.every(isPricePlan)
  ) {
    return null;
  }

  const fallback = LP_TEMPLATES.find((t) => t.id === templateId)?.defaults;
  const testimonials =
    Array.isArray(obj.testimonials) &&
    obj.testimonials.length === 3 &&
    obj.testimonials.every(isTestimonial)
      ? (obj.testimonials as [Testimonial, Testimonial, Testimonial])
      : fallback?.testimonials;
  if (!testimonials) return null;

  const photos =
    Array.isArray(obj.photos) && obj.photos.every(isPhoto)
      ? (obj.photos as LpPhoto[]).slice(0, MAX_PHOTOS)
      : [];

  const hiddenSections =
    Array.isArray(obj.hiddenSections) &&
    obj.hiddenSections.every((v) => typeof v === "string")
      ? (obj.hiddenSections as string[])
      : [];

  return {
    ...(obj as unknown as LpAnswers),
    testimonials,
    photos,
    hiddenSections,
  };
}

/** 保存済みプロジェクト1件（localStorage "misete:projects" の配列要素） */
export interface SavedProject {
  id: string;
  name: string;
  updatedAt: number;
  state: ShareState;
}

/** Uint8Array → base64url（Unicode安全: TextEncoder のバイト列から btoa → URL安全化） */
function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** base64url → Uint8Array（逆変換。パディングを復元してから atob） */
function base64UrlToBytes(s: string): Uint8Array {
  const base64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * 共有状態を base64url 文字列にエンコードする（JSON→UTF8→base64url）。URL の #c= に載せる。
 * 写真（data URI）は1枚で数百KBに達しURL長の限界を超えるため、共有URLからは必ず除外する
 * （受け手側は写真なしのLPを見ることになる。UIでその旨を明示している）。
 */
export function encodeShare(s: ShareState): string {
  const json = JSON.stringify({ ...s, a: { ...s.a, photos: [] } });
  const bytes = new TextEncoder().encode(json);
  return bytesToBase64Url(bytes);
}

/**
 * base64url 文字列から共有状態を復元する。壊れたデータでも例外を投げず null を返す。
 * t は LP_TEMPLATES に実在するテンプレIDであること、a は LpAnswers の骨格を正しい型・
 * 配列長で満たしていることまで検証する（normalizeLpAnswers）。共有URLは第三者が任意の
 * JSONを組み立てて配布できるため、型アサーションだけではプレビュー描画
 * （LpPreview/SwapBoundary）が想定外の形に対して例外を投げクラッシュしうる。
 */
export function decodeShare(hash: string): ShareState | null {
  try {
    const bytes = base64UrlToBytes(hash);
    const json = new TextDecoder().decode(bytes);
    return normalizeShareState(JSON.parse(json));
  } catch {
    return null;
  }
}

/** パース済みの値を ShareState として正規化する（不正なら null）。共有URL・保存データ共通。 */
function normalizeShareState(parsed: unknown): ShareState | null {
  if (typeof parsed !== "object" || parsed === null) return null;
  const t = (parsed as { t?: unknown }).t;
  const a = (parsed as { a?: unknown }).a;
  if (typeof t !== "string" || !LP_TEMPLATES.some((tpl) => tpl.id === t)) {
    return null;
  }
  const answers = normalizeLpAnswers(t, a);
  return answers ? { t, a: answers } : null;
}

const PROJECTS_KEY = "misete:projects";

/**
 * 保存済みプロジェクト一覧を取得する。localStorage不在・壊れたデータは空配列。
 * 各件の state は normalizeShareState を通し、復元できないものは一覧から除外する
 * （機能追加前に保存されたプロジェクトも新フィールドを補って開けるようにするため）。
 */
export function listProjects(): SavedProject[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: SavedProject[] = [];
    for (const item of parsed) {
      if (typeof item !== "object" || item === null) continue;
      const { id, name, updatedAt, state } = item as Record<string, unknown>;
      const normalized = normalizeShareState(state);
      if (
        typeof id === "string" &&
        typeof name === "string" &&
        typeof updatedAt === "number" &&
        normalized
      ) {
        out.push({ id, name, updatedAt, state: normalized });
      }
    }
    return out;
  } catch {
    return [];
  }
}

/** プロジェクトを保存する（同名があれば上書き、なければ新規追加）。成否を返す。 */
export function saveProject(name: string, state: ShareState): boolean {
  try {
    const list = listProjects();
    const existing = list.find((p) => p.name === name);
    if (existing) {
      existing.state = state;
      existing.updatedAt = Date.now();
    } else {
      list.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        updatedAt: Date.now(),
        state,
      });
    }
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

/** プロジェクトを削除する。 */
export function deleteProject(id: string): void {
  try {
    const list = listProjects().filter((p) => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(list));
  } catch {
    /* noop */
  }
}

// ──────────────────────────────────────────────────────────────────────────
// 作業中ドラフトの自動保存（明示的な「保存」を押さずに閉じても失われないように）
// ──────────────────────────────────────────────────────────────────────────

const DRAFT_KEY = "misete:draft";

/**
 * 共有URL（#c=…）から開いたセッション用の自動保存キー。
 * 共有された内容は「他人の作業」であり、自分の作業ドラフト（DRAFT_KEY）と同じ枠に
 * 書き込むと開いて1文字触るだけで自分の続きが失われる。保存先ごと分けて隔離する。
 */
const SHARED_DRAFT_KEY = "misete:draft:shared";

/** 自動保存の保存先。"own" = 自分の作業、"shared" = 共有URLから開いたセッション。 */
export type DraftScope = "own" | "shared";

const DRAFT_KEYS: Record<DraftScope, string> = {
  own: DRAFT_KEY,
  shared: SHARED_DRAFT_KEY,
};

/** 自動保存の結果。写真ごと保存できたか、容量超過で写真を落としたか、保存できなかったか。 */
export type DraftSaveResult = "saved" | "saved-without-photos" | "failed";

/**
 * 作業中の内容を自動保存する。
 * 写真（data URI）を含めると localStorage の容量上限（概ね5MB）に達しうるため、
 * 容量超過で失敗した場合は写真を除いてもう一度だけ試す。呼び出し側は戻り値を見て
 * 「写真は自動保存されていない」ことを利用者に伝えられる。
 */
export function saveDraft(
  state: ShareState,
  scope: DraftScope = "own"
): DraftSaveResult {
  const key = DRAFT_KEYS[scope];
  try {
    localStorage.setItem(key, JSON.stringify(state));
    return "saved";
  } catch {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ ...state, a: { ...state.a, photos: [] } })
      );
      return "saved-without-photos";
    } catch {
      return "failed";
    }
  }
}

/** 自動保存されたドラフトを読み出す（無い・壊れている場合は null）。 */
export function loadDraft(scope: DraftScope = "own"): ShareState | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEYS[scope]);
    if (!raw) return null;
    return normalizeShareState(JSON.parse(raw));
  } catch {
    return null;
  }
}

/** 自動保存されたドラフトを破棄する。 */
export function clearDraft(scope: DraftScope = "own"): void {
  try {
    localStorage.removeItem(DRAFT_KEYS[scope]);
  } catch {
    /* noop */
  }
}
