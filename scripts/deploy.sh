#!/usr/bin/env bash
# FlexSpot 2.0 — deploy the Vite production build to the `gh-pages` branch.
#
# Usage:
#   npm run deploy        # builds, then publishes dist/ to gh-pages
#
# After the first deploy, make sure GitHub Pages is set to serve from
# the `gh-pages` branch: repo → Settings → Pages → Deploy from branch.
# Live URL: https://dawoodshah2232-svg.github.io/flexspot-2.0/
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# 1. Build
npm run build

# 2. Add SPA fallback + bypass Jekyll processing
cp public/404.html dist/404.html
touch dist/.nojekyll

# 3. Publish dist/ to gh-pages
DEPLOY_DIR="$(mktemp -d)/ghpages"
trap 'rm -rf "$DEPLOY_DIR"' EXIT

git worktree add "$DEPLOY_DIR" gh-pages 2>/dev/null || {
  echo "gh-pages branch does not exist yet — creating it."
  git checkout --orphan gh-pages
  git rm -rf . >/dev/null 2>&1 || true
  git commit --allow-empty -m "init gh-pages"
  git push origin gh-pages
  git checkout main
  git worktree add "$DEPLOY_DIR" gh-pages
}

# Clear old deploy output, keeping the worktree's .git intact
find "$DEPLOY_DIR" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -a dist/. "$DEPLOY_DIR"/

cd "$DEPLOY_DIR"
git add -A
if git diff --cached --quiet; then
  echo "No changes to deploy."
else
  git commit -m "deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push origin gh-pages
  echo "Deployed → https://dawoodshah2232-svg.github.io/flexspot-2.0/"
fi

cd "$ROOT"
git worktree remove --force "$DEPLOY_DIR"
