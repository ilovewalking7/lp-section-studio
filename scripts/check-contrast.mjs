/**
 * デザイントークンのコントラスト比を検証する。
 *
 * src/index.css の :root（ライト）と .dark（ダーク）から HSL 変数を読み、
 * WCAG 2.1 の相対輝度・コントラスト比を計算して基準を満たすか判定する。
 *
 * 基準:
 *   text  … 4.5:1（通常サイズの文字。WCAG 1.4.3）
 *   large … 3.0:1（大きい文字 / アイコン）
 *   ui    … 3.0:1（WCAG 1.4.11 非テキストのコントラスト）
 *   info  … 判定しない。比率を表示するだけ
 *
 * ui と info の線引き:
 *   1.4.11 が 3:1 を要求するのは「その部品を識別するために必要な視覚情報」。
 *   入力欄の枠は、そこが入力欄だと分かる唯一の手がかりなので **必須**。
 *   一方カードや区切りの境界線は、面の色と中身で識別できるため装飾であり
 *   対象外。無理に濃くすると罫線だらけの画面になり、かえって読みにくい。
 *   そのため border 系は info とし、比率だけ記録して判定はしない。
 *
 * 使い方:
 *   node scripts/check-contrast.mjs                全組み合わせを表示
 *   node scripts/check-contrast.mjs --quiet        未達のものだけ表示（npm test 用）
 *   node scripts/check-contrast.mjs <path/to.css>  別リポジトリの CSS を検査
 * 失敗するとエラー終了するので CI に組み込める。
 *
 * 未定義のトークンを含む組は「対象外」として飛ばす。他リポジトリの
 * CSS を検査したときに、こちら固有のトークン（surface / evidence など）が
 * ないだけで失敗扱いになるのを避けるため。
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pathArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
const CSS_PATH = pathArg
  ? resolve(process.cwd(), pathArg)
  : resolve(here, "../src/index.css");

/** `--name: H S% L%;` の並びを { name: [h,s,l] } に変換する。 */
function parseTokens(block) {
  const out = {};
  const re = /--([\w-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*;/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    out[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])];
  }
  return out;
}

/** CSS から :root / .dark それぞれのブロックを切り出す。 */
function extractBlocks(css) {
  const grab = (selector) => {
    const start = css.indexOf(selector);
    if (start === -1) throw new Error(`${selector} が見つかりません`);
    const open = css.indexOf("{", start);
    let depth = 0;
    for (let i = open; i < css.length; i++) {
      if (css[i] === "{") depth++;
      else if (css[i] === "}") {
        depth--;
        if (depth === 0) return css.slice(open + 1, i);
      }
    }
    throw new Error(`${selector} のブロックが閉じていません`);
  };
  return { light: grab(":root"), dark: grab(".dark") };
}

/** HSL(0-360, 0-100, 0-100) → sRGB(0-1) 各成分。 */
function hslToRgb([h, s, l]) {
  const S = s / 100;
  const L = l / 100;
  const c = (1 - Math.abs(2 * L - 1)) * S;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rgb;
  if (hp < 1) rgb = [c, x, 0];
  else if (hp < 2) rgb = [x, c, 0];
  else if (hp < 3) rgb = [0, c, x];
  else if (hp < 4) rgb = [0, x, c];
  else if (hp < 5) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  const m = L - c / 2;
  return rgb.map((v) => v + m);
}

/** WCAG 相対輝度。 */
function luminance(hsl) {
  const [r, g, b] = hslToRgb(hsl).map((v) => {
    const c = Math.min(Math.max(v, 0), 1);
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const THRESHOLD = { text: 4.5, large: 3, ui: 3 };

/** [前景, 背景, 用途, 説明] */
const PAIRS = [
  ["foreground", "background", "text", "本文"],
  ["foreground", "card", "text", "カード上の本文"],
  ["foreground", "surface", "text", "surface 上の本文"],
  ["muted-foreground", "background", "text", "補足文"],
  ["muted-foreground", "card", "text", "カード上の補足文"],
  ["muted-foreground", "surface", "text", "surface 上の補足文"],
  ["primary", "background", "text", "リンク・強調文字"],
  ["primary", "card", "text", "カード上のリンク"],
  ["primary-foreground", "primary", "text", "主ボタンの文字"],
  ["secondary-foreground", "secondary", "text", "副ボタンの文字"],
  ["accent-foreground", "accent", "text", "アクセント面の文字"],
  ["evidence", "background", "text", "根拠マーカーの文字"],
  ["evidence", "card", "text", "カード上の根拠文字"],
  ["evidence", "evidence-subtle", "text", "ハイライト上の根拠文字"],
  ["evidence-foreground", "evidence", "text", "根拠バッジの文字"],
  ["success", "background", "text", "成功メッセージ"],
  ["success-foreground", "success", "text", "成功バッジの文字"],
  ["destructive", "background", "text", "エラーメッセージ"],
  ["destructive", "card", "text", "カード上のエラー文字"],
  ["destructive-foreground", "destructive", "text", "破壊的ボタンの文字"],
  ["input", "background", "ui", "入力欄の枠"],
  ["input", "card", "ui", "カード上の入力欄の枠"],
  ["ring", "background", "ui", "フォーカスリング"],
  ["ring", "card", "ui", "カード上のフォーカスリング"],
  ["border", "background", "info", "区切り線（装飾）"],
  ["border", "card", "info", "カードの境界線（装飾）"],
];

const css = await readFile(CSS_PATH, "utf8");
const blocks = extractBlocks(css);
const themes = {
  ライト: parseTokens(blocks.light),
  ダーク: { ...parseTokens(blocks.light), ...parseTokens(blocks.dark) },
};

const quiet = process.argv.includes("--quiet");
const say = (msg) => {
  if (!quiet) console.log(msg);
};

let failed = 0;
let checked = 0;
let skipped = 0;

for (const [themeName, tokens] of Object.entries(themes)) {
  say(`\n── ${themeName}モード ──`);
  for (const [fg, bg, kind, label] of PAIRS) {
    // 未定義トークンを含む組は対象外。他リポジトリの CSS を検査したとき、
    // こちら固有のトークンが無いだけで失敗になるのを避ける。
    if (!tokens[fg] || !tokens[bg]) {
      say(`  --  ${label.padEnd(24, "　")} 対象外（${fg} / ${bg} が未定義）`);
      skipped++;
      continue;
    }
    const ratio = contrast(tokens[fg], tokens[bg]);
    if (kind === "info") {
      say(
        `  --  ${label.padEnd(24, "　")} ${ratio.toFixed(2)}:1 ` +
          `(判定対象外) ${fg} / ${bg}`,
      );
      continue;
    }
    const need = THRESHOLD[kind];
    const ok = ratio >= need;
    checked++;
    if (!ok) failed++;
    const line =
      `  ${ok ? "OK " : "NG "} ${label.padEnd(24, "　")} ${ratio.toFixed(2)}:1 ` +
      `(必要 ${need}:1) ${fg} / ${bg}`;
    if (ok) say(line);
    else console.log(`[${themeName}] ${line}`);
  }
}

const summary =
  `コントラスト: ${checked} 組を検査、${failed} 組が基準未達。` +
  (skipped ? `（${skipped} 組はトークン未定義で対象外）` : "");
if (quiet && failed === 0) console.log(`✓ ${summary}`);
else console.log(`\n${summary}`);

if (failed > 0) {
  console.error("コントラスト基準を満たしていない組み合わせがあります。");
  process.exit(1);
}
if (!quiet) console.log("すべて WCAG AA を満たしています。");
