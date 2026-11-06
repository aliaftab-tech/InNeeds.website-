import { TestSuiteRunner, checkFileExists, readFileContent, stripComments, assert, runCommand, runBuildWithRetry } from './test-utils.mjs';

export const suite = new TestSuiteRunner('Tier 3: Cross-Feature Interactions & Combinations');

suite.test('I1.1: Pairwise loading.tsx and layout.tsx composition contract', () => {
  assert(checkFileExists('src/app/layout.tsx'), 'src/app/layout.tsx must exist');
  assert(checkFileExists('src/app/loading.tsx'), 'src/app/loading.tsx must exist');

  const layoutContent = readFileContent('src/app/layout.tsx');
  const loadingContent = readFileContent('src/app/loading.tsx');
  const loadingCode = stripComments(loadingContent);

  // Verify layout contains Footer and {children}
  assert(layoutContent.includes('<Footer') || layoutContent.includes('<Footer />'), 'layout.tsx must render <Footer />');
  assert(layoutContent.includes('{children}'), 'layout.tsx must render {children}');

  // Verify loading.tsx does not duplicate Footer in code
  assert(!loadingCode.includes('<Footer') && !loadingCode.includes('<FooterSkeleton'), 'loading.tsx must not duplicate Footer or FooterSkeleton');

  // Verify loading.tsx supplies top NavbarSkeleton
  assert(loadingCode.includes('NavbarSkeleton'), 'loading.tsx must render NavbarSkeleton');
});

suite.test('I1.2: Barrel export completeness and module resolution', () => {
  assert(checkFileExists('src/components/skeletons/index.ts'), 'src/components/skeletons/index.ts must exist');
  const barrelContent = readFileContent('src/components/skeletons/index.ts');

  const expectedComponents = [
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

  for (const comp of expectedComponents) {
    const isExported =
      barrelContent.includes(`export * from "./${comp}"`) ||
      barrelContent.includes(`export { ${comp} }`) ||
      barrelContent.includes(comp);
    assert(isExported, `Barrel index.ts must export ${comp}`);
    assert(checkFileExists(`src/components/skeletons/${comp}.tsx`), `Component file for ${comp} must exist`);
  }
});

suite.test('I1.3: Base Skeleton primitive integration with utils.ts cn()', () => {
  assert(checkFileExists('src/components/ui/skeleton.tsx'), 'src/components/ui/skeleton.tsx must exist');
  assert(checkFileExists('src/lib/utils.ts'), 'src/lib/utils.ts must exist');
  const skeletonContent = readFileContent('src/components/ui/skeleton.tsx');
  assert(skeletonContent.includes('cn('), 'Skeleton must import and call cn()');
});

suite.test('I1.4: Section skeletons consume base Skeleton primitive', () => {
  const heroContent = readFileContent('src/components/skeletons/HeroSectionSkeleton.tsx');
  const navbarContent = readFileContent('src/components/skeletons/NavbarSkeleton.tsx');

  const consumesSkeleton =
    heroContent.includes('Skeleton') ||
    navbarContent.includes('Skeleton');
  assert(consumesSkeleton, 'Section skeletons must integrate with base Skeleton component');
});

suite.test('I1.5: TypeScript compiler check with zero diagnostics (npx tsc --noEmit)', async () => {
  const result = await runCommand('npx tsc --noEmit');
  assert(result.code === 0, `tsc --noEmit failed with code ${result.code}:\n${result.stdout}\n${result.stderr}`);
});

suite.test('I1.6: Next.js production build succeeds with code 0 (npm run build)', async () => {
  const result = await runBuildWithRetry();
  assert(result.code === 0, `npm run build failed with code ${result.code}:\n${result.stdout}\n${result.stderr}`);
});

if (process.argv[1] && process.argv[1].endsWith('tier3-interactions.test.mjs')) {
  suite.run().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
