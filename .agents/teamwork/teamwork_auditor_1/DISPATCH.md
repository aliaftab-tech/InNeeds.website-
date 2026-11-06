## 2026-11-06T11:41:40Z
You are teamwork_auditor_1.
Your working directory is: d:\InNeeds website\.agents\teamwork\teamwork_auditor_1\

MANDATORY FIRST STEP:
Read the user request file at:
d:\InNeeds website\.agents\teamwork\ORIGINAL_REQUEST.md

Read the project specification at:
d:\InNeeds website\.agents\teamwork\orchestrator\PROJECT.md

OBJECTIVE:
Perform a strict, forensic integrity audit of the Skeleton Loading UI implementation:
1. Verify authenticity of implementation:
   - Audit `src/components/ui/skeleton.tsx`, `src/components/skeletons/`, `src/app/loading.tsx`, `src/app/globals.css`, and `tests/`.
   - Check for cheating patterns:
     - Are any test results hardcoded?
     - Are there dummy/facade implementations that don't actually render or function?
     - Are tests superficial or tautological?
     - Are git commits or files fabricated?
     - Does `loading.tsx` genuinely render valid section skeletons?
     - Do the skeleton components genuinely render HTML structures with pulse/shimmer animation?
2. Execute independent verification:
   - Run `node tests/run-e2e.mjs`
   - Run `npx tsc --noEmit`
   - Run `npm run build`
3. Deliver a binary verdict:
   - CLEAN (no integrity violations found, genuine implementation)
   - INTEGRITY VIOLATION (cheating, facade, or circumvention detected)

OUTPUT:
- Write notes to: d:\InNeeds website\.agents\teamwork\teamwork_auditor_1\analysis.md
- Write final forensic audit report to: d:\InNeeds website\.agents\teamwork\teamwork_auditor_1\handoff.md
- Send completion message to orchestrator with your verdict.
