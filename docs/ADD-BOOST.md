# BOOST を既存リポジトリに「上書きせず共存」で追加する指示書

すでに別のツール（Component Studio / crawler / SaaS 実装など）が入っている
リポジトリに、BOOST フレームワークを **既存を1つも壊さず共存**で追加する手順です。

> BOOST 自体の説明は [`docs/BOOST.md`](./BOOST.md)。ここでは「安全に足す」方法だけ扱います。

---

## 安全保証（インストーラが強制）

`scripts/install-boost.sh` は「上書きしない」を**ツール側で担保**します:

- **書き込み前に全検証**。CLAUDE.md マーカー・settings.json の JSON 妥当性（`node` がある時）・
  衝突を先に確認し、問題があれば**1バイトも書かずに中断**（部分インストールを残さない）。
- **衝突は既定で拒否**。ターゲットに BOOST と同名のファイル
  （`docs/BOOST.md`・`.claude/skills/boost*`・`agents/boost-*.md`・`workflows/boost-*.js`・
  `hooks/boost-profile.sh`）が既にあり、かつ **BOOST 既導入でない**（`.claude/boost.config.json`
  が無い）場合、上書きせず理由を表示して終了。
  意図的に上書きするなら `FORCE=1`（その場合、対象を `.boost-backup-<日時>/` に**退避してから**上書き）。
- `boost.config.json` は**絶対に上書きしない**（プロファイル引数を渡した時だけ `activeProfile` を書換）。
- `CLAUDE.md` は `<!-- BOOST:BEGIN/END -->` の**マーカー間だけ**を追記/更新。

## 追加・変更されるもの（正確な一覧）

| 対象 | 挙動 |
|---|---|
| `.claude/skills/boost*`（8）・`agents/boost-*.md`（5）・`workflows/boost-*.js`（3）・`hooks/boost-profile.sh` | 追加（同名の非BOOSTファイルがあれば拒否/FORCEで退避後上書き） |
| `.claude/boost.config.json` | 無ければ追加。既存は保持（profile 引数時のみ `activeProfile` 書換） |
| **`docs/BOOST.md`** | 追加（同名既存があれば拒否/FORCEで退避後上書き） |
| `CLAUDE.md` | マーカー間のみ追記/更新。マーカー外の本文は保持。無ければ BOOST ブロックだけで新規作成 |
| `.claude/settings.json` | SessionStart に `boost-profile.sh` を**追記**（既存フック・`enabledPlugins`・マーケットプレイス保持）。**既存 settings.json への追記は `node` が必要**（無い場合は追記されず手動手順を表示） |

冪等（BOOST 既導入なら何度でも安全に更新）。**この app-035 自身がこの方法で BOOST を
共存追加した実例**です（Component Studio + crawler と同居）。

---

## 手順 A — Claude Code セッションで（推奨）

対象リポジトリの Claude セッションに、次を貼り付けます。`<PROFILE>` は回すモデルに合わせます
（**フロンティア（Fable 5）が主なら `fable`**、Opus 4.8 単体なら `opus`、Sonnet 5 単体なら `sonnet`）。

```text
このリポジトリに BOOST を「既存ツールを上書きせず共存」で追加して。手順:

1. ilovewalking7/app-035 をこのセッションに add_repo してクローン（BOOST の実ファイルと
   install-boost.sh はそこにある）。
2. 実行: bash /workspace/app-035/scripts/install-boost.sh <このリポジトリの絶対パス> <PROFILE>
   - "REFUSING to overwrite" が出たら、列挙された既存ファイルは BOOST と同名の別物。中断して
     内容を確認し、私（ユーザー）に報告すること（勝手に FORCE=1 しない）。
3. 下の「検証チェックリスト」を全項目実施。1つでも既存が壊れていたらコミットせず中止して報告。
4. 問題なければ専用ブランチにコミットしてドラフト PR。src/ やアプリ本体のコードには触れない。
```

## 手順 B — 端末で（CLI）

```bash
bash /path/to/app-035/scripts/install-boost.sh /path/to/target-repo fable
#   3引数目: fable(フロンティア/チームモード) | opus | sonnet
#   衝突を承知で上書きするときだけ: FORCE=1 bash ... （退避後に上書き）
```

---

## 検証チェックリスト（インストール後に必ず）

- [ ] インストーラが `[boost] done.` を出している（＝フック登録済み）。`[boost] PARTIAL:` の場合は
      `node` が無く**フックが未登録**なので、表示された手動手順で `settings.json` に追記する。
      （`FORCE=1` 実行時は `done.` の後に `[boost] NOTE: ... backed up ...` が続くことがある）
- [ ] `git status --short` の変更が次のみ:
      **変更** = `CLAUDE.md`, `.claude/settings.json`／
      **新規** = `.claude/skills/boost*`, `.claude/agents/boost-*.md`, `.claude/workflows/boost-*.js`,
      `.claude/hooks/boost-profile.sh`, `.claude/boost.config.json`, **`docs/BOOST.md`**。
      `src/` やアプリのソース・ビルド設定に変更が**無い**こと。
      （元々 `CLAUDE.md` や `.claude/settings.json` が無かった repo では、それらも「新規」として現れる）
- [ ] 既存の `.claude/skills/` が**全て残っている**（`ls .claude/skills`）。
- [ ] `CLAUDE.md` に**元の本文**と `BOOST:BEGIN`/`BOOST:END` の**両方**があり、BOOST ブロックは**1つだけ**。
- [ ] `.claude/settings.json` が**有効 JSON**で、**既存フック**と `boost-profile.sh` の両方、
      `enabledPlugins`／マーケットプレイスが保持されている:
      ```bash
      node -e "const s=require('./.claude/settings.json');const h=JSON.stringify(s.hooks);\
      console.log('json ok; boost hook:',h.includes('boost-profile.sh'),\
      '; plugins:',Object.keys(s.enabledPlugins||{}).length)"
      ```
- [ ] `.claude/boost.config.json` の `activeProfile` が意図どおり（`fable` など）。
- [ ] `.boost-backup-*/` ディレクトリが**無い**（あれば FORCE で何かを退避＝上書きしている。中身を確認）。

## 取り消し（未コミット時）

すべて未コミットなので、次で元に戻せます。**`docs/BOOST.md` を含める**のが要点:

```bash
# 1) 元々あった CLAUDE.md / settings.json は変更を破棄
git checkout -- CLAUDE.md .claude/settings.json 2>/dev/null || true
#    ↑ これらが「新規作成」だった repo では上記は効かないので代わりに削除:
#    （新規だったファイルだけ）rm -f CLAUDE.md .claude/settings.json
# 2) 追加された BOOST 一式を削除（docs/BOOST.md も忘れずに）
rm -rf .claude/skills/boost* .claude/agents/boost-*.md .claude/workflows/boost-*.js \
       .claude/hooks/boost-profile.sh .claude/boost.config.json docs/BOOST.md
# 3) BOOST 既導入に profile 付きで再実行し activeProfile が書き換わった場合のみ:
git checkout -- .claude/boost.config.json 2>/dev/null || true
```

> ⚠️ 上記の `rm -rf` は**初回追加でまだコミットしていない**場合の手順です。BOOST を**既にコミット済み**の
> リポジトリで冪等再実行した後にこれをそのまま実行すると、**コミット済みの BOOST ファイルまで削除**されます。
> その場合は削除ではなく `git restore -- <対象パス>`（または `git checkout <直前のコミット> -- <対象パス>`）で戻してください。
>
> `git status` で意図しない残りが無いか最後に確認してください。

---

## 補足

- **プロファイルはリポジトリごとに変更可**。フロンティア（Fable 5）中心なら `fable`
  （計画=Fable 5 / 実装=Sonnet 5 / チェック=Opus 4.8 のチームモード）。
- **既存 `settings.json` への追記には `node` が必要**。Claude Code on the web の環境には node が
  あるので通常問題なし。`PARTIAL` が出たら手動追記を。
- すでに別テンプレートで**内容を上書きしてしまった**リポジトリは、上書き前の内容が **git 履歴に残存**
  （`git log` / `git show <sha>:<path>`）。必要なら復元可能。
- BOOST は `.claude/` と `CLAUDE.md`／`docs/BOOST.md` の追加のみで、**アプリのビルド/テストには影響しません**。
