#!/usr/bin/env bash
# Install (or update) the BOOST framework in another repository — non-destructively.
#
#   usage: scripts/install-boost.sh /path/to/target-repo [fable|opus|sonnet]
#          FORCE=1 scripts/install-boost.sh /path/to/target-repo [profile]  # overwrite collisions (backed up first)
#
# Adds boost-prefixed skills/agents/workflows + hook + config + docs/BOOST.md,
# installs/refreshes the marker-delimited BOOST block in CLAUDE.md, and registers
# the SessionStart hook in .claude/settings.json (via node when available).
#
# SAFETY (coexistence guarantees):
#   * ALL validation runs BEFORE any file is written — an abort never leaves a
#     partial install.
#   * Refuses to overwrite pre-existing files that collide with BOOST names
#     (docs/BOOST.md, .claude/skills/boost*, agents/boost-*.md, workflows/boost-*.js,
#     hooks/boost-profile.sh) UNLESS the target is a prior BOOST install
#     (recognised by .claude/boost.config.json) or FORCE=1 is set — in which case
#     each colliding path is backed up to .boost-backup-<ts>/ before overwrite.
#   * boost.config.json is never clobbered (only activeProfile is rewritten, and
#     only when a profile argument is passed).
#   * CLAUDE.md is only touched between the <!-- BOOST:BEGIN/END --> markers;
#     malformed/mis-ordered markers abort before any write.
set -euo pipefail

TARGET="${1:?usage: install-boost.sh /path/to/target-repo [fable|opus|sonnet]}"
PROFILE="${2:-}"
FORCE="${FORCE:-}"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

[ -d "$TARGET" ] || { echo "[boost] target not found: $TARGET" >&2; exit 1; }
TARGET="$(cd "$TARGET" && pwd)"
case "$PROFILE" in ""|fable|opus|sonnet) ;; *) echo "[boost] unknown profile: $PROFILE (want fable|opus|sonnet)" >&2; exit 1 ;; esac

BEGIN='<!-- BOOST:BEGIN -->'
END='<!-- BOOST:END -->'
HOOK_CMD='$CLAUDE_PROJECT_DIR/.claude/hooks/boost-profile.sh'

# A prior BOOST install (its own boost files are ours to refresh/overwrite safely).
PRIOR_BOOST=false
[ -f "$TARGET/.claude/boost.config.json" ] && PRIOR_BOOST=true

# ===========================================================================
# PRE-FLIGHT — no writes. Decide actions and abort on any unsafe condition.
# ===========================================================================

# 1) CLAUDE.md markers: decide create/append/refresh, or abort if malformed.
CLAUDE_ACTION="create"
if [ -f "$TARGET/CLAUDE.md" ]; then
  nb=$(grep -cxF "$BEGIN" "$TARGET/CLAUDE.md" || true)
  ne=$(grep -cxF "$END" "$TARGET/CLAUDE.md" || true)
  if [ "$nb" = 0 ] && [ "$ne" = 0 ]; then
    CLAUDE_ACTION="append"
  elif [ "$nb" = 1 ] && [ "$ne" = 1 ]; then
    bl=$(grep -nxF "$BEGIN" "$TARGET/CLAUDE.md" | head -1 | cut -d: -f1)
    el=$(grep -nxF "$END" "$TARGET/CLAUDE.md" | head -1 | cut -d: -f1)
    if [ "$bl" -lt "$el" ]; then
      CLAUDE_ACTION="refresh"
    else
      echo "[boost] ERROR: CLAUDE.md BOOST markers are out of order (END before BEGIN). Fix and re-run; nothing changed." >&2
      exit 1
    fi
  else
    echo "[boost] ERROR: CLAUDE.md has malformed BOOST markers (need exactly one BEGIN then one END; found BEGIN=$nb END=$ne). Fix and re-run; nothing changed." >&2
    exit 1
  fi
fi

# 2) settings.json must be valid JSON if we will edit it with node.
if [ -f "$TARGET/.claude/settings.json" ] && ! grep -qF 'boost-profile.sh' "$TARGET/.claude/settings.json"; then
  if command -v node >/dev/null 2>&1; then
    node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$TARGET/.claude/settings.json" >/dev/null 2>&1 \
      || { echo "[boost] ERROR: $TARGET/.claude/settings.json is not valid JSON. Fix it and re-run; nothing changed." >&2; exit 1; }
  fi
fi

# 3) Collision scan — never clobber non-BOOST files silently.
collisions=()
for d in "$SRC"/.claude/skills/boost*/; do
  [ -e "$d" ] || continue
  [ -e "$TARGET/.claude/skills/$(basename "$d")" ] && collisions+=(".claude/skills/$(basename "$d")")
done
for f in "$SRC"/.claude/agents/boost-*.md; do
  [ -e "$f" ] || continue
  [ -e "$TARGET/.claude/agents/$(basename "$f")" ] && collisions+=(".claude/agents/$(basename "$f")")
done
for f in "$SRC"/.claude/workflows/boost-*.js; do
  [ -e "$f" ] || continue
  [ -e "$TARGET/.claude/workflows/$(basename "$f")" ] && collisions+=(".claude/workflows/$(basename "$f")")
done
[ -e "$TARGET/.claude/hooks/boost-profile.sh" ] && collisions+=(".claude/hooks/boost-profile.sh")
[ -e "$TARGET/docs/BOOST.md" ] && collisions+=("docs/BOOST.md")

BACKUP_DIR=""
if [ "${#collisions[@]}" -gt 0 ] && [ "$PRIOR_BOOST" = false ]; then
  if [ -z "$FORCE" ]; then
    echo "[boost] REFUSING to overwrite: the target already has files that collide with BOOST names," >&2
    echo "        and this is not a prior BOOST install (no .claude/boost.config.json):" >&2
    for c in "${collisions[@]}"; do echo "          - $c" >&2; done
    echo "        Rename/remove them, or re-run with FORCE=1 to overwrite (each is backed up first). Nothing changed." >&2
    exit 1
  fi
  BACKUP_DIR=".boost-backup-$(date +%Y%m%d-%H%M%S)"
  echo "[boost] FORCE set — backing up ${#collisions[@]} colliding path(s) to $BACKUP_DIR/ before overwrite"
  for c in "${collisions[@]}"; do
    mkdir -p "$TARGET/$BACKUP_DIR/$(dirname "$c")"
    cp -R "$TARGET/$c" "$TARGET/$BACKUP_DIR/$c"
  done
fi

echo "[boost] installing $SRC -> $TARGET  (CLAUDE.md: $CLAUDE_ACTION; prior-boost: $PRIOR_BOOST)"

# ===========================================================================
# INSTALL — writes begin here; the pre-flight guarantees no silent clobber.
# ===========================================================================
mkdir -p "$TARGET/.claude/skills" "$TARGET/.claude/agents" "$TARGET/.claude/workflows" "$TARGET/.claude/hooks" "$TARGET/docs"

for d in "$SRC"/.claude/skills/boost*/; do
  [ -e "$d" ] || continue
  dest="$TARGET/.claude/skills/$(basename "$d")"
  rm -rf "$dest"; cp -R "$d" "$dest"
done
cp "$SRC"/.claude/agents/boost-*.md "$TARGET/.claude/agents/"
cp "$SRC"/.claude/workflows/boost-*.js "$TARGET/.claude/workflows/"
cp "$SRC"/.claude/hooks/boost-profile.sh "$TARGET/.claude/hooks/"
chmod +x "$TARGET/.claude/hooks/boost-profile.sh"
cp "$SRC"/docs/BOOST.md "$TARGET/docs/BOOST.md"

if [ ! -f "$TARGET/.claude/boost.config.json" ]; then
  cp "$SRC/.claude/boost.config.json" "$TARGET/.claude/boost.config.json"
  echo "[boost] created .claude/boost.config.json"
fi
if [ -n "$PROFILE" ]; then
  tmp="$(mktemp)"
  sed 's/"activeProfile"[[:space:]]*:[[:space:]]*"[^"]*"/"activeProfile": "'"$PROFILE"'"/' \
    "$TARGET/.claude/boost.config.json" > "$tmp" && mv "$tmp" "$TARGET/.claude/boost.config.json"
  echo "[boost] activeProfile set to: $PROFILE"
fi
if ! grep -q '"fable"' "$TARGET/.claude/boost.config.json"; then
  echo "[boost] NOTE: existing boost.config.json predates team mode (no 'fable' profile)."
  echo "        Copy the 'fable' profile block from $SRC/.claude/boost.config.json if you want team mode."
fi

# --- CLAUDE.md (action decided in pre-flight) ---
extract_block() { awk -v b="$BEGIN" -v e="$END" '$0==b{f=1} f{print} $0==e{f=0}' "$1"; }
case "$CLAUDE_ACTION" in
  create)
    extract_block "$SRC/CLAUDE.md" > "$TARGET/CLAUDE.md"
    echo "[boost] created CLAUDE.md" ;;
  append)
    { echo ""; extract_block "$SRC/CLAUDE.md"; } >> "$TARGET/CLAUDE.md"
    echo "[boost] appended BOOST block to CLAUDE.md" ;;
  refresh)
    blockfile="$(mktemp)"; extract_block "$SRC/CLAUDE.md" > "$blockfile"
    awk -v b="$BEGIN" -v e="$END" -v bf="$blockfile" '
      $0==b { skip=1; while ((getline line < bf) > 0) print line; close(bf); next }
      $0==e { skip=0; next }
      !skip { print }
    ' "$TARGET/CLAUDE.md" > "$TARGET/CLAUDE.md.tmp" && mv "$TARGET/CLAUDE.md.tmp" "$TARGET/CLAUDE.md"
    rm -f "$blockfile"
    echo "[boost] refreshed BOOST block in CLAUDE.md" ;;
esac

# --- settings.json: register SessionStart hook; track whether it happened ---
HOOK_OK=false
if [ ! -f "$TARGET/.claude/settings.json" ]; then
  cat > "$TARGET/.claude/settings.json" <<'JSON'
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/boost-profile.sh"
          }
        ]
      }
    ]
  }
}
JSON
  HOOK_OK=true
  echo "[boost] created .claude/settings.json with SessionStart hook"
elif grep -qF 'boost-profile.sh' "$TARGET/.claude/settings.json"; then
  HOOK_OK=true
  echo "[boost] SessionStart hook already registered"
elif command -v node >/dev/null 2>&1; then
  node - "$TARGET/.claude/settings.json" <<'NODE'
const fs = require('fs');
const p = process.argv[2];
const s = JSON.parse(fs.readFileSync(p, 'utf8'));
s.hooks = s.hooks || {};
s.hooks.SessionStart = s.hooks.SessionStart || [];
s.hooks.SessionStart.push({ hooks: [{ type: 'command', command: '$CLAUDE_PROJECT_DIR/.claude/hooks/boost-profile.sh' }] });
fs.writeFileSync(p, JSON.stringify(s, null, 2) + '\n');
NODE
  HOOK_OK=true
  echo "[boost] SessionStart hook registered in settings.json"
else
  echo "[boost] WARNING: node not found — the SessionStart hook was NOT registered." >&2
  echo "        Add it manually to $TARGET/.claude/settings.json:" >&2
  echo "          hooks.SessionStart[].hooks += {\"type\":\"command\",\"command\":\"$HOOK_CMD\"}" >&2
fi

# --- final status (honest about whether BOOST will actually activate) ---
if [ "$HOOK_OK" = true ]; then
  echo "[boost] done. activeProfile in .claude/boost.config.json controls the mode (fable = Fable 5 team mode [default], opus/sonnet = standalone). Commit, and every new session in the target runs under BOOST."
else
  echo "[boost] PARTIAL: boost files are installed, but the SessionStart hook is NOT active (node missing). BOOST will not auto-activate until you add the hook (above) or install node and re-run."
fi
if [ -n "$BACKUP_DIR" ]; then
  echo "[boost] NOTE: overwritten files were backed up to $BACKUP_DIR/ — delete it once you've confirmed the result."
fi
exit 0
