import { LP_TEMPLATES } from "./templates";
import type { Feature, LpAnswers, PricePlan } from "./types";

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

/**
 * 共有URLから復元した回答が LpAnswers の形状を満たすか深く検証する。
 * 共有URLは第三者が手で組み立てて配ることもできるため、型アサーションだけでなく
 * 実行時に全フィールドの型・配列長まで確認し、1つでも食い違えば false を返す
 * （呼び出し側はプレビュー描画前に弾けるため、クラッシュを未然に防げる）。
 */
function isValidLpAnswers(a: unknown): a is LpAnswers {
  if (typeof a !== "object" || a === null) return false;
  const obj = a as Record<string, unknown>;
  for (const key of STRING_FIELDS) {
    if (typeof obj[key] !== "string") return false;
  }
  if (
    !Array.isArray(obj.features) ||
    obj.features.length !== 3 ||
    !obj.features.every(isFeature)
  ) {
    return false;
  }
  if (
    !Array.isArray(obj.plans) ||
    obj.plans.length !== 3 ||
    !obj.plans.every(isPricePlan)
  ) {
    return false;
  }
  return true;
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

/** 共有状態を base64url 文字列にエンコードする（JSON→UTF8→base64url）。URL の #c= に載せる。 */
export function encodeShare(s: ShareState): string {
  const json = JSON.stringify(s);
  const bytes = new TextEncoder().encode(json);
  return bytesToBase64Url(bytes);
}

/**
 * base64url 文字列から共有状態を復元する。壊れたデータでも例外を投げず null を返す。
 * t は LP_TEMPLATES に実在するテンプレIDであること、a は LpAnswers の全フィールドを
 * 正しい型・配列長で満たしていることまで検証する（isValidLpAnswers）。共有URLは
 * 第三者が任意のJSONを組み立てて配布できるため、型アサーションだけでは
 * プレビュー描画（LpPreview/SwapBoundary）が想定外の形に対して例外を投げクラッシュしうる。
 */
export function decodeShare(hash: string): ShareState | null {
  try {
    const bytes = base64UrlToBytes(hash);
    const json = new TextDecoder().decode(bytes);
    const parsed: unknown = JSON.parse(json);
    if (typeof parsed !== "object" || parsed === null) return null;
    const t = (parsed as { t?: unknown }).t;
    const a = (parsed as { a?: unknown }).a;
    if (typeof t !== "string" || !LP_TEMPLATES.some((tpl) => tpl.id === t)) {
      return null;
    }
    if (!isValidLpAnswers(a)) return null;
    return { t, a };
  } catch {
    return null;
  }
}

const PROJECTS_KEY = "misete:projects";

/** 保存済みプロジェクト一覧を取得する。localStorage不在・壊れたデータは空配列。 */
export function listProjects(): SavedProject[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedProject[]) : [];
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
