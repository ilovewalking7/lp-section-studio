import type { LpAnswers } from "./types";

/** 共有URLに載せる状態。t = テンプレID、a = 回答一式。 */
export interface ShareState {
  t: string;
  a: LpAnswers;
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

/** base64url 文字列から共有状態を復元する。壊れたデータでも例外を投げず null を返す。 */
export function decodeShare(hash: string): ShareState | null {
  try {
    const bytes = base64UrlToBytes(hash);
    const json = new TextDecoder().decode(bytes);
    const parsed: unknown = JSON.parse(json);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as { t?: unknown }).t !== "string" ||
      typeof (parsed as { a?: unknown }).a !== "object" ||
      (parsed as { a?: unknown }).a === null
    ) {
      return null;
    }
    return parsed as ShareState;
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

/** プロジェクトを保存する（同名があれば上書き、なければ新規追加）。 */
export function saveProject(name: string, state: ShareState): void {
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
  } catch {
    /* noop */
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
