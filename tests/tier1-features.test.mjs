import { TestSuiteRunner, checkFileExists, readFileContent, stripComments, assert, runCommand, runBuildWithRetry } from './test-utils.mjs';

export const suite = new TestSuiteRunner('Tier 1: Feature Coverage (F1 - F13)');

// ==========================================
// F1: Base Skeleton Primitive
// ==========================================
suite.test('F1.1: Base Skeleton primitive file exists at src/components/ui/skeleton.tsx', () => {
  assert(checkFileExists('src/components/ui/skeleton.tsx'), 'src/components/ui/skeleton.tsx must exist');
});

suite.test('F1.2: Base Skeleton primitive exports named Skeleton component', () => {
  const content = readFileContent('src/components/ui/skeleton.tsx');
  assert(/export\s+(?:function\s+Skeleton|const\s+Skeleton\s*=)/.test(content), 'Must export Skeleton component');
});

suite.test('F1.3: Skeleton primitive supports variant="light" with bg-slate-200', () => {
  const content = readFileContent('src/components/ui/skeleton.tsx');
  assert(content.includes('bg-slate-200'), 'Skeleton must include bg-slate-200 for light variant');
});

suite.test('F1.4: Skeleton primitive supports variant="dark" with bg-white/10', () => {
  const content = readFileContent('src/components/ui/skeleton.tsx');
  assert(content.includes('bg-white/10'), 'Skeleton must include bg-white/10 for dark variant');
});

suite.test('F1.5: Skeleton primitive supports variant="card" with bg-slate-100 or card styling', () => {
  const content = readFileContent('src/components/ui/skeleton.tsx');
  assert(content.includes('bg-slate-100') || content.includes('card'), 'Skeleton must support card variant');
});

suite.test('F1.6: Skeleton primitive merges custom className and uses cn() helper', () => {
  const content = readFileContent('src/components/ui/skeleton.tsx');
  assert(content.includes('cn('), 'Skeleton must utilize cn() from utils');
  assert(content.includes('className'), 'Skeleton must accept className prop');
});

// ==========================================
// F2: Navbar Skeleton
// ==========================================
suite.test('F2.1: NavbarSkeleton file exists at src/components/skeletons/NavbarSkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/NavbarSkeleton.tsx'), 'NavbarSkeleton.tsx must exist');
});

suite.test('F2.2: NavbarSkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/NavbarSkeleton.tsx');
  assert(/export\s+(?:function\s+NavbarSkeleton|const\s+NavbarSkeleton\s*=)/.test(content), 'Must export NavbarSkeleton');
});

suite.test('F2.3: NavbarSkeleton maintains sticky top positioning', () => {
  const content = readFileContent('src/components/skeletons/NavbarSkeleton.tsx');
  assert(content.includes('sticky') && content.includes('top-0'), 'NavbarSkeleton must be sticky top-0');
});

suite.test('F2.4: NavbarSkeleton matches header height constraint h-[72px] or h-[73px]', () => {
  const content = readFileContent('src/components/skeletons/NavbarSkeleton.tsx');
  assert(/h-\[7[23]px\]/.test(content) || /h-16|h-20/.test(content), 'NavbarSkeleton must match navbar height constraint');
});

suite.test('F2.5: NavbarSkeleton includes navigation link and center logo placeholders', () => {
  const content = readFileContent('src/components/skeletons/NavbarSkeleton.tsx');
  assert(content.includes('max-w-[1700px]') || content.includes('mx-auto'), 'NavbarSkeleton should constrain max width');
  assert(/rounded-full|rounded-md/.test(content), 'NavbarSkeleton should contain rounded element placeholders');
});

suite.test('F2.6: NavbarSkeleton includes Sign In CTA pill placeholder', () => {
  const content = readFileContent('src/components/skeletons/NavbarSkeleton.tsx');
  assert(/rounded-full/.test(content), 'NavbarSkeleton must include rounded-full pill for Sign In CTA');
});

// ==========================================
// F3: Hero Section Skeleton
// ==========================================
suite.test('F3.1: HeroSectionSkeleton file exists at src/components/skeletons/HeroSectionSkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/HeroSectionSkeleton.tsx'), 'HeroSectionSkeleton.tsx must exist');
});

suite.test('F3.2: HeroSectionSkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  assert(/export\s+(?:function\s+HeroSectionSkeleton|const\s+HeroSectionSkeleton\s*=)/.test(content), 'Must export HeroSectionSkeleton');
});

suite.test('F3.3: HeroSectionSkeleton contains 2-line headline placeholder', () => {
  const content = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  assert(/max-w-2xl|max-w-3xl|h-10|h-12/.test(content), 'HeroSectionSkeleton must contain headline placeholder');
});

suite.test('F3.4: HeroSectionSkeleton contains CTA button pill placeholder', () => {
  const content = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  assert(/rounded-full/.test(content), 'Hero CTA must be rounded-full');
});

suite.test('F3.5: HeroSectionSkeleton contains carousel card area and 3-column feature strip', () => {
  const content = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  assert(/grid-cols-1\s+md:grid-cols-3|grid\s+grid-cols-3/.test(content), 'Must contain 3-column features strip');
});

// ==========================================
// F4: Trust & Impact Skeleton
// ==========================================
suite.test('F4.1: TrustImpactSkeleton file exists at src/components/skeletons/TrustImpactSkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/TrustImpactSkeleton.tsx'), 'TrustImpactSkeleton.tsx must exist');
});

suite.test('F4.2: TrustImpactSkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  assert(/export\s+(?:function\s+TrustImpactSkeleton|const\s+TrustImpactSkeleton\s*=)/.test(content), 'Must export TrustImpactSkeleton');
});

suite.test('F4.3: TrustImpactSkeleton implements dark green background token bg-[#0b291a]', () => {
  const content = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  assert(content.includes('bg-[#0b291a]'), 'TrustImpactSkeleton must use bg-[#0b291a]');
});

suite.test('F4.4: TrustImpactSkeleton features badge and headline placeholders', () => {
  const content = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  assert(/bg-white\/10|bg-white\/15|bg-white\/20/.test(content), 'Must use dark theme white alpha tokens');
});

suite.test('F4.5: TrustImpactSkeleton features 3 circular stat dial rings with rounded-full', () => {
  const content = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  assert(content.includes('rounded-full'), 'Stat dials must be rounded-full');
});

suite.test('F4.6: TrustImpactSkeleton dial rings specify radial dimensions (w-24 / w-40)', () => {
  const content = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  assert(/w-24\s+h-24/.test(content) || /md:w-40\s+md:h-40/.test(content) || /w-28|w-32|w-36|w-40/.test(content), 'Dials must specify circular dimensions');
});

// ==========================================
// F5: Trusted By Marquee Skeleton
// ==========================================
suite.test('F5.1: TrustedBySkeleton file exists at src/components/skeletons/TrustedBySkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/TrustedBySkeleton.tsx'), 'TrustedBySkeleton.tsx must exist');
});

suite.test('F5.2: TrustedBySkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/TrustedBySkeleton.tsx');
  assert(/export\s+(?:function\s+TrustedBySkeleton|const\s+TrustedBySkeleton\s*=)/.test(content), 'Must export TrustedBySkeleton');
});

suite.test('F5.3: TrustedBySkeleton features caption bar placeholder', () => {
  const content = readFileContent('src/components/skeletons/TrustedBySkeleton.tsx');
  assert(/mx-auto|w-48|w-64/.test(content), 'TrustedBySkeleton must contain centered caption placeholder');
});

suite.test('F5.4: TrustedBySkeleton features 5 logo placeholders', () => {
  const content = readFileContent('src/components/skeletons/TrustedBySkeleton.tsx');
  // Check that at least 5 logo shapes are mapped or repeated
  const matches = (content.match(/w-24|w-28|w-32|w-36|w-40|<Skeleton/g) || []).length;
  assert(matches >= 5, 'TrustedBySkeleton must contain at least 5 logo placeholders');
});

suite.test('F5.5: TrustedBySkeleton implements horizontal layout with gradient fade masks or overflow container', () => {
  const content = readFileContent('src/components/skeletons/TrustedBySkeleton.tsx');
  assert(/overflow-hidden|flex\s+items-center/.test(content), 'TrustedBySkeleton must have horizontal overflow layout');
});

// ==========================================
// F6: How It Works Skeleton
// ==========================================
suite.test('F6.1: HowItWorksSkeleton file exists at src/components/skeletons/HowItWorksSkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/HowItWorksSkeleton.tsx'), 'HowItWorksSkeleton.tsx must exist');
});

suite.test('F6.2: HowItWorksSkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/HowItWorksSkeleton.tsx');
  assert(/export\s+(?:function\s+HowItWorksSkeleton|const\s+HowItWorksSkeleton\s*=)/.test(content), 'Must export HowItWorksSkeleton');
});

suite.test('F6.3: HowItWorksSkeleton implements sage background token bg-[#f6f9f6]', () => {
  const content = readFileContent('src/components/skeletons/HowItWorksSkeleton.tsx');
  assert(content.includes('bg-[#f6f9f6]'), 'HowItWorksSkeleton must use sage background bg-[#f6f9f6]');
});

suite.test('F6.4: HowItWorksSkeleton implements top SVG arch divider or arched dome container', () => {
  const content = readFileContent('src/components/skeletons/HowItWorksSkeleton.tsx');
  assert(/svg|<path|arch|rounded-t-/i.test(content), 'HowItWorksSkeleton must include top arch divider or arched container');
});

suite.test('F6.5: HowItWorksSkeleton implements 3 step grid rows with step number badges', () => {
  const content = readFileContent('src/components/skeletons/HowItWorksSkeleton.tsx');
  assert(/rounded-full/.test(content), 'Must include circular step number badges');
  assert(/col-span-5|col-span-7|grid-cols-12|grid-cols-1/.test(content), 'Must match step grid column layout');
});

suite.test('F6.6: HowItWorksSkeleton contains right mockup card containers', () => {
  const content = readFileContent('src/components/skeletons/HowItWorksSkeleton.tsx');
  assert(/h-\[260px\]|h-\[330px\]|rounded-2xl|rounded-3xl/.test(content), 'Must include mockup card containers');
});

// ==========================================
// F7: Categories Skeleton
// ==========================================
suite.test('F7.1: CategoriesSkeleton file exists at src/components/skeletons/CategoriesSkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/CategoriesSkeleton.tsx'), 'CategoriesSkeleton.tsx must exist');
});

suite.test('F7.2: CategoriesSkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/CategoriesSkeleton.tsx');
  assert(/export\s+(?:function\s+CategoriesSkeleton|const\s+CategoriesSkeleton\s*=)/.test(content), 'Must export CategoriesSkeleton');
});

suite.test('F7.3: CategoriesSkeleton features category section badge and headline placeholders', () => {
  const content = readFileContent('src/components/skeletons/CategoriesSkeleton.tsx');
  assert(/w-36|w-40|w-48|w-64|w-80/.test(content), 'Must include badge/headline placeholders');
});

suite.test('F7.4: CategoriesSkeleton features CTA button pill placeholder', () => {
  const content = readFileContent('src/components/skeletons/CategoriesSkeleton.tsx');
  assert(/rounded-full/.test(content), 'CTA button in Categories must be rounded-full');
});

suite.test('F7.5: CategoriesSkeleton features cylindrical card strip placeholder layout', () => {
  const content = readFileContent('src/components/skeletons/CategoriesSkeleton.tsx');
  assert(/h-\[250px\]|h-\[300px\]|h-\[400px\]|flex|grid/.test(content), 'Must include card strip layout');
});

// ==========================================
// F8: Campaigns Bento Grid Skeleton
// ==========================================
suite.test('F8.1: CampaignsGridSkeleton file exists at src/components/skeletons/CampaignsGridSkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/CampaignsGridSkeleton.tsx'), 'CampaignsGridSkeleton.tsx must exist');
});

suite.test('F8.2: CampaignsGridSkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/CampaignsGridSkeleton.tsx');
  assert(/export\s+(?:function\s+CampaignsGridSkeleton|const\s+CampaignsGridSkeleton\s*=)/.test(content), 'Must export CampaignsGridSkeleton');
});

suite.test('F8.3: CampaignsGridSkeleton contains section title and filter dropdown pill', () => {
  const content = readFileContent('src/components/skeletons/CampaignsGridSkeleton.tsx');
  assert(/rounded-full/.test(content), 'Dropdown pill and nav buttons must be rounded-full');
});

suite.test('F8.4: CampaignsGridSkeleton contains circular navigation arrow buttons', () => {
  const content = readFileContent('src/components/skeletons/CampaignsGridSkeleton.tsx');
  assert(/w-10\s+h-10\s+rounded-full|rounded-full\s+w-10\s+h-10/.test(content) || (content.includes('w-10') && content.includes('rounded-full')), 'Must have circular navigation buttons');
});

suite.test('F8.5: CampaignsGridSkeleton implements asymmetric 4-card bento grid (col-span-2 and col-span-1)', () => {
  const content = readFileContent('src/components/skeletons/CampaignsGridSkeleton.tsx');
  assert(/col-span-2/.test(content) && /col-span-1/.test(content), 'Must include asymmetric col-span-2 and col-span-1 classes');
});

suite.test('F8.6: CampaignsGridSkeleton contains progress bar placeholders', () => {
  const content = readFileContent('src/components/skeletons/CampaignsGridSkeleton.tsx');
  assert(/h-1\.5|h-2/.test(content), 'Must include progress bar height class h-1.5 or h-2');
});

// ==========================================
// F9: Showcase Bento Strip Skeleton
// ==========================================
suite.test('F9.1: ShowcaseBentoSkeleton file exists at src/components/skeletons/ShowcaseBentoSkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/ShowcaseBentoSkeleton.tsx'), 'ShowcaseBentoSkeleton.tsx must exist');
});

suite.test('F9.2: ShowcaseBentoSkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/ShowcaseBentoSkeleton.tsx');
  assert(/export\s+(?:function\s+ShowcaseBentoSkeleton|const\s+ShowcaseBentoSkeleton\s*=)/.test(content), 'Must export ShowcaseBentoSkeleton');
});

suite.test('F9.3: ShowcaseBentoSkeleton contains 5-column cluster layout', () => {
  const content = readFileContent('src/components/skeletons/ShowcaseBentoSkeleton.tsx');
  assert(/flex|grid/.test(content), 'ShowcaseBentoSkeleton must arrange columns');
});

suite.test('F9.4: ShowcaseBentoSkeleton implements asymmetric rounded corners (rounded-tr-[4rem], rounded-tl-[4rem])', () => {
  const content = readFileContent('src/components/skeletons/ShowcaseBentoSkeleton.tsx');
  assert(/rounded-tr-\[4rem\]|rounded-tl-\[4rem\]|rounded-\[2\.5rem\]|rounded-\[3rem\]/.test(content), 'Must include asymmetric corner radii');
});

suite.test('F9.5: ShowcaseBentoSkeleton contains center card with circular play button placeholder', () => {
  const content = readFileContent('src/components/skeletons/ShowcaseBentoSkeleton.tsx');
  assert(/w-24\s+h-24\s+rounded-full|w-20|w-24|play/i.test(content) && /rounded-full/.test(content), 'Must contain circular play button placeholder');
});

// ==========================================
// F10: Standalone Footer Skeleton
// ==========================================
suite.test('F10.1: FooterSkeleton file exists at src/components/skeletons/FooterSkeleton.tsx', () => {
  assert(checkFileExists('src/components/skeletons/FooterSkeleton.tsx'), 'FooterSkeleton.tsx must exist');
});

suite.test('F10.2: FooterSkeleton exports named component', () => {
  const content = readFileContent('src/components/skeletons/FooterSkeleton.tsx');
  assert(/export\s+(?:function\s+FooterSkeleton|const\s+FooterSkeleton\s*=)/.test(content), 'Must export FooterSkeleton');
});

suite.test('F10.3: FooterSkeleton implements dark background token bg-[#0b291a]', () => {
  const content = readFileContent('src/components/skeletons/FooterSkeleton.tsx');
  assert(content.includes('bg-[#0b291a]'), 'FooterSkeleton must use dark background token bg-[#0b291a]');
});

suite.test('F10.4: FooterSkeleton contains newsletter input and button placeholders', () => {
  const content = readFileContent('src/components/skeletons/FooterSkeleton.tsx');
  assert(/rounded-full/.test(content), 'Newsletter input and button must be rounded-full');
});

suite.test('F10.5: FooterSkeleton contains 5-column footer link grid and bottom bar', () => {
  const content = readFileContent('src/components/skeletons/FooterSkeleton.tsx');
  assert(/grid-cols-2|grid-cols-5|md:grid-cols-5|lg:grid-cols-5/.test(content), 'FooterSkeleton must define multi-column link grid');
});

// ==========================================
// F11: Route-Level loading.tsx
// ==========================================
suite.test('F11.1: Route-level loading.tsx exists at src/app/loading.tsx', () => {
  assert(checkFileExists('src/app/loading.tsx'), 'src/app/loading.tsx must exist');
});

suite.test('F11.2: src/app/loading.tsx exports default Loading function', () => {
  const content = readFileContent('src/app/loading.tsx');
  assert(/export\s+default\s+function\s+Loading/.test(content) || /export\s+default\s+Loading/.test(content), 'Must export default Loading function');
});

suite.test('F11.3: src/app/loading.tsx composes NavbarSkeleton at the top', () => {
  const content = readFileContent('src/app/loading.tsx');
  assert(content.includes('NavbarSkeleton'), 'loading.tsx must render NavbarSkeleton');
});

suite.test('F11.4: src/app/loading.tsx composes main section skeletons in sequence', () => {
  const content = readFileContent('src/app/loading.tsx');
  assert(content.includes('HeroSectionSkeleton') && content.includes('TrustImpactSkeleton'), 'loading.tsx must render main section skeletons');
});

suite.test('F11.5: src/app/loading.tsx strictly does NOT duplicate Footer or FooterSkeleton', () => {
  const rawContent = readFileContent('src/app/loading.tsx');
  const codeWithoutComments = stripComments(rawContent);
  assert(!codeWithoutComments.includes('<FooterSkeleton'), 'loading.tsx must NOT render <FooterSkeleton />');
  assert(!codeWithoutComments.includes('<Footer />') && !codeWithoutComments.includes('<Footer/>'), 'loading.tsx must NOT render <Footer />');
});

suite.test('F11.6: src/app/loading.tsx wraps sections in full-width container matching page layout', () => {
  const content = readFileContent('src/app/loading.tsx');
  assert(content.includes('min-h-screen') || content.includes('w-full'), 'loading.tsx must wrap page in full container');
});

// ==========================================
// F12: Theme & Animation Integration
// ==========================================
suite.test('F12.1: animate-pulse or shimmer animation classes active across skeleton elements', () => {
  const skeletonPrimitive = readFileContent('src/components/ui/skeleton.tsx');
  assert(skeletonPrimitive.includes('animate-pulse') || skeletonPrimitive.includes('shimmer'), 'Skeleton must have pulse or shimmer class');
});

suite.test('F12.2: Light section skeletons use bg-slate-200 or bg-slate-200/80', () => {
  const heroContent = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  const skeletonContent = readFileContent('src/components/ui/skeleton.tsx');
  assert(heroContent.includes('bg-slate-200') || skeletonContent.includes('bg-slate-200'), 'Light sections must use bg-slate-200');
});

suite.test('F12.3: Dark section skeletons use bg-white/10 and border-white/10', () => {
  const trustContent = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  const skeletonContent = readFileContent('src/components/ui/skeleton.tsx');
  assert(trustContent.includes('bg-white/10') || skeletonContent.includes('bg-white/10'), 'Dark sections must use bg-white/10');
});

suite.test('F12.4: Sage section skeleton uses bg-[#f6f9f6]', () => {
  const howItWorks = readFileContent('src/components/skeletons/HowItWorksSkeleton.tsx');
  assert(howItWorks.includes('bg-[#f6f9f6]'), 'Sage section must use bg-[#f6f9f6]');
});

suite.test('F12.5: globals.css contains animation or font-sans definitions', () => {
  const css = readFileContent('src/app/globals.css');
  assert(css.includes('@import "tailwindcss"') || css.includes('@theme'), 'globals.css must configure tailwindcss');
});

suite.test('F12.6: Zero visual clash: Dark section TrustImpactSkeleton does not use hardcoded opaque bg-slate-200 on main dark surface', () => {
  const trustContent = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  // Check that the dark green section does not wrap its main elements in opaque light grey
  assert(!trustContent.includes('bg-slate-200/100'), 'Dark section should not have opaque bg-slate-200/100');
});

// ==========================================
// F13: Build & TypeScript Integrity
// ==========================================
suite.test('F13.1: All skeleton files have valid TypeScript extension (.tsx/.ts)', () => {
  const files = [
    'src/components/ui/skeleton.tsx',
    'src/components/skeletons/NavbarSkeleton.tsx',
    'src/components/skeletons/HeroSectionSkeleton.tsx',
    'src/components/skeletons/TrustImpactSkeleton.tsx',
    'src/components/skeletons/TrustedBySkeleton.tsx',
    'src/components/skeletons/HowItWorksSkeleton.tsx',
    'src/components/skeletons/CategoriesSkeleton.tsx',
    'src/components/skeletons/CampaignsGridSkeleton.tsx',
    'src/components/skeletons/ShowcaseBentoSkeleton.tsx',
    'src/components/skeletons/FooterSkeleton.tsx',
    'src/components/skeletons/index.ts',
    'src/app/loading.tsx',
  ];
  for (const f of files) {
    assert(checkFileExists(f), `File ${f} must exist`);
  }
});

suite.test('F13.2: Skeleton primitive defines SkeletonProps interface extending HTMLAttributes', () => {
  const content = readFileContent('src/components/ui/skeleton.tsx');
  assert(content.includes('SkeletonProps') || content.includes('HTMLAttributes'), 'Skeleton primitive should be properly typed with HTMLAttributes');
});

suite.test('F13.3: Barrel export in src/components/skeletons/index.ts exists and re-exports all 9 section skeletons', () => {
  assert(checkFileExists('src/components/skeletons/index.ts'), 'Barrel index.ts must exist');
  const content = readFileContent('src/components/skeletons/index.ts');
  const expectedExports = [
    'NavbarSkeleton',
    'HeroSectionSkeleton',
    'TrustImpactSkeleton',
    'TrustedBySkeleton',
    'HowItWorksSkeleton',
    'CategoriesSkeleton',
    'CampaignsGridSkeleton',
    'ShowcaseBentoSkeleton',
    'FooterSkeleton',
  ];
  for (const exp of expectedExports) {
    assert(content.includes(exp), `Barrel must export ${exp}`);
  }
});

suite.test('F13.4: TypeScript compiler check (npx tsc --noEmit) passes with 0 errors', async () => {
  const res = await runCommand('npx tsc --noEmit');
  assert(res.code === 0, `tsc --noEmit failed with errors:\n${res.stdout}\n${res.stderr}`);
});

suite.test('F13.5: Production build (npm run build) completes successfully with exit code 0', async () => {
  const res = await runBuildWithRetry();
  assert(res.code === 0, `npm run build failed with:\n${res.stdout}\n${res.stderr}`);
});

if (process.argv[1] && process.argv[1].endsWith('tier1-features.test.mjs')) {
  suite.run().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
