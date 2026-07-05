import type { Lang } from "@/lib/i18n";
import { part1 } from "./i18n.parts/part1";
import { part2 } from "./i18n.parts/part2";
import { part3 } from "./i18n.parts/part3";
import { part4 } from "./i18n.parts/part4";
import { part5 } from "./i18n.parts/part5";
import { part6 } from "./i18n.parts/part6";
import { part7 } from "./i18n.parts/part7";
import { part8 } from "./i18n.parts/part8";
import { part9 } from "./i18n.parts/part9";

/**
 * カタログ（コンポーネント名・説明・カテゴリ）の英語化テーブル。
 * 英語表示時に JA メタを EN へ差し替える。未登録の id は日本語にフォールバック。
 *
 * - CATEGORY_EN: カテゴリ名（38件・手動）
 * - EN_META: id → { name, description }（自動生成パートをマージ）
 */

export const CATEGORY_EN: Record<string, string> = {
  基本: "Basics",
  "ヒーロー・LP": "Hero / LP",
  マーケティング: "Marketing",
  コンバージョン: "Conversion",
  "価格・オファー": "Pricing & Offers",
  オンボーディング: "Onboarding",
  ダッシュボード: "Dashboard",
  "AI / チャット": "AI / Chat",
  アプリUI: "App UI",
  ナビゲーション: "Navigation",
  インタラクション: "Interaction",
  ボタン: "Buttons",
  背景アニメ: "Background FX",
  テキストアニメ: "Text FX",
  カード演出: "Card FX",
  ボタン演出: "Button FX",
  スクロール演出: "Scroll FX",
  マーキー: "Marquee",
  "ローダー・マイクロ": "Loaders & Micro",
  Awwwards: "Awwwards",
  "3Dカルーセル": "3D Carousels",
  "3Dアニメ": "3D & Materials",
  ドラッグ操作: "Drag",
  フォーム: "Forms",
  コマース: "Commerce",
  設定: "Settings",
  和風: "Japanese (Wafu)",
  洋風: "Western",
  ミニマル: "Minimal",
  ブルータリスト: "Brutalist",
  グラスモーフィズム: "Glassmorphism",
  "レトロ・Y2K": "Retro / Y2K",
  ラグジュアリー: "Luxury",
  プレイフル: "Playful",
  ニューモーフィズム: "Neumorphism",
  メンフィス: "Memphis",
  ダークテック: "Dark Tech",
  北欧: "Nordic",
  ボタニカル: "Botanical",
};

/**
 * id → 英語メタ。自動生成パート（src/registry/i18n.parts/*）をここでマージする。
 * パート未生成の段階では空（= 日本語フォールバック）。
 */
export const EN_META: Record<string, { name: string; description: string }> = {
  ...part1,
  ...part2,
  ...part3,
  ...part4,
  ...part5,
  ...part6,
  ...part7,
  ...part8,
  ...part9,
};

export function tCategory(lang: Lang, cat: string): string {
  return lang === "en" ? CATEGORY_EN[cat] ?? cat : cat;
}

export function tName(lang: Lang, id: string, jaName: string): string {
  return lang === "en" ? EN_META[id]?.name ?? jaName : jaName;
}

export function tDesc(lang: Lang, id: string, jaDesc: string): string {
  return lang === "en" ? EN_META[id]?.description ?? jaDesc : jaDesc;
}
