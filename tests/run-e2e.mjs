import { suite as tier1Suite } from './tier1-features.test.mjs';
import { suite as tier2Suite } from './tier2-boundary.test.mjs';
import { suite as tier3Suite } from './tier3-interactions.test.mjs';
import { suite as tier4Suite } from './tier4-scenarios.test.mjs';

async function main() {
  console.log(`\n================================================================`);
  console.log(`  INNEEDS WEBSITE - DUAL-TRACK 4-TIER E2E TEST RUNNER`);
  console.log(`================================================================`);
  const globalStartTime = performance.now();

  const suites = [
    tier1Suite,
    tier2Suite,
    tier3Suite,
    tier4Suite,
  ];

  const suiteResults = [];
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  for (const s of suites) {
    const res = await s.run();
    suiteResults.push(res);
    totalTests += res.total;
    totalPassed += res.passed;
    totalFailed += res.failed;
  }

  const globalDuration = ((performance.now() - globalStartTime) / 1000).toFixed(2);

  console.log(`\n================================================================`);
  console.log(`                     EXECUTIVE TEST SUMMARY                     `);
  console.log(`================================================================`);
  console.log(` Total Execution Time: ${globalDuration}s\n`);

  console.log(`| Suite / Tier                                  | Total | Passed | Failed | Status |`);
  console.log(`|-----------------------------------------------|-------|--------|--------|--------|`);
  for (const sr of suiteResults) {
    const status = sr.failed === 0 ? '✓ PASS' : '✗ FAIL';
    const namePadded = sr.name.padEnd(45, ' ');
    const totalPadded = String(sr.total).padStart(5, ' ');
    const passedPadded = String(sr.passed).padStart(6, ' ');
    const failedPadded = String(sr.failed).padStart(6, ' ');
    console.log(`| ${namePadded} | ${totalPadded} | ${passedPadded} | ${failedPadded} | ${status.padEnd(6, ' ')} |`);
  }
  console.log(`|-----------------------------------------------|-------|--------|--------|--------|`);
  const totalSummary = `TOTAL                                         `.padEnd(45, ' ');
  console.log(`| ${totalSummary} | ${String(totalTests).padStart(5, ' ')} | ${String(totalPassed).padStart(6, ' ')} | ${String(totalFailed).padStart(6, ' ')} | ${(totalFailed === 0 ? '✓ PASS' : '✗ FAIL').padEnd(6, ' ')} |`);
  console.log(`================================================================\n`);

  if (totalFailed > 0) {
    console.log(`🚨 FAILURES DETECTED:`);
    for (const sr of suiteResults) {
      for (const t of sr.results) {
        if (t.status === 'FAIL') {
          console.log(` - [${sr.name}] ${t.description}`);
          console.log(`   Reason: ${t.error}`);
        }
      }
    }
    console.log(`\nExiting with error code 1.`);
    process.exit(1);
  } else {
    console.log(`🎉 ALL TESTS PASSED! Quality gate verified successfully.`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal error running test suite:', err);
  process.exit(1);
});
