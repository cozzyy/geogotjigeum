#!/usr/bin/env node
/*
 * Issue #42 P0 — Work Detail global regression validator.
 *
 * Scans every generated Work Detail page (site/works, site/en/works,
 * site/ja/works, site/zh/works) and FAILs the build if any of the
 * following P0 symptoms are found:
 *
 *   1. literal "undefined" rendered into visible content
 *   2. literal "null" rendered into visible content
 *   3. literal "[object Object]" rendered into visible content
 *   4. invalid cast character count — "(N명 중 M명)"-style heading with
 *      unparseable numbers, or total < shown
 *   5. TOP5 카드에 장소명 누락 — a .top5Card with an empty <h3></h3>
 *   6. 전체 장소 카드에 제목 누락 — a .locCard with an empty <h3></h3>
 *   7. "relation badge only" — a card that renders only its tier badge,
 *      with both title and description empty (the exact Issue #42 symptom)
 *
 * Pure Node, no dependencies (matches the rest of this pipeline — no
 * DOM parser is installed and none is available offline). Regex/string
 * based, scoped to avoid false positives from JSON-LD <script> blocks.
 *
 * Usage: node validate_work_pages.js <site-dir>
 * Exit code: 0 = all pages pass. 1 = one or more failures (also prints
 * a full failure report to stdout).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SITE_DIR = process.argv[2] || '.';
const LOCALE_DIRS = [
  { locale: 'ko', dir: path.join(SITE_DIR, 'works') },
  { locale: 'en', dir: path.join(SITE_DIR, 'en', 'works') },
  { locale: 'ja', dir: path.join(SITE_DIR, 'ja', 'works') },
  { locale: 'zh', dir: path.join(SITE_DIR, 'zh', 'works') },
];

function listWorkPages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => path.join(dir, e.name, 'index.html'))
    .filter(p => fs.existsSync(p));
}

// Strip <script>...</script> blocks (JSON-LD legitimately contains
// "null" as a JSON literal, e.g. "author":null — must not false-positive).
function stripScripts(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function extractCards(html, className) {
  // Matches `<div class="X">...</div>` blocks non-greedily, one level deep
  // (no nested .card divs in this template, so this is safe).
  const re = new RegExp(`<div class="${className}"[^>]*>([\\s\\S]*?)</div>\\s*</div>`, 'g');
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

function checkFile(filePath, locale) {
  const failures = [];
  const raw = fs.readFileSync(filePath, 'utf8');
  const body = stripScripts(raw);

  if (/\bundefined\b/.test(body)) {
    const idx = body.indexOf('undefined');
    failures.push(`literal "undefined" found in rendered content (…${body.slice(Math.max(0, idx - 40), idx + 20).replace(/\s+/g, ' ')}…)`);
  }
  if (/\bnull\b/.test(body)) {
    const idx = body.search(/\bnull\b/);
    failures.push(`literal "null" found in rendered content (…${body.slice(Math.max(0, idx - 40), idx + 20).replace(/\s+/g, ' ')}…)`);
  }
  if (body.indexOf('[object Object]') !== -1) {
    failures.push('literal "[object Object]" found in rendered content');
  }

  // Cast heading character-count sanity: "(N명 중 M명)" / "(N名中M名)" /
  // "(共N位中M位)" — the three locale patterns used by castHeading().
  const castHeadingMatch = body.match(/<h2>[^<]*\((\d+|undefined|NaN)(?:명|名|位)\s*(?:중|中|中)\s*(\d+|undefined|NaN)(?:명|名|位)\)<\/h2>/);
  if (castHeadingMatch) {
    const total = Number(castHeadingMatch[1]);
    const shown = Number(castHeadingMatch[2]);
    if (!Number.isFinite(total) || !Number.isFinite(shown)) {
      failures.push(`invalid character count in cast heading: total="${castHeadingMatch[1]}" shown="${castHeadingMatch[2]}"`);
    } else if (total < shown) {
      failures.push(`invalid character count in cast heading: total(${total}) < shown(${shown})`);
    }
  }

  // TOP5 cards: each .top5Card must have a non-empty <h3>.
  const top5Cards = extractCards(body, 'top5Card');
  top5Cards.forEach((card, i) => {
    const h3 = card.match(/<h3>([\s\S]*?)<\/h3>/);
    const h3Text = h3 ? h3[1].trim() : '';
    const p = card.match(/<p>([\s\S]*?)<\/p>/);
    const pText = p ? p[1].trim() : '';
    if (!h3Text) {
      if (!pText) {
        failures.push(`TOP5 card #${i + 1}: relation badge only — both place name and description are empty`);
      } else {
        failures.push(`TOP5 card #${i + 1}: place-name missing (empty <h3>)`);
      }
    }
  });

  // 전체 장소 목록 cards: each .locCard must have a non-empty <h3>.
  const locCards = extractCards(body, 'locCard');
  locCards.forEach((card, i) => {
    const h3 = card.match(/<h3>([\s\S]*?)<\/h3>/);
    const h3Text = h3 ? h3[1].trim() : '';
    const p = card.match(/<p>([\s\S]*?)<\/p>/);
    const pText = p ? p[1].trim() : '';
    if (!h3Text) {
      if (!pText) {
        failures.push(`location card #${i + 1}: relation badge only — both title and description are empty`);
      } else {
        failures.push(`location card #${i + 1}: title missing (empty <h3>)`);
      }
    }
  });

  return failures;
}

function main() {
  let totalFiles = 0;
  let failedFiles = 0;
  const report = [];

  LOCALE_DIRS.forEach(({ locale, dir }) => {
    const pages = listWorkPages(dir);
    pages.forEach(p => {
      totalFiles++;
      const failures = checkFile(p, locale);
      if (failures.length) {
        failedFiles++;
        report.push({ file: p, locale, failures });
      }
    });
  });

  console.log(`[validate_work_pages] scanned ${totalFiles} Work Detail pages across ${LOCALE_DIRS.length} locales.`);
  if (failedFiles === 0) {
    console.log(`[validate_work_pages] PASS — 0/${totalFiles} pages failed.`);
    process.exit(0);
  }

  console.log(`[validate_work_pages] FAIL — ${failedFiles}/${totalFiles} pages failed:\n`);
  report.forEach(r => {
    console.log(`  ${r.file} [${r.locale}]`);
    r.failures.forEach(f => console.log(`    - ${f}`));
  });
  process.exit(1);
}

main();
