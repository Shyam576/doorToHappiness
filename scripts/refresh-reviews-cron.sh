#!/usr/bin/env bash
# Monthly automated refresh of the homepage's Google reviews. Runs on the
# production server via cron (see deploy docs). Fetches reviews, and only if
# testimonials.json actually changed does it commit, push, rebuild, and
# restart the app — a failed or no-op fetch leaves production untouched.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== $(date -u +%Y-%m-%dT%H:%M:%SZ) review refresh ==="

node scripts/fetch-google-reviews.js

if git diff --quiet -- src/data/testimonials.json; then
  echo "No review changes — skipping commit/rebuild/restart."
  exit 0
fi

git add src/data/testimonials.json
git commit -m "chore: refresh Google reviews (automated monthly)"
git push origin main

npm run build
pm2 restart doortohappiness-app

echo "Review refresh deployed successfully."
