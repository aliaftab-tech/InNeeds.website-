import fs from 'node:fs';
import path from 'node:path';
import { TestSuiteRunner, checkFileExists, readFileContent, assert, PROJECT_ROOT } from './test-utils.mjs';

export const suite = new TestSuiteRunner('Tier 4: Real-World Application Scenarios');

suite.test('S1.1: Next.js App Router Suspense contract compliance for loading.tsx', () => {
  assert(checkFileExists('src/app/loading.tsx'), 'src/app/loading.tsx must exist');
  const content = readFileContent('src/app/loading.tsx');

  // Verify default export exists
  assert(/export\s+default\s+function|export\s+default\s+Loading/.test(content), 'loading.tsx must have a default export');

  // Verify loading.tsx does not introduce blocking async/await at top-level
  assert(!/async\s+function\s+Loading/.test(content), 'loading.tsx should render synchronously to prevent cascading Suspense deadlocks');

  // Verify it returns JSX elements
  assert(content.includes('<') && content.includes('>'), 'loading.tsx must render JSX elements');
});

suite.test('S1.2: Cumulative Layout Shift (CLS) mitigation - Container max-width alignment', () => {
  const pageContent = readFileContent('src/app/page.tsx');
  const navSkeleton = readFileContent('src/components/skeletons/NavbarSkeleton.tsx');

  // Check if max-w-[1700px] used in page navbar is reflected in NavbarSkeleton
  if (pageContent.includes('max-w-[1700px]')) {
    assert(navSkeleton.includes('max-w-[1700px]'), 'NavbarSkeleton must mirror max-w-[1700px] from page.tsx to prevent CLS');
  }

  // Check Campaigns grid max-width
  if (checkFileExists('src/components/skeletons/CampaignsGridSkeleton.tsx')) {
    const campaignsSkeleton = readFileContent('src/components/skeletons/CampaignsGridSkeleton.tsx');
    if (pageContent.includes('max-w-[1600px]')) {
      assert(campaignsSkeleton.includes('max-w-[1600px]'), 'CampaignsGridSkeleton must mirror max-w-[1600px] to prevent CLS');
    }
  }
});

suite.test('S1.3: Cumulative Layout Shift (CLS) mitigation - Asymmetric bento grid aspect ratio alignment', () => {
  assert(checkFileExists('src/components/skeletons/CampaignsGridSkeleton.tsx'), 'CampaignsGridSkeleton must exist');
  const campaignsSkeleton = readFileContent('src/components/skeletons/CampaignsGridSkeleton.tsx');

  // Replicating min-h and rounded-[28px] of real campaigns cards
  assert(
    campaignsSkeleton.includes('rounded-[28px]') || campaignsSkeleton.includes('rounded-3xl'),
    'CampaignsGridSkeleton cards must use rounded-[28px] or rounded-3xl to match page cards'
  );
  assert(
    campaignsSkeleton.includes('min-h-') || campaignsSkeleton.includes('h-'),
    'CampaignsGridSkeleton cards must enforce fixed/minimum heights to preserve space'
  );
});

suite.test('S1.4: Production build artifact verification (.next folder integrity)', () => {
  const dotNextDir = path.join(PROJECT_ROOT, '.next');
  assert(fs.existsSync(dotNextDir), '.next build output directory must exist');

  const buildManifest = path.join(dotNextDir, 'build-manifest.json');
  assert(fs.existsSync(buildManifest), '.next/build-manifest.json must exist');

  const buildManifestContent = fs.readFileSync(buildManifest, 'utf8');
  assert(buildManifestContent.includes('polyfill') || buildManifestContent.includes('pages'), 'Build manifest must contain valid chunks');
});

suite.test('S1.5: Production App Router manifest verification', () => {
  const appBuildManifest = path.join(PROJECT_ROOT, '.next', 'app-build-manifest.json');
  if (fs.existsSync(appBuildManifest)) {
    const manifest = JSON.parse(fs.readFileSync(appBuildManifest, 'utf8'));
    assert(manifest.pages, 'app-build-manifest must list compiled App Router pages');
    assert(manifest.pages['/page'] || manifest.pages['/'], 'App Router pages must include root page');
  }
});

if (process.argv[1] && process.argv[1].endsWith('tier4-scenarios.test.mjs')) {
  suite.run().then(res => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
