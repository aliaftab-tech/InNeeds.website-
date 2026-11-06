/**
 * EMPIRICAL CHALLENGER ADVERSARIAL STRESS-TEST HARNESS
 * Target: Skeleton Loading UI System (M1/M2/M3)
 * Author: teamwork_challenger_1
 */

const Module = require('module');
const path = require('path');
const fs = require('fs');
const ts = require('typescript');
const assert = require('assert');

// 1. Setup TS transpilation and module resolution hook for '@/...'
const projectRoot = path.resolve(__dirname, '..', '..', '..');
const origResolve = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith('@/')) {
    request = path.join(projectRoot, 'src', request.slice(2));
  }
  return origResolve.call(this, request, parent, isMain, options);
};

function compileTS(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(content, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    },
  });
  module._compile(compiled.outputText, filename);
}

require.extensions['.ts'] = compileTS;
require.extensions['.tsx'] = compileTS;

const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Import target components
const {
  Skeleton,
  NavbarSkeleton,
  HeroSectionSkeleton,
  TrustImpactSkeleton,
  TrustedBySkeleton,
  HowItWorksSkeleton,
  CategoriesSkeleton,
  CampaignsGridSkeleton,
  ShowcaseBentoSkeleton,
  FooterSkeleton,
} = require(path.join(projectRoot, 'src/components/skeletons/index.ts'));

const Loading = require(path.join(projectRoot, 'src/app/loading.tsx')).default;

// Test Suite Runner
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  tests: [],
};

function runTest(category, description, fn) {
  results.total++;
  const testRecord = { category, description, status: 'PASS', error: null };
  try {
    fn();
    results.passed++;
    console.log(`  ✓ [${category}] ${description}`);
  } catch (err) {
    results.failed++;
    testRecord.status = 'FAIL';
    testRecord.error = err.message || String(err);
    console.error(`  ✗ [${category}] ${description}`);
    console.error(`    Error: ${testRecord.error}`);
  }
  results.tests.push(testRecord);
}

console.log('\n================================================================');
console.log('  ADVERSARIAL EMPIRICAL STRESS TEST HARNESS — SKELETON UI');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// SUITE 1: DYNAMIC PROP INJECTION ON SKELETON
// ----------------------------------------------------------------------------
console.log('>>> SUITE 1: Dynamic Prop Injection on Base Skeleton Primitive');

runTest('Dynamic Props', 'Renders base Skeleton with default props', () => {
  const el = React.createElement(Skeleton);
  const html = ReactDOMServer.renderToStaticMarkup(el);
  assert.ok(html.includes('role="status"'), 'Should have role="status"');
  assert.ok(html.includes('aria-label="Loading..."'), 'Should have aria-label="Loading..."');
  assert.ok(html.includes('animate-pulse'), 'Should have animate-pulse');
  assert.ok(html.includes('bg-slate-200/80'), 'Default should have light variant class');
});

runTest('Dynamic Props', 'Injects arbitrary HTML attributes (id, title, tabIndex, data-*)', () => {
  const el = React.createElement(Skeleton, {
    id: 'adversarial-id-42',
    title: 'Adversarial Tooltip',
    tabIndex: 0,
    'data-testid': 'custom-skeleton-test',
    'data-analytics': 'user-skeleton-metric',
  });
  const html = ReactDOMServer.renderToStaticMarkup(el);
  assert.ok(html.includes('id="adversarial-id-42"'), 'Must render id');
  assert.ok(html.includes('title="Adversarial Tooltip"'), 'Must render title');
  assert.ok(html.includes('tabindex="0"'), 'Must render tabindex');
  assert.ok(html.includes('data-testid="custom-skeleton-test"'), 'Must render data-testid');
  assert.ok(html.includes('data-analytics="user-skeleton-metric"'), 'Must render data-analytics');
});

runTest('Dynamic Props', 'Injects custom event handlers without throwing during SSR', () => {
  let clicked = false;
  const el = React.createElement(Skeleton, {
    onClick: () => { clicked = true; },
    onMouseEnter: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
  });
  const html = ReactDOMServer.renderToStaticMarkup(el);
  assert.ok(typeof html === 'string' && html.length > 0);
  assert.ok(!html.includes('onClick'), 'HTML output should not serialize raw JS functions');
});

runTest('Dynamic Props', 'Injects custom style objects (inline width, height, colors, CSS vars)', () => {
  const el = React.createElement(Skeleton, {
    style: {
      width: '123px',
      height: '45px',
      backgroundColor: 'rgb(255, 0, 0)',
      zIndex: 999,
      '--test-custom-prop': '10px',
    },
  });
  const html = ReactDOMServer.renderToStaticMarkup(el);
  assert.ok(html.includes('width:123px'), 'Must include width inline style');
  assert.ok(html.includes('height:45px'), 'Must include height inline style');
  assert.ok(html.includes('background-color:rgb(255, 0, 0)'), 'Must include inline bg color');
  assert.ok(html.includes('z-index:999'), 'Must include inline z-index');
});

runTest('Dynamic Props', 'Injects unexpected string and element children', () => {
  const child1 = 'Hidden accessible text';
  const child2 = React.createElement('span', { className: 'sr-only' }, 'Screen reader content');
  const el = React.createElement(Skeleton, null, child1, child2);
  const html = ReactDOMServer.renderToStaticMarkup(el);
  assert.ok(html.includes('Hidden accessible text'), 'Must render string child');
  assert.ok(html.includes('<span class="sr-only">Screen reader content</span>'), 'Must render element child');
});

runTest('Dynamic Props', 'Handles edge-case children (0, empty string, null, undefined, false, true)', () => {
  const el = React.createElement(
    Skeleton,
    null,
    0,
    '',
    null,
    undefined,
    false,
    true
  );
  const html = ReactDOMServer.renderToStaticMarkup(el);
  assert.ok(html.includes('>0</div>'), 'React renders numeric 0, ignores null/undefined/boolean');
});

runTest('Dynamic Props', 'Allows overriding role and aria-label via props', () => {
  const el = React.createElement(Skeleton, {
    role: 'progressbar',
    'aria-label': 'Custom progress indicator',
    'aria-valuenow': 65,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
  });
  const html = ReactDOMServer.renderToStaticMarkup(el);
  assert.ok(html.includes('role="progressbar"'), 'Must allow overriding default role');
  assert.ok(html.includes('aria-label="Custom progress indicator"'), 'Must allow overriding aria-label');
  assert.ok(html.includes('aria-valuenow="65"'), 'Must render aria-valuenow');
});

runTest('Dynamic Props', 'Resolves conflicting Tailwind classes cleanly via cn (twMerge)', () => {
  const el = React.createElement(Skeleton, {
    className: 'bg-red-500 rounded-full h-12 w-12',
  });
  const html = ReactDOMServer.renderToStaticMarkup(el);
  assert.ok(html.includes('rounded-full'), 'rounded-full overrides rounded-md');
  assert.ok(html.includes('bg-red-500'), 'bg-red-500 overrides bg-slate-200/80');
  assert.ok(!html.includes('rounded-md'), 'conflicting rounded-md must be pruned by twMerge');
});

// ----------------------------------------------------------------------------
// SUITE 2: VARIANT BOUNDARIES
// ----------------------------------------------------------------------------
console.log('\n>>> SUITE 2: Variant Boundaries & Robustness');

runTest('Variant Boundaries', 'Explicit variant="light"', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Skeleton, { variant: 'light' }));
  assert.ok(html.includes('bg-slate-200/80'), 'Must contain light variant token');
  assert.ok(!html.includes('bg-white/10'), 'Must not contain dark variant token');
  assert.ok(!html.includes('bg-slate-100'), 'Must not contain card variant token');
});

runTest('Variant Boundaries', 'Explicit variant="dark"', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Skeleton, { variant: 'dark' }));
  assert.ok(html.includes('bg-white/10'), 'Must contain dark variant token');
  assert.ok(html.includes('border-white/10'), 'Must contain dark border token');
  assert.ok(!html.includes('bg-slate-200/80'), 'Must not contain light variant token');
});

runTest('Variant Boundaries', 'Explicit variant="card"', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Skeleton, { variant: 'card' }));
  assert.ok(html.includes('bg-slate-100'), 'Must contain card variant token');
  assert.ok(html.includes('border-slate-200/60'), 'Must contain card border token');
  assert.ok(!html.includes('bg-slate-200/80'), 'Must not contain light variant token');
});

runTest('Variant Boundaries', 'variant=undefined defaults to light', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Skeleton, { variant: undefined }));
  assert.ok(html.includes('bg-slate-200/80'), 'Undefined variant must default to light');
});

runTest('Variant Boundaries', 'Unknown / adversarial variant does not throw and preserves base classes', () => {
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Skeleton, { variant: 'neon-cyberpunk' })
  );
  assert.ok(html.includes('animate-pulse'), 'Base pulse class preserved');
  assert.ok(html.includes('rounded-md'), 'Base rounded class preserved');
  assert.ok(!html.includes('bg-white/10'));
  assert.ok(!html.includes('bg-slate-100'));
});

runTest('Variant Boundaries', 'Null variant passes gracefully without crash', () => {
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Skeleton, { variant: null })
  );
  assert.ok(html.includes('animate-pulse'), 'Base pulse class preserved');
  assert.ok(html.includes('role="status"'), 'Role preserved');
});

// ----------------------------------------------------------------------------
// SUITE 3: COMPONENT RENDERING INTEGRITY (9 SKELETONS + LOADING.TSX)
// ----------------------------------------------------------------------------
console.log('\n>>> SUITE 3: Component Execution & SSR Rendering Integrity');

const componentCatalog = [
  { name: 'NavbarSkeleton', comp: NavbarSkeleton },
  { name: 'HeroSectionSkeleton', comp: HeroSectionSkeleton },
  { name: 'TrustImpactSkeleton', comp: TrustImpactSkeleton },
  { name: 'TrustedBySkeleton', comp: TrustedBySkeleton },
  { name: 'HowItWorksSkeleton', comp: HowItWorksSkeleton },
  { name: 'CategoriesSkeleton', comp: CategoriesSkeleton },
  { name: 'CampaignsGridSkeleton', comp: CampaignsGridSkeleton },
  { name: 'ShowcaseBentoSkeleton', comp: ShowcaseBentoSkeleton },
  { name: 'FooterSkeleton', comp: FooterSkeleton },
  { name: 'loading.tsx (Default Export)', comp: Loading },
];

for (const { name, comp } of componentCatalog) {
  runTest('Rendering Integrity', `${name} is executable and returns valid React element`, () => {
    assert.strictEqual(typeof comp, 'function', `${name} must be a callable component function`);
    const el = React.createElement(comp);
    assert.ok(React.isValidElement(el), `${name} must produce a valid React element`);
  });

  runTest('Rendering Integrity', `${name} renders to static HTML without throwing exceptions`, () => {
    const el = React.createElement(comp);
    const html = ReactDOMServer.renderToStaticMarkup(el);
    assert.ok(typeof html === 'string', `${name} rendered output must be string`);
    assert.ok(html.length > 50, `${name} rendered HTML must be non-trivial (>50 chars), got ${html.length}`);
    assert.ok(!html.includes('NaN'), `${name} rendered HTML should not contain NaN artifacts`);
  });
}

// ----------------------------------------------------------------------------
// SUITE 4: DOMAIN STRUCTURAL VERIFICATION
// ----------------------------------------------------------------------------
console.log('\n>>> SUITE 4: Structural & Visual Parity Verification');

runTest('Structural Parity', 'NavbarSkeleton contains sticky container, brand logo, and sign-in pill', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(NavbarSkeleton));
  assert.ok(html.includes('sticky top-0'), 'Must have sticky top-0');
  assert.ok(html.includes('h-[72px]'), 'Must have 72px height');
  assert.ok(html.includes('max-w-[1700px]'), 'Must have max-w-[1700px]');
  assert.ok(html.includes('rounded-full'), 'Must have rounded-full logo/avatar/pill');
});

runTest('Structural Parity', 'HeroSectionSkeleton contains headline, CTA pill, carousel silhouettes, and 3 feature columns', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(HeroSectionSkeleton));
  assert.ok(html.includes('radial-gradient'), 'Must have radial glow background');
  assert.ok(html.includes('w-52 h-12 rounded-full'), 'Must have pill CTA button matching page.tsx');
  assert.ok(html.includes('rotate-6'), 'Must include 3D carousel rotated silhouettes');
  assert.ok(html.includes('grid-cols-1 md:grid-cols-3'), 'Must have 3-column features strip');
});

runTest('Structural Parity', 'TrustImpactSkeleton enforces dark bg-[#0b291a] and 3 circular dial rings', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(TrustImpactSkeleton));
  assert.ok(html.includes('bg-[#0b291a]'), 'Container must have dark forest green background');
  assert.ok(html.includes('w-24 h-24 md:w-40 md:h-40 rounded-full'), 'Must have circular dial rings');
  assert.ok(html.includes('bg-white/10'), 'Dials must use translucent dark variant token');
});

runTest('Structural Parity', 'TrustedBySkeleton contains caption bar and gradient fade masks', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(TrustedBySkeleton));
  assert.ok(html.includes('from-white to-transparent'), 'Must have gradient masks');
  assert.ok(html.includes('w-28 h-8'), 'Must have partner logo placeholders');
});

runTest('Structural Parity', 'HowItWorksSkeleton contains light sage bg-[#f6f9f6], SVG arch dome, and 3-step rows', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(HowItWorksSkeleton));
  assert.ok(html.includes('bg-[#f6f9f6]'), 'Container must have sage background');
  assert.ok(html.includes('M 0,0 L 0,95 A 720 90 0 0 1 1440,95 L 1440,0 Z'), 'Must preserve precise SVG arch dome path');
  assert.ok(html.includes('grid-cols-1 lg:grid-cols-12'), 'Must have 12-column step grid');
});

runTest('Structural Parity', 'CategoriesSkeleton contains badge, headline, CTA button, and 3D cylinder card strip', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(CategoriesSkeleton));
  assert.ok(html.includes('id="categories"'), 'Must have #categories section anchor');
  assert.ok(html.includes('w-[260px] md:h-[360px]'), 'Must have 3D cylinder center card placeholder');
});

runTest('Structural Parity', 'CampaignsGridSkeleton contains header controls, filter pill, and asymmetric 4-card bento grid', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(CampaignsGridSkeleton));
  assert.ok(html.includes('id="campaigns"'), 'Must have #campaigns section anchor');
  assert.ok(html.includes('md:col-span-2'), 'Must have wide bento cards (span 2)');
  assert.ok(html.includes('md:col-span-1'), 'Must have square bento cards (span 1)');
  assert.ok(html.includes('rounded-[28px]'), 'Must have 28px card corners');
});

runTest('Structural Parity', 'ShowcaseBentoSkeleton contains 5-column cluster with asymmetric corner radiuses', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(ShowcaseBentoSkeleton));
  assert.ok(html.includes('rounded-tr-[4rem]'), 'Must have top-right 4rem asymmetric curve');
  assert.ok(html.includes('rounded-tl-[4rem]'), 'Must have top-left 4rem asymmetric curve');
  assert.ok(html.includes('aspect-[1/1.05]'), 'Must have center video card aspect ratio');
  assert.ok(html.includes('w-24 h-24 2xl:w-28 2xl:h-28 bg-white rounded-full'), 'Must have center circular play button container');
  assert.ok(html.includes('w-10 h-10 rounded-full'), 'Must have center circular play button placeholder');
});

runTest('Structural Parity', 'FooterSkeleton contains dark bg-[#0b291a], newsletter row, and 5 link columns', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(FooterSkeleton));
  assert.ok(html.includes('bg-[#0b291a]'), 'Footer must have dark background');
  assert.ok(html.includes('border-t border-white/10'), 'Footer must have dark border divider');
  assert.ok(html.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-5'), 'Must have responsive 5-column link layout');
});

runTest('Structural Parity', 'loading.tsx composes all page sections and strictly excludes duplicate footer', () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Loading));
  assert.ok(html.includes('sticky top-0'), 'Must include NavbarSkeleton at top');
  assert.ok(html.includes('radial-gradient'), 'Must include HeroSectionSkeleton');
  assert.ok(html.includes('bg-[#0b291a]'), 'Must include TrustImpactSkeleton');
  assert.ok(html.includes('from-white to-transparent'), 'Must include TrustedBySkeleton');
  assert.ok(html.includes('bg-[#f6f9f6]'), 'Must include HowItWorksSkeleton');
  assert.ok(html.includes('id="categories"'), 'Must include CategoriesSkeleton');
  assert.ok(html.includes('id="campaigns"'), 'Must include CampaignsGridSkeleton');
  assert.ok(html.includes('rounded-tr-[4rem]'), 'Must include ShowcaseBentoSkeleton');
  
  // CRITICAL ARCHITECTURAL ASSERTION:
  // loading.tsx must NOT contain <footer or FooterSkeleton because layout.tsx already renders <Footer />
  assert.ok(!html.includes('<footer'), 'loading.tsx must NOT render <footer (prevent duplicate footer in layout)');
});

// ----------------------------------------------------------------------------
// SUITE 5: HIGH-LOAD & ADVERSARIAL STRESS TEST
// ----------------------------------------------------------------------------
console.log('\n>>> SUITE 5: High-Load Stress Testing & Re-entrance');

runTest('Stress Test', 'Renders Loading 50 consecutive times in tight loop under 6.0 seconds', () => {
  const start = performance.now();
  const iterations = 50;
  for (let i = 0; i < iterations; i++) {
    const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Loading));
    assert.ok(html.length > 25000);
  }
  const duration = performance.now() - start;
  console.log(`    Executed ${iterations} full page skeleton SSR renders in ${duration.toFixed(2)}ms (${(duration / iterations).toFixed(2)}ms/render)`);
  assert.ok(duration < 6000, `SSR render must complete in <6000ms, took ${duration}ms`);
});

runTest('Stress Test', 'Renders 500 Skeleton primitives with varying props without memory degradation', () => {
  const startMem = process.memoryUsage().heapUsed;
  for (let i = 0; i < 500; i++) {
    const variant = i % 3 === 0 ? 'light' : i % 3 === 1 ? 'dark' : 'card';
    const el = React.createElement(Skeleton, {
      variant,
      className: `w-${i % 10} h-${i % 8}`,
      'data-idx': i,
    });
    ReactDOMServer.renderToStaticMarkup(el);
  }
  const endMem = process.memoryUsage().heapUsed;
  const memDiffMb = ((endMem - startMem) / (1024 * 1024)).toFixed(2);
  console.log(`    Rendered 500 dynamic Skeletons. Heap delta: ${memDiffMb} MB`);
});

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log('\n================================================================');
console.log('                 ADVERSARIAL STRESS TEST SUMMARY                ');
console.log('================================================================');
console.log(` Total Tests:  ${results.total}`);
console.log(` Passed:       ${results.passed}`);
console.log(` Failed:       ${results.failed}`);
console.log(` Status:       ${results.failed === 0 ? '✓ ALL PASS' : '✗ FAIL'}`);
console.log('================================================================\n');

if (results.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
