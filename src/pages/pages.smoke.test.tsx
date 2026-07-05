import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Landing from "./Landing";
import Pricing from "./Pricing";
import type { Lang } from "@/lib/i18n";

/**
 * マーケ面（LP / 料金）の実レンダリング・スモークテスト。
 * 日本語・英語の両方で、例外・React 警告（key 重複・不正DOMネスト等）ゼロを保証する。
 */
afterEach(() => cleanup());

function withCapture(fn: () => void): string[] {
  const origErr = console.error;
  const origWarn = console.warn;
  const issues: string[] = [];
  const capture = (...args: unknown[]) =>
    issues.push(args.map((a) => (typeof a === "string" ? a : String(a))).join(" "));
  console.error = capture;
  console.warn = capture;
  try {
    fn();
  } finally {
    console.error = origErr;
    console.warn = origWarn;
  }
  return issues;
}

const LANGS: Lang[] = ["ja", "en"];

describe("マーケ面が例外・警告なくレンダリングできる", () => {
  it.each(LANGS)("Landing (%s)", (lang) => {
    const issues = withCapture(() => {
      const { unmount } = render(
        <Landing
          stats={{ components: 830, styles: 13, categories: 38 }}
          lang={lang}
          onOpenStudio={() => {}}
          onOpenPricing={() => {}}
        />
      );
      unmount();
    });
    expect(issues, issues.join("\n---\n")).toEqual([]);
  });

  it.each(LANGS)("Pricing (%s)", (lang) => {
    const issues = withCapture(() => {
      const { unmount } = render(
        <Pricing
          currentPlan="free"
          lang={lang}
          onChoosePlan={() => {}}
          onOpenStudio={() => {}}
        />
      );
      unmount();
    });
    expect(issues, issues.join("\n---\n")).toEqual([]);
  });
});
