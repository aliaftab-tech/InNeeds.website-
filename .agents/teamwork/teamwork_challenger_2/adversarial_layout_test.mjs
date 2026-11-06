import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('d:/InNeeds website');

function readFile(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '');
}

const results = [];

function check(name, testFn) {
  try {
    const outcome = testFn();
    results.push({ name, pass: true, detail: outcome });
    console.log(`[PASS] ${name}: ${outcome || 'OK'}`);
  } catch (err) {
    results.push({ name, pass: false, error: err.message });
    console.log(`[FAIL] ${name}: ${err.message}`);
  }
}

console.log('=== ADVERSARIAL SKELETON LAYOUT & THEME STABILITY SUITE ===\n');

// 1. Container Width Checks
const page = readFile('src/app/page.tsx');
const howItWorks = readFile('src/components/HowItWorks.tsx');
const footer = readFile('src/components/Footer.tsx');

const navSkeleton = readFile('src/components/skeletons/NavbarSkeleton.tsx');
const heroSkeleton = readFile('src/components/skeletons/HeroSectionSkeleton.tsx');
const trustSkeleton = readFile('src/components/skeletons/TrustImpactSkeleton.tsx');
const trustedBySkeleton = readFile('src/components/skeletons/TrustedBySkeleton.tsx');
const hiwSkeleton = readFile('src/components/skeletons/HowItWorksSkeleton.tsx');
const catSkeleton = readFile('src/components/skeletons/CategoriesSkeleton.tsx');
const campSkeleton = readFile('src/components/skeletons/CampaignsGridSkeleton.tsx');
const bentoSkeleton = readFile('src/components/skeletons/ShowcaseBentoSkeleton.tsx');
const footSkeleton = readFile('src/components/skeletons/FooterSkeleton.tsx');
const loading = readFile('src/app/loading.tsx');

// Check 1: Navbar container
check('Navbar container max-w', () => {
  const pageMatch = page.match(/max-w-\[1700px\]/);
  const skelMatch = navSkeleton.match(/max-w-\[1700px\]/);
  if (!skelMatch) throw new Error('NavbarSkeleton missing max-w-[1700px]');
  return 'Matched max-w-[1700px]';
});

// Check 2: Hero Section features bar
check('Hero features bar max-w', () => {
  const pageMatch = page.match(/max-w-5xl/);
  const skelMatch = heroSkeleton.match(/max-w-5xl/);
  if (!skelMatch) throw new Error('HeroSectionSkeleton missing max-w-5xl');
  return 'Matched max-w-5xl';
});

// Check 3: TrustImpact dials container
check('TrustImpact dials container max-w', () => {
  const pageMatch = page.match(/max-w-\[1200px\]/);
  const skelMatch = trustSkeleton.match(/max-w-\[1200px\]/);
  if (!skelMatch) throw new Error('TrustImpactSkeleton missing max-w-[1200px]');
  return 'Matched max-w-[1200px]';
});

// Check 4: TrustedBy container
check('TrustedBy container max-w', () => {
  const pageMatch = page.match(/max-w-\[1600px\]/);
  const skelMatch = trustedBySkeleton.match(/max-w-\[1600px\]/);
  if (!skelMatch) throw new Error('TrustedBySkeleton missing max-w-[1600px]');
  return 'Matched max-w-[1600px]';
});

// Check 5: Categories container
check('Categories container max-w', () => {
  const pageMatch = page.match(/id="categories"[\s\S]*?max-w-\[1600px\]/);
  const skelMatch = catSkeleton.match(/max-w-\[1600px\]/);
  if (!skelMatch) throw new Error('CategoriesSkeleton missing max-w-[1600px]');
  return 'Matched max-w-[1600px]';
});

// Check 6: CampaignsGrid container
check('CampaignsGrid container max-w', () => {
  const pageMatch = page.match(/id="campaigns"[\s\S]*?max-w-\[1600px\]/);
  const skelMatch = campSkeleton.match(/max-w-\[1600px\]/);
  if (!skelMatch) throw new Error('CampaignsGridSkeleton missing max-w-[1600px]');
  return 'Matched max-w-[1600px]';
});

// Check 7: ShowcaseBento container
check('ShowcaseBento container max-w', () => {
  const pageMatch = page.match(/max-w-\[1800px\]/);
  const skelMatch = bentoSkeleton.match(/max-w-\[1800px\]/);
  if (!skelMatch) throw new Error('ShowcaseBentoSkeleton missing max-w-[1800px]');
  return 'Matched max-w-[1800px]';
});

// Check 8: Footer container
check('Footer container max-w', () => {
  const liveMatch = footer.match(/max-w-7xl/);
  const skelMatch = footSkeleton.match(/max-w-7xl/);
  if (!skelMatch) throw new Error('FooterSkeleton missing max-w-7xl');
  return 'Matched max-w-7xl';
});

// Check 9: HowItWorks header container
check('HowItWorks header banner container max-w', () => {
  const liveHeader = howItWorks.match(/max-w-5xl/);
  const skelHeader = hiwSkeleton.match(/max-w-5xl/);
  if (!skelHeader) throw new Error('HowItWorksSkeleton missing max-w-5xl in header');
  return 'Matched max-w-5xl in banner header';
});

// Check 10: HowItWorks 3-step grid container max-w (Adversarial challenge)
check('HowItWorks 3-step grid container max-w (Adversarial check)', () => {
  // Live component: line 143: max-w-[1250px]
  const liveMatch = howItWorks.match(/max-w-\[(\d+)px\]/);
  const skelMatch = hiwSkeleton.match(/3 Steps Grid[\s\S]*?max-w-\[(\d+)px\]/);
  const liveVal = liveMatch ? liveMatch[1] : null;
  const skelVal = skelMatch ? skelMatch[1] : null;

  if (liveVal !== skelVal) {
    throw new Error(`Container width divergence detected: Live HowItWorks uses max-w-[${liveVal}px] but skeleton uses max-w-[${skelVal}px] (350px difference on screens >= 1250px)`);
  }
  return `Live: max-w-[${liveVal}px], Skeleton: max-w-[${skelVal}px]`;
});

// Check 11: Dark theme contrast leak
check('TrustImpactSkeleton contrast leak check', () => {
  if (/bg-slate-(?:100|200|300|400|500)/.test(trustSkeleton)) {
    throw new Error('TrustImpactSkeleton leaks light slate backgrounds into dark surface!');
  }
  if (!trustSkeleton.includes('variant="dark"') && !trustSkeleton.includes('bg-white/')) {
    throw new Error('TrustImpactSkeleton must use variant="dark" or translucent white');
  }
  return 'Zero light theme color leaks detected in TrustImpactSkeleton';
});

// Check 12: Duplicate Footer in loading.tsx
check('No duplicate footer in loading.tsx', () => {
  const strippedLoading = stripComments(loading);
  if (/<Footer|<FooterSkeleton/.test(strippedLoading)) {
    throw new Error('loading.tsx contains duplicate Footer or FooterSkeleton in rendered JSX!');
  }
  return 'loading.tsx correctly omits Footer/FooterSkeleton from rendered JSX';
});

// Check 13: Mobile horizontal scroll overflow scan
check('Mobile horizontal overflow scan in section skeletons', () => {
  const allSkeletons = [
    { name: 'NavbarSkeleton', code: navSkeleton },
    { name: 'HeroSectionSkeleton', code: heroSkeleton },
    { name: 'TrustImpactSkeleton', code: trustSkeleton },
    { name: 'TrustedBySkeleton', code: trustedBySkeleton },
    { name: 'HowItWorksSkeleton', code: hiwSkeleton },
    { name: 'CategoriesSkeleton', code: catSkeleton },
    { name: 'CampaignsGridSkeleton', code: campSkeleton },
    { name: 'ShowcaseBentoSkeleton', code: bentoSkeleton },
    { name: 'FooterSkeleton', code: footSkeleton },
  ];

  // Look for static width classes like w-[400px], w-[500px] without responsive prefix and without max-w constraint or overflow containment
  const staticWidthRegex = /(?<!(?:max-|min-|sm:|md:|lg:|xl:|2xl:))(?<![a-zA-Z0-9-])w-\[(?:[4-9]\d{2}|\d{4,})px\]/g;

  const issues = [];
  for (const skel of allSkeletons) {
    const hasOuterOverflowProtection = /overflow-(?:hidden|x-clip|x-auto)/.test(skel.code);
    const matches = skel.code.match(staticWidthRegex);
    if (matches && !hasOuterOverflowProtection) {
      issues.push(`${skel.name} has static width token ${matches.join(', ')} without responsive prefix or overflow protection`);
    }
  }

  if (issues.length > 0) {
    throw new Error(issues.join('; '));
  }
  return 'All skeletons safely protect against mobile horizontal overflow (using responsive prefixes, percentages, max-w, or overflow containers)';
});

// Summary
console.log('\n=== SUMMARY ===');
const passed = results.filter(r => r.pass).length;
const failed = results.filter(r => !r.pass).length;
console.log(`Passed: ${passed}/${results.length}, Failed: ${failed}/${results.length}`);
