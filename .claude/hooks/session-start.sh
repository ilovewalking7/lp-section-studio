#!/bin/bash
# SessionStart hook — prepares this repository for remote development in Claude Code on
# the web. Installs dependencies for whatever manifests are present so linters
# and tests are ready when the session starts. Idempotent; safe to re-run.
set -euo pipefail

# Only run inside Claude Code on the web (remote) sessions.
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

if [ -f package.json ]; then
  echo "[session-start] Installing npm dependencies"
  npm install
fi

# crawler/ (research-crawler) is a self-contained sub-project with its own deps.
# Install them here so the Crawlee tool is ready without a manual step. Tolerate
# failure (e.g. restricted egress) so it never blocks the session.
if [ -f crawler/package.json ]; then
  echo "[session-start] Installing crawler dependencies"
  ( cd crawler && npm install ) || echo "[session-start] crawler npm install skipped/failed (continuing)"
fi

if [ -f requirements.txt ]; then
  echo "[session-start] Installing Python dependencies (requirements.txt)"
  pip install -r requirements.txt
fi

if [ -f pyproject.toml ]; then
  echo "[session-start] Installing Python project (pyproject.toml)"
  pip install -e . 2>/dev/null || pip install .
fi

echo "[session-start] repository ready for remote development"
