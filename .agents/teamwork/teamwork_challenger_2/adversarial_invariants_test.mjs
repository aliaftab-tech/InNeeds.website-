import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('d:/InNeeds website');

function readFile(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function fileExists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function fileSize(relPath) {
  return fs.statSync(path.join(ROOT, relPath)).size;
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

console.log('================================================================');
console.log('    CHALLENGER 2: ADVERSARIAL LAYOUT, INVARIANTS & CSS SUITE    ');
console.log('================================================================\n');

// Load target source files
const page = readFile('src/app/page.tsx');
const layout = readFile('src/app/layout.tsx');
const loading = readFile('src/app/loading.tsx');
const globalsCss = readFile('src/app/globals.css');

const navbar = readFile('src/components/Navbar.tsx');
const heroSection = readFile('src/components/HeroSection.tsx');
const heroCarousel = readFile('src/components/HeroCarousel.tsx');
const trustImpact = readFile('src/components/TrustImpact.tsx');
const circularStat = readFile('src/components/CircularStat.tsx');
const trustedBy = readFile('src/components/TrustedBy.tsx');
const howItWorks = readFile('src/components/HowItWorks.tsx');
const categoriesSection = readFile('src/components/CategoriesSection.tsx');
const bottomCarousel = readFile('src/components/BottomCarousel.tsx');
const campaignsGrid = readFile('src/components/CampaignsGrid.tsx');
const showcaseBento = readFile('src/components/ShowcaseBento.tsx');
const footer = readFile('src/components/Footer.tsx');
const categoriesData = readFile('src/data/categories.ts');

const navSkeleton = readFile('src/components/skeletons/NavbarSkeleton.tsx');
const heroSkeleton = readFile('src/components/skeletons/HeroSectionSkeleton.tsx');
const trustSkeleton = readFile('src/components/skeletons/TrustImpactSkeleton.tsx');
const trustedBySkeleton = readFile('src/components/skeletons/TrustedBySkeleton.tsx');
const hiwSkeleton = readFile('src/components/skeletons/HowItWorksSkeleton.tsx');
const catSkeleton = readFile('src/components/skeletons/CategoriesSkeleton.tsx');
const campSkeleton = readFile('src/components/skeletons/CampaignsGridSkeleton.tsx');
const bentoSkeleton = readFile('src/components/skeletons/ShowcaseBentoSkeleton.tsx');
const footSkeleton = readFile('src/components/skeletons/FooterSkeleton.tsx');

// =================================================================
// 1. UI INVARIANTS I-1 THROUGH I-9
// =================================================================
console.log('--- 1. Testing UI Invariants I-1 through I-9 ---');

// I-1: Navbar
check('I-1: Navbar layout, container and interactive states', () => {
  if (!navbar.includes('max-w-[1700px]')) throw new Error('Missing max-w-[1700px] container');
  if (!navbar.includes('sticky top-0') || !navbar.includes('z-50')) throw new Error('Missing sticky top-0 z-50');
  if (!navbar.includes('bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm')) {
    throw new Error('Missing scrolled backdrop blur and shadow styling');
  }
  if (!navbar.includes('#0a5228') || !navbar.includes('#32a338')) {
    throw new Error('Missing exact brand color tokens #0a5228 and #32a338');
  }
  if (!navbar.includes('border-2 border-[#0a5228]') || !navbar.includes('rounded-full')) {
    throw new Error('Missing Sign In pill button styling border-2 border-[#0a5228]');
  }
  return 'Navbar adheres strictly to I-1 layout and styling contract';
});

// I-2: Hero Section
check('I-2: Hero backdrop radial glow, typography and 3-column features', () => {
  if (!heroSection.includes('bg-[radial-gradient(ellipse_at_center,_#E9F7EC_0%,_transparent_70%)]')) {
    throw new Error('Missing radial glow background');
  }
  if (!heroSection.includes('text-[#0f172a]') || !heroSection.includes('font-[800]')) {
    throw new Error('Missing headline styling text-[#0f172a] font-[800]');
  }
  if (!heroSection.includes('Great futures are built') || !heroSection.includes('with a small charity')) {
    throw new Error('Headline copy mismatch');
  }
  if (!heroSection.includes('max-w-5xl') || !heroSection.includes('md:grid-cols-3') || !heroSection.includes('divide-slate-200')) {
    throw new Error('Missing 3-column features bar with divider lines');
  }
  return 'HeroSection adheres strictly to I-2 layout and styling contract';
});

// I-3: Trust & Impact
check('I-3: Trust & Impact dark surface, badge and circular dials', () => {
  if (!trustImpact.includes('bg-[#0b291a]')) throw new Error('Missing dark green background #0b291a');
  if (!trustImpact.includes('bg-white/10 text-emerald-100 border border-white/10')) {
    throw new Error('Missing pill badge styling');
  }
  if (!trustImpact.includes('max-w-[1200px]')) throw new Error('Missing max-w-[1200px] dials container');
  if (!circularStat.includes('w-24 h-24 md:w-40 md:h-40') || 
      !circularStat.includes('rounded-full') || 
      !circularStat.includes('bg-white') || 
      !circularStat.includes('border-2 border-white')) {
    throw new Error('Missing 1:1 circular dial geometry and white container');
  }
  if (!circularStat.includes('wave-water-1') || !circularStat.includes('wave-water-2')) {
    throw new Error('Missing wave water classes');
  }
  if (!trustImpact.includes('numericValue={100}') || !trustImpact.includes('numericValue={24}') || !trustImpact.includes('suffix="k"')) {
    throw new Error('Missing dial values 100%, 24+, $100k');
  }
  return 'TrustImpact adheres strictly to I-3 layout and styling contract';
});

// I-4: Trusted By Marquee
check('I-4: Trusted By container, fading edges and marquee animation', () => {
  if (!trustedBy.includes('max-w-[1600px]')) throw new Error('Missing max-w-[1600px] caption container');
  if (!trustedBy.includes('py-16 bg-white overflow-hidden relative border-t border-slate-100')) {
    throw new Error('Missing outer container styling');
  }
  if (!trustedBy.includes('from-white to-transparent')) {
    throw new Error('Missing fading gradient edge masks');
  }
  if (!trustedBy.includes('animate-marquee')) throw new Error('Missing animate-marquee class');
  if (!globalsCss.includes('@keyframes marquee') || !globalsCss.includes('animation: marquee 40s linear infinite;')) {
    throw new Error('Missing 40s linear infinite marquee keyframe in globals.css');
  }
  if (!globalsCss.includes('.animate-marquee:hover') || !globalsCss.includes('animation-play-state: paused;')) {
    throw new Error('Missing marquee pause-on-hover rule in globals.css');
  }
  return 'TrustedBy adheres strictly to I-4 layout and animation contract';
});

// I-5: How It Works
check('I-5: How It Works container, SVG dome divider, badges and step numbers', () => {
  if (!howItWorks.includes('bg-[#f6f9f6]') || !howItWorks.includes('border-[#e2eae3]')) {
    throw new Error('Missing light sage background and border colors');
  }
  if (!howItWorks.includes('id="how-it-works"')) throw new Error('Missing id="how-it-works"');
  if (!howItWorks.includes('<svg') || !howItWorks.includes('M 0,95 A 720 90 0 0 1 1440,95')) {
    throw new Error('Missing top SVG dome arch divider path');
  }
  if (!howItWorks.includes('max-w-[1250px]')) throw new Error('Missing max-w-[1250px] for 3 steps grid');
  if (!howItWorks.includes('bg-[#22c55e]') || !howItWorks.includes('01') || !howItWorks.includes('02') || !howItWorks.includes('03')) {
    throw new Error('Missing green step badges 01, 02, 03');
  }
  return 'HowItWorks adheres strictly to I-5 layout and styling contract';
});

// I-6: Categories Section & 3D Coverflow
check('I-6: Categories container, section ID and 3D Coverflow geometry', () => {
  if (!categoriesSection.includes('id="categories"')) throw new Error('Missing id="categories"');
  if (!categoriesSection.includes('py-24 bg-white border-t border-slate-100 overflow-x-clip')) {
    throw new Error('Missing outer section styling');
  }
  if (!categoriesSection.includes('max-w-[1600px]')) throw new Error('Missing max-w-[1600px] header container');
  if (!bottomCarousel.includes('from "@/data/categories"')) throw new Error('BottomCarousel missing shared categories import');
  if (!bottomCarousel.includes('--carousel-z') || !bottomCarousel.includes('--carousel-r')) {
    throw new Error('Missing 3D carousel cylinder radius variables');
  }
  // Check 14 cards duplication
  if (!bottomCarousel.includes('...baseCategories, ...baseCategories.map')) {
    throw new Error('BottomCarousel missing duplication to 14 cards for cylindrical coverflow');
  }
  return 'CategoriesSection adheres strictly to I-6 layout and 3D Coverflow contract';
});

// I-7: Campaigns Bento
check('I-7: Campaigns Bento grid, asymmetric cards and progress bars', () => {
  if (!campaignsGrid.includes('id="campaigns"')) throw new Error('Missing id="campaigns"');
  if (!campaignsGrid.includes('max-w-[1600px]')) throw new Error('Missing max-w-[1600px] container');
  if (!campaignsGrid.includes('grid grid-cols-1 md:grid-cols-3 gap-6')) {
    throw new Error('Missing 3-column responsive grid layout');
  }
  const span2Matches = campaignsGrid.match(/md:col-span-2/g) || [];
  const span1Matches = campaignsGrid.match(/md:col-span-1/g) || [];
  if (span2Matches.length < 2 || span1Matches.length < 2) {
    throw new Error('Missing asymmetric 2-wide + 2-square bento card distribution');
  }
  if ((campaignsGrid.match(/rounded-\[28px\]/g) || []).length < 4) {
    throw new Error('Missing rounded-[28px] card corners');
  }
  return 'CampaignsGrid adheres strictly to I-7 layout and bento contract';
});

// I-8: Showcase Bento Cluster
check('I-8: Showcase Bento 5-column cluster with asymmetric radii and image optimization', () => {
  if (!showcaseBento.includes('max-w-[1800px]')) throw new Error('Missing max-w-[1800px] cards container');
  if (!showcaseBento.includes('rounded-tr-[4rem]')) throw new Error('Col 1 missing rounded-tr-[4rem]');
  if (!showcaseBento.includes('rounded-tl-[4rem]')) throw new Error('Cols missing rounded-tl-[4rem]');
  if (!showcaseBento.includes('rounded-[3rem]')) throw new Error('Center Col 3 missing rounded-[3rem]');
  if (!showcaseBento.includes('aspect-[9/12]')) throw new Error('Tall cards missing aspect-[9/12]');
  if (!showcaseBento.includes('aspect-[1/1.05]')) throw new Error('Center card missing aspect-[1/1.05]');
  if (showcaseBento.includes('<img ')) throw new Error('Raw <img> found; must use next/image <Image />');
  if (showcaseBento.includes("child's")) throw new Error("Unescaped child's entity found");
  if (!showcaseBento.includes('child&apos;s')) throw new Error('Missing escaped child&apos;s entity');
  return 'ShowcaseBento adheres strictly to I-8 layout, asymmetric radii and image contracts';
});

// I-9: Footer
check('I-9: Footer placement, background and Next.js link usage', () => {
  if (!footer.includes('bg-[#0b291a] text-white pt-16 pb-8 border-t border-white/10')) {
    throw new Error('Footer missing background bg-[#0b291a] and padding');
  }
  if (!footer.includes('max-w-7xl')) throw new Error('Footer missing max-w-7xl container');
  if (!layout.includes('<Footer />')) throw new Error('Footer not rendered globally in layout.tsx');
  if (stripComments(loading).includes('<Footer')) throw new Error('Footer must not be rendered in loading.tsx');
  if (footer.includes('<a href="/"')) throw new Error('Found raw <a href="/"> in Footer; must use <Link>');
  return 'Footer adheres strictly to I-9 layout, global placement and Link contract';
});

// =================================================================
// 2. SKELETON ALIGNMENT & ZERO-CLS CHECKS
// =================================================================
console.log('\n--- 2. Testing Skeleton Alignment & Zero CLS ---');

const skeletonPairs = [
  { name: 'Navbar', live: navbar, skel: navSkeleton, targetWidth: 'max-w-[1700px]' },
  { name: 'HeroSection', live: heroSection, skel: heroSkeleton, targetWidth: 'max-w-5xl' },
  { name: 'TrustImpact', live: trustImpact, skel: trustSkeleton, targetWidth: 'max-w-[1200px]' },
  { name: 'TrustedBy', live: trustedBy, skel: trustedBySkeleton, targetWidth: 'max-w-[1600px]' },
  { name: 'Categories', live: categoriesSection, skel: catSkeleton, targetWidth: 'max-w-[1600px]' },
  { name: 'CampaignsGrid', live: campaignsGrid, skel: campSkeleton, targetWidth: 'max-w-[1600px]' },
  { name: 'ShowcaseBento', live: showcaseBento, skel: bentoSkeleton, targetWidth: 'max-w-[1800px]' },
  { name: 'Footer', live: footer, skel: footSkeleton, targetWidth: 'max-w-7xl' },
];

for (const p of skeletonPairs) {
  check(`Skeleton alignment: ${p.name} container (${p.targetWidth})`, () => {
    if (!p.live.includes(p.targetWidth)) {
      throw new Error(`Live component ${p.name} missing ${p.targetWidth}`);
    }
    if (!p.skel.includes(p.targetWidth)) {
      throw new Error(`Skeleton component ${p.name}Skeleton missing ${p.targetWidth}`);
    }
    return `Live and skeleton container widths match: ${p.targetWidth}`;
  });
}

check('Skeleton alignment: HowItWorks 2-tier containers (max-w-5xl and max-w-[1250px])', () => {
  if (!howItWorks.includes('max-w-5xl') || !hiwSkeleton.includes('max-w-5xl')) {
    throw new Error('Header banner container mismatch (expected max-w-5xl)');
  }
  if (!howItWorks.includes('max-w-[1250px]')) {
    throw new Error('Live HowItWorks missing max-w-[1250px]');
  }
  if (!hiwSkeleton.includes('max-w-[1250px]')) {
    throw new Error('HowItWorksSkeleton missing max-w-[1250px] (CLS regression!)');
  }
  return 'HowItWorks live and skeleton both match max-w-5xl and max-w-[1250px] (zero CLS)';
});

check('Zero dark surface contrast leaks in skeletons', () => {
  const darkSkeletons = [
    { name: 'TrustImpactSkeleton', code: trustSkeleton },
    { name: 'FooterSkeleton', code: footSkeleton },
  ];
  for (const s of darkSkeletons) {
    if (/bg-slate-(?:100|200|300|400|500)/.test(s.code)) {
      throw new Error(`${s.name} leaks light bg-slate-* classes onto dark surface`);
    }
  }
  return 'TrustImpactSkeleton and FooterSkeleton contain zero light slate color leaks';
});

check('Mobile horizontal overflow immunity across all 9 skeletons', () => {
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

  const staticUnboundedWidthRegex = /(?<!(?:max-|min-|sm:|md:|lg:|xl:|2xl:))(?<![a-zA-Z0-9-])w-\[(?:[4-9]\d{2}|\d{4,})px\]/g;

  for (const s of allSkeletons) {
    const hasContainment = /overflow-(?:hidden|x-clip|x-auto)/.test(s.code);
    const matches = s.code.match(staticUnboundedWidthRegex);
    if (matches && !hasContainment) {
      throw new Error(`${s.name} has unbounded static width ${matches.join(', ')}`);
    }
  }
  return 'All 9 skeletons are protected against horizontal mobile scroll overflow';
});

// =================================================================
// 3. TURBOPACK BUILD MANIFEST & STATIC CHUNKS INTEGRITY
// =================================================================
console.log('\n--- 3. Testing Turbopack Build Artifacts & Chunk Integrity ---');

check('Turbopack build-manifest.json exists and parses cleanly', () => {
  if (!fileExists('.next/build-manifest.json')) {
    throw new Error('.next/build-manifest.json is missing');
  }
  const manifestRaw = readFile('.next/build-manifest.json');
  const manifest = JSON.parse(manifestRaw);
  if (manifest.chunkLoadingGlobal !== 'TURBOPACK') {
    throw new Error(`Expected chunkLoadingGlobal to be "TURBOPACK", got ${manifest.chunkLoadingGlobal}`);
  }
  return `Parsed valid manifest: ${manifest.rootMainFiles.length} root main chunk(s)`;
});

check('All chunk files declared in build-manifest.json exist on disk with non-zero size', () => {
  const manifest = JSON.parse(readFile('.next/build-manifest.json'));
  const allFiles = [
    ...(manifest.polyfillFiles || []),
    ...(manifest.lowPriorityFiles || []),
    ...(manifest.rootMainFiles || []),
  ];

  if (allFiles.length === 0) {
    throw new Error('Manifest lists 0 chunk files');
  }

  const missing = [];
  const empty = [];
  for (const relFile of allFiles) {
    const fullPath = path.join(ROOT, '.next', relFile);
    if (!fs.existsSync(fullPath)) {
      missing.push(relFile);
    } else if (fs.statSync(fullPath).size === 0) {
      empty.push(relFile);
    }
  }

  if (missing.length > 0) throw new Error(`Missing chunk files: ${missing.join(', ')}`);
  if (empty.length > 0) throw new Error(`Empty chunk files: ${empty.join(', ')}`);
  return `Verified all ${allFiles.length} declared build chunk files exist with valid sizes`;
});

// =================================================================
// 4. DEAD ASSETS & CODE PRUNING INTEGRITY
// =================================================================
console.log('\n--- 4. Testing Dead Code & Asset Pruning Integrity ---');

check('gsap uninstalled from package.json and no imports in src/', () => {
  const pkg = JSON.parse(readFile('package.json'));
  if (pkg.dependencies && pkg.dependencies.gsap) {
    throw new Error('gsap still present in package.json dependencies');
  }
  // Check any files in src/
  function scanDir(dir) {
    const entries = fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scanDir(full);
      } else if (ent.name.endsWith('.tsx') || ent.name.endsWith('.ts')) {
        const content = readFile(full);
        if (/from ['"]gsap['"]/.test(content) || /require\(['"]gsap['"]\)/.test(content)) {
          throw new Error(`Residual gsap import in ${full}`);
        }
      }
    }
  }
  scanDir('src');
  return 'Zero gsap references in package.json and src/';
});

check('Exactly 17 active static assets exist in public/', () => {
  const expected17 = [
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
    'transparent.png',
  ].sort();

  const actualFiles = fs.readdirSync(path.join(ROOT, 'public')).filter(f => {
    return fs.statSync(path.join(ROOT, 'public', f)).isFile();
  }).sort();

  if (actualFiles.length !== 17) {
    throw new Error(`Expected exactly 17 assets in public/, found ${actualFiles.length}: [${actualFiles.join(', ')}]`);
  }

  for (let i = 0; i < 17; i++) {
    if (actualFiles[i] !== expected17[i]) {
      throw new Error(`Asset mismatch: expected ${expected17[i]}, found ${actualFiles[i]}`);
    }
  }
  return 'public/ contains exactly the 17 expected active assets';
});

check('Root generator scripts and dead PNG files deleted', () => {
  const deadFiles = [
    'generate_icon.js',
    'generate_rounded_favicon.js',
    'InNeeds logo.png',
    'InNeeds website favicon.png',
  ];
  for (const f of deadFiles) {
    if (fileExists(f)) {
      throw new Error(`Dead file ${f} still exists in root!`);
    }
  }
  return 'All 4 obsolete root files confirmed deleted';
});

// =================================================================
// SUMMARY
// =================================================================
console.log('\n================================================================');
console.log('                 ADVERSARIAL SUITE SUMMARY                      ');
console.log('================================================================');
const passed = results.filter(r => r.pass).length;
const failed = results.filter(r => !r.pass).length;
console.log(` Total Checks: ${results.length}`);
console.log(` Passed:       ${passed}`);
console.log(` Failed:       ${failed}`);
console.log(` Status:       ${failed === 0 ? '✓ ALL ADVERSARIAL CHECKS PASSED' : '🚨 FAILURES DETECTED'}`);
console.log('================================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
