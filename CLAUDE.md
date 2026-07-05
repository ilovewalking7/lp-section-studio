# CLAUDE.md — このリポジトリで作業する Claude への案内

このリポジトリには **Component Studio** が入っています。**260個以上の本番品質 React コンポーネント**を貯めた、自分専用のコンポーネント・ライブラリ（21st.dev / Magic の無料代替）です。
スタック: **Vite + React 18 + TypeScript(strict) + Tailwind CSS v3**。

UIを作る依頼（ページ・画面・セクション・カード等）を受けたら、**まず既存の260個から流用できないか確認**してください。ゼロから書く前に下記の手順で探します。

---

## 1. 既存コンポーネントを「探して使う」手順（重要）

1. **索引を読む**: `src/registry/manifest.ts` が全コンポーネントの索引です。各エントリは
   `{ id, path, name, category, description, tags?, level?, isNew? }`。
   依頼に合うものを **category / tags / name / description** で探します（例: 「料金表」→ category「価格・オファー」やタグ `pricing`）。
2. **ソースを読む**: 見つけたら `path`（例 `./demos/marketing/PricingTable.tsx`）→ 実ファイルは
   `src/registry/demos/<...>.tsx`。`Read` で開いて中身を確認します。
3. **使う / 流用する**: そのままコピー、または依頼に合わせて改変します。各ファイルは**自己完結**
   （`react` / `lucide-react` / `cn`(@/lib/utils) / `@/components/ui/*` のみ依存、外部画像なし）なので移植が容易。
4. **プレビューしたい時**: `npm run dev` → ブラウザでカテゴリ別に一覧・ライブプレビュー・コードコピーができます。

> ヒント: `grep` で素早く探せます。例: `rg -i "pricing|料金" src/registry/manifest.ts`

### カテゴリ（manifest の `category`）
機能別: 基本 / ヒーロー・LP / マーケティング / コンバージョン / 価格・オファー / オンボーディング /
ダッシュボード / AI・チャット / アプリUI / ナビゲーション / インタラクション / フォーム / コマース / 設定。
スタイルテーマ別（各12種）: 和風 / 洋風 / ミニマル / ブルータリスト / グラスモーフィズム /
レトロ・Y2K / ラグジュアリー / プレイフル / ニューモーフィズム / メンフィス / ダークテック / 北欧 / ボタニカル。

> 「上級(level: advanced)」コンポーネントには `principle`（心理学・マーケ・デザイン上の効く理由）が付いています。

---

## 2. 新しいコンポーネントを「追加する」手順

`src/registry/demos/<カテゴリ>/` に `.tsx` を1つ置くだけで自動的に一覧へ並びます（`import.meta.glob` で自動探索）。

```tsx
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マイカード",
  category: "マーケティング",     // 既存カテゴリ推奨（上のリスト）
  description: "説明文。",
  align: "center",               // "full"(全幅) | "center" | "start"
  tags: ["card", "marketing"],   // 任意
  isNew: true,                   // 任意
};

export default function MyCard() {
  return <div className="...">…</div>;
}
```

規約:
- 依存は `react` / `lucide-react` / `cn`(`@/lib/utils`) / `@/components/ui/*`（Button, Card系, Badge, Input, Switch）のみ。新規npm依存や外部画像URLは使わない。
- Tailwind のセマンティックトークン（`bg-background text-foreground bg-card bg-muted text-muted-foreground bg-primary ...`）でダーク/ライト両対応。テーマ系は自己完結の明示色でOK。
- strict TypeScript（未使用変数・`any` 不可）。
- 追加後は **`npm run manifest`**（または `npm run build`）で索引 `manifest.ts` を再生成 → 一覧に反映。

---

## 3. 構成とコマンド

- `src/registry/demos/<カテゴリ>/*.tsx` … 1ファイル=1コンポーネント（260個）
- `src/registry/manifest.ts` … 自動生成の索引（**探索はここから**）／`src/registry/index.ts` … 実行時レジストリ（遅延ロード）
- `src/components/ui/*` … 再利用UIプリミティブ（shadcn 規約）
- `public/r/*.json` … shadcn 互換の配信用（`npm run registry` で生成。他repoから `npx shadcn add <url>` 可）

```bash
npm install
npm run dev       # スタジオ起動（一覧・プレビュー・コピー）
npm run build     # 本番ビルド（manifest + registry 生成込み）
npm run manifest  # 索引だけ再生成（コンポーネント追加後）
npm run registry  # 配信用 JSON だけ生成
```

デプロイ手順（Cloudflare Pages + Access で Private 公開）は `docs/DEPLOY.md` を参照。

<!-- BOOST:BEGIN -->
# BOOST — frontier discipline for a single model

This repository runs **BOOST**: an operating discipline that gets
frontier-tier results out of a single session model (Claude Opus 4.8 or
Claude Sonnet 5) by substituting structure for raw one-shot ability —
decomposition, independent candidates, adversarial verification, and
closed-loop evidence. These rules are the mechanism, not style advice.
Follow them even when (especially when) you feel confident.

**Configuration:** `.claude/boost.config.json`. `activeProfile` selects the
parameter set tuned to the session model (`fable` = Fable 5 team mode —
the default; `opus` = Opus 4.8 standalone; `sonnet` = Sonnet 5 standalone).
Read it before the first T1+ task of the session; every parameter name used
below (`planCandidates`, `refuteVotes`, `maxUnverifiedSteps`, …) refers to
the active profile.

## 1. Classify every task FIRST

| Tier | Looks like | Protocol |
|------|-----------|----------|
| **T0** | Factual question answerable from context; one-line mechanical edit; zero blast radius | Answer / do it directly. No ceremony. |
| **T1** | Small well-specified change (roughly ≤2 files), or a question needing modest research | Inline loop: silent plan → act → verify → §3 self-review |
| **T2** | Multi-file feature, refactor, nontrivial bug, design question, any spec you had to interpret | `/boost-plan` → `/boost-build` → `/boost-review` → `/boost-verify` (bugs: `/boost-debug`; questions: `/boost-research`) |
| **T3** | Architecture decisions; security-sensitive; irreversible or hard to undo; "be thorough / audit"; correctness-critical | T2 protocol **plus** the `boost-judge-panel` workflow for the design and the `boost-adversarial-review` workflow before done |

Unsure between two tiers → take the higher one. A user saying "quick" does
not downgrade correctness-critical work.

## 2. Hard gates — non-negotiable

1. **No unverified "done".** Every completion claim carries evidence you
   observed this session (test output, executed command, screenshot).
   "It should work" is a finding, not a result.
2. **First draft ≠ final** for T2+. Something must have had a real chance to
   kill the work before you present it: a critic agent, refutation votes,
   or a failing-then-passing test.
3. **Small verified steps.** Never make more than `maxUnverifiedSteps`
   consecutive edit steps without a verification checkpoint (run the tests
   or the code you touched).
4. **Independent skepticism.** For T2+, at least one fresh-context agent
   (`boost-critic` / `boost-verifier`) must attack the result before you
   call it done. You may not act as your own only reviewer.
5. **Context hygiene.** Bulk reading goes to `boost-scout` agents; keep your
   own context for decisions. On long tasks keep a plan-and-progress file in
   the scratchpad and re-read it every few packets so drift cannot
   accumulate.
6. **Honest reporting.** Failures, skipped steps, and unknowns are reported
   as such — never rounded up to success.

## 3. Self-review (end of every T1+ turn, 60 seconds)

Answer these against your actual output before ending the turn:

- Re-read the original request. List every explicit requirement and the
  implicit ones (error handling, tests, docs, existing conventions). Is each
  either satisfied or explicitly flagged as not done?
- What is the strongest concrete input or scenario that breaks this?
  Try it, or state precisely why it cannot happen.
- Did I verify by observation, or am I inferring? If inferring — go verify.
- Would a reviewer reading only the diff understand it? If not, fix the
  code, not the explanation.

## 4. Escalation levers (cheap relative to rework — use freely)

- Same failure twice → stop patching symptoms; run the `/boost-debug`
  hypothesis protocol.
- Wide solution space → `boost-judge-panel` workflow
  (`Workflow {name: "boost-judge-panel", args: {task: "…", candidates:
  <planCandidates>, judges: <judges>, effort: <hardStepEffort>}}` — always
  pass the profile values; workflows cannot read the config themselves).
- The answer matters and sources conflict → derive it twice via independent
  routes and reconcile before answering (`/boost-research`).
- About to assert a fact about this codebase → cite the `file:line` you
  actually read this session.

## 5. Team mode (profile `fable`, `mode: "team"`) — the default

When the active profile's `mode` is `team` (session model Fable 5) and the
task is a T2/T3 **build** (app, SaaS, feature, refactor), follow
`/boost-team` role routing by default, per the profile's `roles` map:

- **Plan / ideas / decisions** — you, the session model (Fable 5). Never
  delegated.
- **Implementation** — `boost-builder` agents spawned with
  `model: "sonnet"`, one work packet each.
- **Code check** — `boost-critic` / `boost-verifier` agents spawned with
  `model: "opus"`; `boost-adversarial-review` invoked with
  `args.model: "opus"`.

All hard gates (§2) and the evidence standard apply unchanged. If a role's
model is unavailable, fall back to the session model for that role and say
so in the report. Under `mode: "single"` profiles (`opus`/`sonnet`), never
spawn agents with model overrides — the standalone-model premise is the
point of those profiles.
<!-- BOOST:END -->
