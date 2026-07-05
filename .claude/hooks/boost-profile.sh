#!/bin/bash
# SessionStart hook — arms the BOOST framework by announcing the active
# profile into session context. Works alongside CLAUDE.md (the rules) and
# .claude/boost.config.json (the parameters). No dependencies beyond sed.
set -euo pipefail

cfg="${CLAUDE_PROJECT_DIR:-$(pwd)}/.claude/boost.config.json"
[ -f "$cfg" ] || exit 0

profile=$(sed -n 's/.*"activeProfile"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$cfg" | head -n 1)

echo "[boost] BOOST framework ACTIVE (profile: ${profile:-unset}). For every non-trivial task: classify T0-T3 per CLAUDE.md, read .claude/boost.config.json, and run the matching boost protocol (/boost routes). Never report work as done without verification evidence observed this session."
