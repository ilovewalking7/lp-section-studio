#!/usr/bin/env bash
#
# bootstrap-repos.sh
# Create N private repositories that reuse THIS repo's setup:
#   - Remote-dev config (claude-code-setup + ui-ux-pro-max + taste-skill plugins)
#   - Component Studio (260+ コンポーネント, manifest, CLAUDE.md, deploy docs)
#
# It clones the template repo (default: app-028, which contains the studio) and
# pushes its files into each new repo, personalizing repo-name references.
#
# Prerequisites (run where YOU are authenticated, e.g. your laptop):
#   - gh   (GitHub CLI, logged in: `gh auth login`)
#   - git, rsync, perl
#
# Usage:
#   ./bootstrap-repos.sh                       # creates app-029 .. app-038 (10 repos)
#   START=29 END=38 ./bootstrap-repos.sh
#   OWNER=ilovewalking7 TEMPLATE=ilovewalking7/app-028 ./bootstrap-repos.sh
#
set -euo pipefail

OWNER="${OWNER:-ilovewalking7}"
# 複製元（スタジオが入っているリポジトリ）。app-028 の main を雛形にする。
TEMPLATE="${TEMPLATE:-$OWNER/app-028}"
START="${START:-29}"         # app-029
END="${END:-38}"             # app-038  (inclusive) -> 10 repos
DESC="Component Studio (260+ コンポーネント) + remote-dev setup (claude-code-setup / ui-ux-pro-max / taste-skill)"

# 雛形側で repo 名として現れる文字列（これらを新しい repo 名へ置換する）
TEMPLATE_NAME="$(basename "$TEMPLATE")"   # 例: app-028

# --- prereq check ---
for bin in gh git rsync perl; do
  command -v "$bin" >/dev/null 2>&1 || { echo "ERROR: '$bin' is required but not installed." >&2; exit 1; }
done
gh auth status >/dev/null 2>&1 || { echo "ERROR: run 'gh auth login' first." >&2; exit 1; }

# --- fetch the template files once ---
SRC="$(mktemp -d)"
trap 'rm -rf "$SRC"' EXIT
echo ">> cloning template $TEMPLATE ..."
gh repo clone "$TEMPLATE" "$SRC" >/dev/null

# --- create each repo (private) and push the personalized config ---
for i in $(seq "$START" "$END"); do
  name="$(printf 'app-%03d' "$i")"
  echo ">> creating $OWNER/$name (private) ..."
  if gh repo view "$OWNER/$name" >/dev/null 2>&1; then
    echo "   skip: $OWNER/$name already exists"
    continue
  fi
  gh repo create "$OWNER/$name" --private --description "$DESC" >/dev/null

  work="$(mktemp -d)"
  rsync -a --exclude='.git' --exclude='node_modules' --exclude='dist' "$SRC"/ "$work"/

  # repo 名の参照を新しい repo 名へ置換（README / CLAUDE.md / wrangler.toml /
  # App.tsx / docs）。app-004（旧テンプレ名）と app-028（現テンプレ名）の両方を直す。
  for f in README.md CLAUDE.md wrangler.toml src/App.tsx docs/DEPLOY.md docs/DEPLOY-claude-in-chrome.md; do
    [ -f "$work/$f" ] || continue
    perl -pi -e "s/\bapp-004\b/$name/g; s/\b${TEMPLATE_NAME}\b/$name/g" "$work/$f"
  done

  (
    cd "$work"
    git init -q
    git add -A
    git commit -qm "Initialize from $TEMPLATE template (Component Studio + remote-dev)"
    git branch -M main
    git remote add origin "https://github.com/$OWNER/$name.git"
    git push -u origin main >/dev/null
  )
  rm -rf "$work"
  echo "   done: https://github.com/$OWNER/$name"
done

echo "All done."
echo "次の手順:"
echo "  - 各 repo で 'npm install && npm run dev' でスタジオが起動します。"
echo "  - Cloudflare へ Private 公開する場合は docs/DEPLOY.md（または DEPLOY-claude-in-chrome.md）参照。"
echo "  - wrangler.toml の name は <repo>-studio に置換済み。Pages プロジェクトもその名前で作るのが無難です。"
