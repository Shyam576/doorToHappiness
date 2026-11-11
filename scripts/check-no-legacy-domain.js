#!/usr/bin/env node
// Runs automatically after `next build` (see package.json's "postbuild" script).
// Fails the build if the old domain shows up anywhere in the static HTML output —
// the one place it's allowed to exist is next.config.js's redirect rules, which this
// script does not scan.
const fs = require('fs');
const path = require('path');

const LEGACY_DOMAIN = 'doortohappinessholidays';
const BUILD_DIR = path.join(process.cwd(), '.next', 'server', 'pages');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = walk(BUILD_DIR);

if (htmlFiles.length === 0) {
  console.error(
    `check-no-legacy-domain: found no .html files under ${BUILD_DIR} — did \`next build\` run first?`
  );
  process.exit(1);
}

const offenders = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(LEGACY_DOMAIN)) {
    offenders.push(path.relative(process.cwd(), file));
  }
}

if (offenders.length > 0) {
  console.error(
    `check-no-legacy-domain: found "${LEGACY_DOMAIN}" in ${offenders.length} built page(s):`
  );
  offenders.forEach((file) => console.error(`  - ${file}`));
  console.error(
    '\nThe canonical domain is dthholiday.com (via src/config/site.ts\'s SITE_URL). ' +
      'If this is a genuine new reference, use SITE_URL instead of hardcoding the old domain.'
  );
  process.exit(1);
}

console.log(
  `check-no-legacy-domain: OK — checked ${htmlFiles.length} built page(s), no "${LEGACY_DOMAIN}" found.`
);
