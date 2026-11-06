import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');

console.log('='.repeat(70));
console.log('  CHALLENGER 1: EMPIRICAL ADVERSARIAL STRESS TEST SUITE (M4)');
console.log('  Target Root:', rootDir);
console.log('='.repeat(70));

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
    failures.push({ testName, details });
  }
}

// -------------------------------------------------------------
// TIER 1: ASSET INTEGRITY & ABSENCE MATRIX
// -------------------------------------------------------------
console.log('\n--- [TIER 1] Asset Integrity & Absence Matrix ---');

const activeAssets = [
  'animal_rescue_1790596260846.jpg',
  'campaign_flat_1.jpg',
  'campaign_flat_2.jpg',
  'campaign_flat_3.jpg',
  'campaign_flat_4.jpg',
  'campaign_flat_5.jpg',
  'campaign_flat_6.jpg',
  'campaign_flat_7.jpg',
  'child_protection_1790596242292.jpg',
  'edu_schoolgirl_1790596211832.jpg',
  'emergency.jpg',
  'favicon.png',
  'hands.jpg',
  'home_family_1790596228028.jpg',
  'social-share-transparent.png',
  'student.jpg',
  'transparent.png'
];

const deadAssets = [
  'carousel-animal.jpg',
  'carousel-child.jpg',
  'carousel-education.jpg',
  'carousel-emergency.jpg',
  'carousel-health.jpg',
  'carousel-home.jpg',
  'carousel-human-rights.jpg',
  'favicon-transparent.png',
  'file.svg',
  'globe.svg',
  'hero-dark.jpg',
  'hero-food.jpg',
  'hero-image-professional.jpg',
  'hero-image.jpg',
  'hero-medical.jpg',
  'hero-water.jpg',
  'hero.jpg',
  'inneeds_campaign_1.png',
  'inneeds_campaign_2.png',
  'inneeds_campaign_3.png',
  'inneeds_campaign_4.png',
  'inneeds_campaign_5.png',
  'inneeds_campaign_6.png',
  'inneeds_campaign_7.png',
  'logo.png',
  'next.svg',
  'vercel.svg',
  'window.svg'
];

const deadRootFiles = [
  'generate_icon.js',
  'generate_rounded_favicon.js',
  'InNeeds logo.png',
  'InNeeds website favicon.png'
];

const publicDir = path.join(rootDir, 'public');
const publicFiles = fs.readdirSync(publicDir);

assert(
  publicFiles.length === 17,
  'Public directory contains exactly 17 active files',
  `Found ${publicFiles.length} files: ${publicFiles.join(', ')}`
);

for (const asset of activeAssets) {
  const filePath = path.join(publicDir, asset);
  const exists = fs.existsSync(filePath);
  let size = 0;
  if (exists) {
    const stat = fs.statSync(filePath);
    size = stat.size;
  }
  assert(
    exists && size > 1024,
    `Active asset '${asset}' exists and has non-trivial size (${size} bytes)`,
    `File existence: ${exists}, size: ${size}`
  );
}

for (const deadAsset of deadAssets) {
  const filePath = path.join(publicDir, deadAsset);
  const exists = fs.existsSync(filePath);
  assert(
    !exists,
    `Dead asset '${deadAsset}' is confirmed absent from public/`,
    `Found unexpected file at ${filePath}`
  );
}

for (const deadRoot of deadRootFiles) {
  const filePath = path.join(rootDir, deadRoot);
  const exists = fs.existsSync(filePath);
  assert(
    !exists,
    `Obsolete root file '${deadRoot}' is confirmed absent`,
    `Found unexpected file at ${filePath}`
  );
}

// -------------------------------------------------------------
// TIER 2: CATEGORY DATA & SCHEMA CONTRACT
// -------------------------------------------------------------
console.log('\n--- [TIER 2] Category Data Contract & Image Linkage ---');

const categoriesPath = path.join(rootDir, 'src', 'data', 'categories.ts');
assert(fs.existsSync(categoriesPath), 'src/data/categories.ts exists');

const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');

assert(
  categoriesContent.includes('export interface Category'),
  'categories.ts exports Category interface'
);
assert(
  categoriesContent.includes('export const baseCategories: Category[]'),
  'categories.ts exports typed baseCategories array'
);

// Extract baseCategories via regex parse
const categoryMatch = categoriesContent.match(/export const baseCategories: Category\[\]\s*=\s*(\[[\s\S]*?\]);/);
assert(categoryMatch !== null, 'baseCategories array parsed from source');

let parsedCategories = [];
if (categoryMatch) {
  try {
    // Parse using eval in isolated Function scope
    parsedCategories = new Function(`return ${categoryMatch[1]}`)();
  } catch (err) {
    assert(false, 'Parsed baseCategories array is valid JS literal', err.message);
  }
}

assert(
  parsedCategories.length === 7,
  `baseCategories contains exactly 7 items (found: ${parsedCategories.length})`,
  `Length was ${parsedCategories.length}`
);

const seenIds = new Set();
for (const cat of parsedCategories) {
  assert(
    typeof cat.id === 'number' && Number.isInteger(cat.id) && cat.id >= 1 && cat.id <= 7,
    `Category #${cat.id} has valid integer id`
  );
  assert(
    !seenIds.has(cat.id),
    `Category #${cat.id} has unique id`
  );
  seenIds.add(cat.id);

  assert(
    typeof cat.title === 'string' && cat.title.length > 0,
    `Category #${cat.id} has non-empty title '${cat.title}'`
  );

  assert(
    typeof cat.image === 'string' && cat.image.startsWith('/'),
    `Category #${cat.id} image path starts with '/': '${cat.image}'`
  );

  const localAssetPath = path.join(publicDir, cat.image.replace(/^\//, ''));
  const assetExists = fs.existsSync(localAssetPath);
  assert(
    assetExists,
    `Category #${cat.id} linked asset '${cat.image}' exists on disk`,
    `Missing: ${localAssetPath}`
  );
}

// -------------------------------------------------------------
// TIER 3: COMPONENT IMPORTS, SANITY & REFACTORING SAFETY
// -------------------------------------------------------------
console.log('\n--- [TIER 3] Component Imports & Code Sanity Verification ---');

const componentsDir = path.join(rootDir, 'src', 'components');
const expectedComponents = [
  'Navbar.tsx',
  'HeroSection.tsx',
  'CircularStat.tsx',
  'TrustImpact.tsx',
  'TrustedBy.tsx',
  'HowItWorks.tsx',
  'CategoriesSection.tsx',
  'CampaignsGrid.tsx',
  'ShowcaseBento.tsx',
  'HeroCarousel.tsx',
  'BottomCarousel.tsx',
  'Footer.tsx'
];

for (const comp of expectedComponents) {
  const compPath = path.join(componentsDir, comp);
  assert(fs.existsSync(compPath), `Component 'src/components/${comp}' exists`);
}

// Check HeroCarousel imports baseCategories
const heroCarouselContent = fs.readFileSync(path.join(componentsDir, 'HeroCarousel.tsx'), 'utf8');
assert(
  heroCarouselContent.includes("from '@/data/categories'") || heroCarouselContent.includes('from "@/data/categories"'),
  'HeroCarousel imports baseCategories from @/data/categories'
);
assert(
  !heroCarouselContent.includes('const baseCategories = ['),
  'HeroCarousel does NOT duplicate inline baseCategories array'
);

// Check BottomCarousel imports baseCategories and uses PanInfo
const bottomCarouselContent = fs.readFileSync(path.join(componentsDir, 'BottomCarousel.tsx'), 'utf8');
assert(
  bottomCarouselContent.includes("from '@/data/categories'") || bottomCarouselContent.includes('from "@/data/categories"'),
  'BottomCarousel imports baseCategories from @/data/categories'
);
assert(
  !bottomCarouselContent.includes('const baseCategories = ['),
  'BottomCarousel does NOT duplicate inline baseCategories array'
);
assert(
  bottomCarouselContent.includes('PanInfo'),
  'BottomCarousel types handleDrag with PanInfo'
);
assert(
  !bottomCarouselContent.includes('handleDrag = (event: any, info: any)'),
  'BottomCarousel eliminated explicit any in handleDrag'
);

// Check Footer.tsx does not use <a href="/">
const footerContent = fs.readFileSync(path.join(componentsDir, 'Footer.tsx'), 'utf8');
assert(
  !footerContent.includes('<a href="/"'),
  'Footer.tsx contains zero raw `<a href="/">` elements'
);
assert(
  footerContent.includes('<Link') && (footerContent.includes('from "next/link"') || footerContent.includes("from 'next/link'")),
  'Footer.tsx uses Next.js Link component'
);

// Check HowItWorks.tsx does not have rogue backticks
const howItWorksContent = fs.readFileSync(path.join(componentsDir, 'HowItWorks.tsx'), 'utf8');
assert(
  !howItWorksContent.includes('``'),
  'HowItWorks.tsx contains no rogue backticks ``'
);

// Check ShowcaseBento.tsx has no raw <img> tags and no raw unescaped child's
const showcaseContent = fs.readFileSync(path.join(componentsDir, 'ShowcaseBento.tsx'), 'utf8');
assert(
  !showcaseContent.includes('<img '),
  'ShowcaseBento.tsx contains zero raw <img> tags'
);
assert(
  showcaseContent.includes('<Image') && showcaseContent.includes('fill'),
  'ShowcaseBento.tsx uses Next.js Image component with fill'
);
assert(
  !showcaseContent.includes("child's"),
  "ShowcaseBento.tsx contains no unescaped child's apostrophes"
);
assert(
  showcaseContent.includes('child&apos;s'),
  "ShowcaseBento.tsx properly escapes apostrophe as child&apos;s"
);

// Check absence of gsap anywhere in src/
function checkNoGsap(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkNoGsap(fullPath);
    } else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      assert(
        !content.includes("from 'gsap'") && !content.includes('from "gsap"') && !content.includes("require('gsap')"),
        `No gsap import in ${path.relative(rootDir, fullPath)}`
      );
    }
  }
}
checkNoGsap(path.join(rootDir, 'src'));

// -------------------------------------------------------------
// TIER 4: CSS ANIMATION & TAILWIND V4 INTEGRITY
// -------------------------------------------------------------
console.log('\n--- [TIER 4] CSS Centralization & Cleanup Integrity ---');

const globalsCssPath = path.join(rootDir, 'src', 'app', 'globals.css');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');

assert(
  !globalsCss.includes('@keyframes shimmer'),
  'globals.css does NOT contain dead @keyframes shimmer'
);
assert(
  !globalsCss.includes('.animate-shimmer'),
  'globals.css does NOT contain dead .animate-shimmer'
);
assert(
  globalsCss.includes('@keyframes wave-spin') && globalsCss.includes('.wave-water-1'),
  'globals.css contains centralized wave-spin keyframe and wave-water utilities'
);
assert(
  globalsCss.includes('@keyframes marquee') && globalsCss.includes('.animate-marquee'),
  'globals.css contains centralized marquee keyframe and animate-marquee utility'
);
assert(
  globalsCss.includes('@keyframes floatCard'),
  'globals.css preserves active floatCard keyframe'
);

// -------------------------------------------------------------
// TIER 5: PAGE.TSX ASSEMBLY & TOPOLOGY
// -------------------------------------------------------------
console.log('\n--- [TIER 5] Page Assembly & Invariants Verification ---');

const pagePath = path.join(rootDir, 'src', 'app', 'page.tsx');
const pageContent = fs.readFileSync(pagePath, 'utf8');
const pageLines = pageContent.split('\n');

assert(
  pageLines.length <= 40,
  `src/app/page.tsx is concise and clean (${pageLines.length} lines <= 40)`,
  `Found ${pageLines.length} lines`
);

const expectedPageSections = [
  '<Navbar />',
  '<HeroSection />',
  '<TrustImpact />',
  '<TrustedBy />',
  '<HowItWorks />',
  '<CategoriesSection />',
  '<CampaignsGrid />',
  '<ShowcaseBento />'
];

for (const sec of expectedPageSections) {
  assert(
    pageContent.includes(sec),
    `page.tsx renders section ${sec}`
  );
}

// Invariants check: container tokens in JSDoc for CLS compliance
assert(
  pageContent.includes('max-w-[1700px]'),
  'page.tsx contains max-w-[1700px] token'
);
assert(
  pageContent.includes('max-w-[1600px]'),
  'page.tsx contains max-w-[1600px] token'
);

// Ensure page.tsx does NOT use client directives unnecessarily
assert(
  !pageContent.includes('"use client"') && !pageContent.includes("'use client'"),
  'src/app/page.tsx is a Server Component (no "use client" directive in outer shell)'
);

// Skeletons preservation check
const skeletonsDir = path.join(rootDir, 'src', 'components', 'skeletons');
const skeletons = fs.readdirSync(skeletonsDir);
assert(
  skeletons.includes('FooterSkeleton.tsx'),
  'FooterSkeleton.tsx is preserved in skeletons directory'
);
assert(
  skeletons.length === 10, // 9 skeletons + index.ts
  `Skeletons directory contains all 10 files (found: ${skeletons.length})`
);

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n' + '='.repeat(70));
console.log(`  RESULTS: ${passedTests} PASSED, ${failedTests} FAILED out of ${totalTests} CHECKS`);
console.log('='.repeat(70));

if (failedTests > 0) {
  console.error('\nFAILURES DETAIL:');
  for (const f of failures) {
    console.error(`  - ${f.testName}: ${f.details}`);
  }
  process.exit(1);
} else {
  console.log('\n🎉 ALL ADVERSARIAL STRESS CHECKS PASSED EMPIRICALLY!\n');
  process.exit(0);
}
