import { useEffect, useState } from "react";

/**
 * 依存ゼロの軽量 i18n。マーケ面（LP・料金・スタジオのナビ/ラベル）の言語切替に使う。
 * 対応言語は 日本語 / 英語。各ページは自前の二言語コピー辞書を持ち、`lang` で出し分ける。
 */
export type Lang = "ja" | "en";

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: "ja", label: "日本語", short: "JA" },
  { id: "en", label: "English", short: "EN" },
];

const LANG_KEY = "cs:lang";

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "ja" || saved === "en") return saved;
  } catch {
    /* noop */
  }
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
  }
  return "ja";
}

export function useLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const [lang, setLangState] = useState<Lang>(detectLang);
  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* noop */
    }
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  return { lang, setLang: setLangState };
}

/** 小さな二言語辞書から現在言語の値を取り出すヘルパー */
export function pick<T>(lang: Lang, value: { ja: T; en: T }): T {
  return value[lang];
}

/**
 * 現在の言語を localStorage から同期的に読む（props で lang を受け取れない
 * 自己完結デモが、自前のUI文言を出し分けるための簡易リーダー）。
 */
export function readLang(): Lang {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === "ja" || v === "en") return v;
  } catch {
    /* noop */
  }
  return "ja";
}
