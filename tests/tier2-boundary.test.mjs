import { TestSuiteRunner, checkFileExists, readFileContent, stripComments, assert } from './test-utils.mjs';

export const suite = new TestSuiteRunner('Tier 2: Boundary & Corner Cases');

suite.test('B1.1: Dark theme contrast isolation in TrustImpactSkeleton', () => {
  assert(checkFileExists('src/components/skeletons/TrustImpactSkeleton.tsx'), 'TrustImpactSkeleton.tsx must exist');
  const content = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  // Confirm presence of dark theme tokens
  assert(content.includes('bg-[#0b291a]'), 'Container must have dark forest green bg-[#0b291a]');
  assert(content.includes('bg-white/10') || content.includes('variant="dark"'), 'Elements must use dark variant or bg-white/10');
});

suite.test('B1.2: Dark theme contrast isolation in FooterSkeleton', () => {
  assert(checkFileExists('src/components/skeletons/FooterSkeleton.tsx'), 'FooterSkeleton.tsx must exist');
  const content = readFileContent('src/components/skeletons/FooterSkeleton.tsx');
  assert(content.includes('bg-[#0b291a]'), 'FooterSkeleton container must have bg-[#0b291a]');
  assert(content.includes('bg-white/10') || content.includes('variant="dark"'), 'FooterSkeleton must use dark variant tokens');
});

suite.test('B2.1: Light theme classes on light section skeletons', () => {
  const heroContent = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  assert(heroContent.includes('bg-slate-200') || heroContent.includes('variant="light"') || heroContent.includes('<Skeleton'), 'HeroSectionSkeleton must use light theme tokens');
});

suite.test('B2.2: Light sage theme classes on HowItWorksSkeleton', () => {
  assert(checkFileExists('src/components/skeletons/HowItWorksSkeleton.tsx'), 'HowItWorksSkeleton.tsx must exist');
  const content = readFileContent('src/components/skeletons/HowItWorksSkeleton.tsx');
  assert(content.includes('bg-[#f6f9f6]'), 'HowItWorksSkeleton must use exact sage token bg-[#f6f9f6]');
});

suite.test('B3.1: Animation pulse/shimmer presence on base Skeleton primitive', () => {
  const content = readFileContent('src/components/ui/skeleton.tsx');
  assert(content.includes('animate-pulse') || content.includes('shimmer'), 'Base Skeleton must declare animate-pulse or shimmer');
});

suite.test('B4.1: Asymmetric column span classes in CampaignsGridSkeleton', () => {
  assert(checkFileExists('src/components/skeletons/CampaignsGridSkeleton.tsx'), 'CampaignsGridSkeleton.tsx must exist');
  const content = readFileContent('src/components/skeletons/CampaignsGridSkeleton.tsx');
  assert(content.includes('col-span-2'), 'CampaignsGridSkeleton must include col-span-2 for wide cards');
  assert(content.includes('col-span-1'), 'CampaignsGridSkeleton must include col-span-1 for square cards');
  assert(content.includes('grid-cols-1') || content.includes('md:grid-cols-3'), 'CampaignsGridSkeleton must specify responsive grid');
});

suite.test('B4.2: Asymmetric corner radius classes in ShowcaseBentoSkeleton', () => {
  assert(checkFileExists('src/components/skeletons/ShowcaseBentoSkeleton.tsx'), 'ShowcaseBentoSkeleton.tsx must exist');
  const content = readFileContent('src/components/skeletons/ShowcaseBentoSkeleton.tsx');
  assert(
    content.includes('rounded-tr-[4rem]') ||
    content.includes('rounded-tl-[4rem]') ||
    content.includes('rounded-[2.5rem]') ||
    content.includes('rounded-[3rem]'),
    'ShowcaseBentoSkeleton must enforce asymmetric bento radii'
  );
});

suite.test('B5.1: Circular geometry boundary in TrustImpactSkeleton dial rings', () => {
  const content = readFileContent('src/components/skeletons/TrustImpactSkeleton.tsx');
  assert(content.includes('rounded-full'), 'Stat dials must be strictly rounded-full');
  // Ensure dial containers maintain 1:1 aspect ratio
  const hasSquareCircle =
    (content.includes('w-24') && content.includes('h-24')) ||
    (content.includes('w-40') && content.includes('h-40')) ||
    (content.includes('aspect-square'));
  assert(hasSquareCircle, 'Dial rings must have matching width and height (aspect ratio 1:1)');
});

suite.test('B5.2: Circular geometry boundary in button CTAs & badges', () => {
  const navContent = readFileContent('src/components/skeletons/NavbarSkeleton.tsx');
  const heroContent = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  assert(navContent.includes('rounded-full'), 'Navbar CTA pill must be rounded-full');
  assert(heroContent.includes('rounded-full'), 'Hero CTA pill must be rounded-full');
});

suite.test('B6.1: Layout boundary - loading.tsx includes NavbarSkeleton at top', () => {
  assert(checkFileExists('src/app/loading.tsx'), 'src/app/loading.tsx must exist');
  const content = readFileContent('src/app/loading.tsx');
  const navIndex = content.indexOf('NavbarSkeleton');
  const heroIndex = content.indexOf('HeroSectionSkeleton');
  assert(navIndex !== -1, 'NavbarSkeleton must be imported and rendered in loading.tsx');
  if (heroIndex !== -1) {
    assert(navIndex < heroIndex, 'NavbarSkeleton must appear before HeroSectionSkeleton in loading.tsx');
  }
});

suite.test('B6.2: Layout boundary - loading.tsx does NOT duplicate Footer', () => {
  const rawContent = readFileContent('src/app/loading.tsx');
  const codeWithoutComments = stripComments(rawContent);
  assert(!codeWithoutComments.includes('<FooterSkeleton'), 'loading.tsx must NOT include FooterSkeleton (layout.tsx already renders <Footer />)');
  assert(!codeWithoutComments.includes('<Footer ') && !codeWithoutComments.includes('<Footer/>') && !codeWithoutComments.includes('<Footer />'), 'loading.tsx must NOT render <Footer />');
});

suite.test('B7.1: Props forwarding boundary in Skeleton primitive (...props spread)', () => {
  const content = readFileContent('src/components/ui/skeleton.tsx');
  assert(content.includes('...props'), 'Skeleton primitive must spread ...props onto the underlying div element');
});

suite.test('B7.2: Responsive breakpoint continuity across sections', () => {
  const hero = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  const how = checkFileExists('src/components/skeletons/HowItWorksSkeleton.tsx') ? readFileContent('src/components/skeletons/HowItWorksSkeleton.tsx') : '';
  assert(/md:|lg:/.test(hero), 'HeroSectionSkeleton must have responsive breakpoints');
  if (how) {
    assert(/md:|lg:/.test(how), 'HowItWorksSkeleton must have responsive breakpoints');
  }
});

if (process.argv[1] && process.argv[1].endsWith('tier2-boundary.test.mjs')) {
  suite.run().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
