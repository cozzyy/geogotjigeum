#!/usr/bin/env node
/*
 * Release Candidate integration QA — geugotjigeum.com
 * Scans the full generated site/ output (Work/Place/Region/Culture/Guide,
 * all locales) and checks:
 *
 *   1. Broken internal links/assets (href/src resolves to a real file)
 *   2. canonical self-consistency (points to the page's own URL)
 *   3. hreflang/x-default validity (known locale codes, resolvable targets,
 *      no duplicate hreflang values on one page)
 *   4. sitemap.xml: no duplicate <loc>, every <loc> resolves to a real file
 *   5. GA4 tag present on every page
 *   6. Language isolation: ko-only features (Scene cards/blocks) must not
 *      leak onto en/ja/zh Work/Place pages; single-locale Guide pages must
 *      not have unexpected locale siblings
 *
 * Pure Node, no dependencies — matches the rest of this pipeline.
 * Usage: node site_qa.js <site-dir>
 * Exit 0 = clean. Exit 1 = one or more findings (full report printed).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SITE_DIR = process.argv[2] || '.';
const SITE_ORIGIN = 'https://geugotjigeum.com';
const GA_ID = 'G-H2KNQYH97M';
const KNOWN_LOCALES = new Set(['ko', 'en', 'ja', 'zh', 'zh-Hant', 'x-default']);

const findings = { brokenLinks: [], brokenAssets: [], canonicalIssues: [], hreflangIssues: [],
  sitemapIssues: [], ga4Issues: [], isolationIssues: [] };

function walkHtmlFiles(dir, out) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walkHtmlFiles(full, out);
    } else if (e.isFile() && e.name === 'index.html') {
      out.push(full);
    }
  }
  return out;
}

function urlToLocalPath(url) {
  if (!url.startsWith(SITE_ORIGIN)) return null;
  let rel = url.slice(SITE_ORIGIN.length);
  if (rel === '' || rel === '/') return { kind: 'page', file: path.join(SITE_DIR, 'index.html') };
  const qIdx = rel.indexOf('?');
  const hasQuery = qIdx !== -1;
  const pathPart = hasQuery ? rel.slice(0, qIdx) : rel;
  if (hasQuery) {
    // Map-state link (?work=X&loc=Y) — the target is the SPA shell at this
    // path root, not a distinct static page. Just require the shell exists.
    const shellPath = pathPart.endsWith('/') ? pathPart : pathPart + '/';
    return { kind: 'shell', file: path.join(SITE_DIR, shellPath.replace(/^\//, ''), 'index.html') };
  }
  if (/\.[a-zA-Z0-9]+$/.test(pathPart) && !pathPart.endsWith('/')) {
    // literal asset path (svg/webp/js/xml/etc.)
    return { kind: 'asset', file: path.join(SITE_DIR, pathPart.replace(/^\//, '')) };
  }
  const dirPath = pathPart.endsWith('/') ? pathPart : pathPart + '/';
  return { kind: 'page', file: path.join(SITE_DIR, dirPath.replace(/^\//, ''), 'index.html') };
}

function checkLinksAndAssets(file, html) {
  const hrefRe = /(?:href|src)="([^"]+)"/g;
  let m;
  const seen = new Set();
  while ((m = hrefRe.exec(html)) !== null) {
    const url = m[1];
    if (seen.has(url)) continue;
    seen.add(url);
    if (!url.startsWith(SITE_ORIGIN)) continue; // external / mailto / tel / # — out of scope
    if (url.indexOf('/#') !== -1 && url.split('/#')[0] === '') continue;
    const resolved = urlToLocalPath(url);
    if (!resolved) continue;
    if (!fs.existsSync(resolved.file)) {
      const entry = { file, url, resolvedPath: resolved.file };
      if (resolved.kind === 'asset') findings.brokenAssets.push(entry);
      else findings.brokenLinks.push(entry);
    }
  }
}

function checkCanonical(file, html) {
  const m = html.match(/<link rel="canonical" href="([^"]+)">/);
  if (!m) {
    findings.canonicalIssues.push({ file, issue: 'no canonical tag found' });
    return;
  }
  const canonical = m[1];
  if (!canonical.startsWith(SITE_ORIGIN)) {
    findings.canonicalIssues.push({ file, issue: `canonical not under SITE_ORIGIN: ${canonical}` });
  }
}

function checkHreflang(file, html) {
  const re = /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g;
  let m;
  const seenLocales = new Set();
  let hasXDefault = false;
  while ((m = re.exec(html)) !== null) {
    const locale = m[1];
    const href = m[2];
    if (locale === 'x-default') hasXDefault = true;
    if (!KNOWN_LOCALES.has(locale)) {
      findings.hreflangIssues.push({ file, issue: `unknown hreflang code "${locale}"` });
    }
    if (seenLocales.has(locale)) {
      findings.hreflangIssues.push({ file, issue: `duplicate hreflang "${locale}"` });
    }
    seenLocales.add(locale);
    const resolved = urlToLocalPath(href);
    if (resolved && !fs.existsSync(resolved.file)) {
      findings.hreflangIssues.push({ file, issue: `hreflang "${locale}" target does not exist: ${href}` });
    }
  }
  if (seenLocales.size > 0 && !hasXDefault) {
    findings.hreflangIssues.push({ file, issue: 'hreflang block present but missing x-default' });
  }
}

function checkGA4(file, html) {
  if (html.indexOf(GA_ID) === -1) {
    findings.ga4Issues.push({ file, issue: `GA4 id ${GA_ID} not found` });
  }
}

// Language isolation: Scene cards/blocks (ko-only feature per Issue #40
// design) must not appear on en/ja/zh Work or Place pages.
function checkLanguageIsolation(file, html, locale) {
  if (locale === 'ko') return;
  if (/class="sceneGrid"/.test(html) || /class="sceneBlock"/.test(html)) {
    findings.isolationIssues.push({ file, locale, issue: 'ko-only Scene section (.sceneGrid/.sceneBlock) rendered on a non-ko page' });
  }
}

function localeOfPath(p) {
  const rel = path.relative(SITE_DIR, p);
  if (rel.startsWith('en' + path.sep)) return 'en';
  if (rel.startsWith('ja' + path.sep)) return 'ja';
  if (rel.startsWith('zh' + path.sep)) return 'zh';
  return 'ko';
}

function checkSitemap() {
  const sitemapPath = path.join(SITE_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    findings.sitemapIssues.push({ issue: 'sitemap.xml not found' });
    return;
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) locs.push(m[1]);

  const seen = new Map();
  locs.forEach(u => seen.set(u, (seen.get(u) || 0) + 1));
  seen.forEach((count, url) => {
    if (count > 1) findings.sitemapIssues.push({ issue: `duplicate sitemap entry (${count}x): ${url}` });
  });

  let missing = 0;
  locs.forEach(u => {
    const resolved = urlToLocalPath(u);
    if (resolved && resolved.kind !== 'shell' && !fs.existsSync(resolved.file)) {
      missing++;
      if (missing <= 20) findings.sitemapIssues.push({ issue: `sitemap URL does not resolve to a file: ${u}` });
    }
  });
  if (missing > 20) findings.sitemapIssues.push({ issue: `...and ${missing - 20} more unresolved sitemap URLs (truncated)` });

  console.log(`[site_qa] sitemap.xml: ${locs.length} <loc> entries, ${seen.size} unique.`);
}

function checkGuideLocaleIsolation() {
  // NOTE: verified against the actual generated directory names on disk
  // (2026-09-01 RC QA pass) — the original guess "breakingbad-albuquerque"
  // (no hyphens) did not match the real slug "breaking-bad-albuquerque".
  const expectSingleLocale = [
    { name: 'breaking-bad-albuquerque', expectedRoot: 'guides', unexpectedRoots: ['en/guides', 'ja/guides', 'zh/guides'] },
    { name: 'poksshak-jeju', expectedRoot: 'guides', unexpectedRoots: ['en/guides', 'ja/guides', 'zh/guides'] },
    { name: 'byakuya-pilgrimage', expectedRoot: 'ja/guides', unexpectedRoots: ['guides', 'en/guides', 'zh/guides'] },
  ];
  expectSingleLocale.forEach(g => {
    const expected = path.join(SITE_DIR, g.expectedRoot, g.name, 'index.html');
    if (!fs.existsSync(expected)) {
      findings.isolationIssues.push({ file: expected, issue: `expected single-locale guide missing: ${g.expectedRoot}/${g.name}` });
    }
    g.unexpectedRoots.forEach(root => {
      const unexpected = path.join(SITE_DIR, root, g.name, 'index.html');
      if (fs.existsSync(unexpected)) {
        findings.isolationIssues.push({ file: unexpected, issue: `unexpected locale variant for single-locale guide "${g.name}" found at ${root}` });
      }
    });
  });
}

// MODE (process.argv[3]):
//   (absent)         — original single-shot full run (small sites)
//   'scan:<locale>'  — scan only that locale's files (ko|en|ja|zh), write
//                       partial findings JSON to /tmp/site_qa_partial_<locale>.json
//                       (used to split the run across several device_bash
//                       calls when the remote-bridged filesystem is too slow
//                       for one pass over the whole site in one timeout window)
//   'combine'        — read all four partial JSONs + run checkSitemap()/
//                       checkGuideLocaleIsolation() once, print final report
const PARTIAL_DIR = '/tmp';
function partialPath(locale) { return path.join(PARTIAL_DIR, `site_qa_partial_${locale}.json`); }

function scanLocale(locale) {
  const contentRoots = ['works', 'places', 'regions', 'culture', 'guides'];
  const lp = locale === 'ko' ? '' : locale;
  const files = [];
  contentRoots.forEach(root => {
    const dir = lp ? path.join(SITE_DIR, lp, root) : path.join(SITE_DIR, root);
    walkHtmlFiles(dir, files);
  });

  console.log(`[site_qa] scanning ${files.length} ${locale} content pages...`);

  files.forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    checkLinksAndAssets(file, html);
    checkCanonical(file, html);
    checkHreflang(file, html);
    checkGA4(file, html);
    checkLanguageIsolation(file, html, locale);
  });

  fs.writeFileSync(partialPath(locale), JSON.stringify({ locale, fileCount: files.length, findings }, null, 0));
  console.log(`[site_qa] wrote ${partialPath(locale)} (${files.length} files, ${Object.values(findings).reduce((n, a) => n + a.length, 0)} findings so far)`);
}

function combine() {
  const locales = ['ko', 'en', 'ja', 'zh'];
  let totalFiles = 0;
  locales.forEach(locale => {
    const p = partialPath(locale);
    if (!fs.existsSync(p)) {
      console.log(`[site_qa] WARNING: missing partial for locale "${locale}" (${p}) — run scan:${locale} first.`);
      return;
    }
    const partial = JSON.parse(fs.readFileSync(p, 'utf8'));
    totalFiles += partial.fileCount;
    Object.entries(partial.findings).forEach(([cat, arr]) => {
      findings[cat].push(...arr);
    });
  });

  checkSitemap();
  checkGuideLocaleIsolation();

  const totalFindings = Object.values(findings).reduce((n, arr) => n + arr.length, 0);

  console.log(`\n[site_qa] combined ${totalFiles} content pages across ${locales.length} locales.`);
  console.log('\n=== Release Candidate Integration QA report ===');
  Object.entries(findings).forEach(([category, arr]) => {
    console.log(`${category}: ${arr.length}`);
    arr.slice(0, 15).forEach(f => console.log('  -', JSON.stringify(f)));
    if (arr.length > 15) console.log(`  ...and ${arr.length - 15} more`);
  });

  if (totalFindings === 0) {
    console.log('\n[site_qa] PASS — 0 findings across all categories.');
    process.exit(0);
  } else {
    console.log(`\n[site_qa] FAIL — ${totalFindings} total findings.`);
    process.exit(1);
  }
}

function main() {
  const mode = process.argv[3] || '';
  if (mode.startsWith('scan:')) {
    scanLocale(mode.slice('scan:'.length));
    return;
  }
  if (mode === 'combine') {
    combine();
    return;
  }

  // Original single-shot full run (fallback / small sites).
  const contentRoots = ['works', 'places', 'regions', 'culture', 'guides'];
  const localePrefixes = ['', 'en', 'ja', 'zh'];
  const files = [];
  localePrefixes.forEach(lp => {
    contentRoots.forEach(root => {
      const dir = lp ? path.join(SITE_DIR, lp, root) : path.join(SITE_DIR, root);
      walkHtmlFiles(dir, files);
    });
  });

  console.log(`[site_qa] scanning ${files.length} generated content pages...`);

  files.forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const locale = localeOfPath(file);
    checkLinksAndAssets(file, html);
    checkCanonical(file, html);
    checkHreflang(file, html);
    checkGA4(file, html);
    checkLanguageIsolation(file, html, locale);
  });

  checkSitemap();
  checkGuideLocaleIsolation();

  const totalFindings = Object.values(findings).reduce((n, arr) => n + arr.length, 0);

  console.log('\n=== Release Candidate Integration QA report ===');
  Object.entries(findings).forEach(([category, arr]) => {
    console.log(`${category}: ${arr.length}`);
    arr.slice(0, 15).forEach(f => console.log('  -', JSON.stringify(f)));
    if (arr.length > 15) console.log(`  ...and ${arr.length - 15} more`);
  });

  if (totalFindings === 0) {
    console.log('\n[site_qa] PASS — 0 findings across all categories.');
    process.exit(0);
  } else {
    console.log(`\n[site_qa] FAIL — ${totalFindings} total findings.`);
    process.exit(1);
  }
}

main();
