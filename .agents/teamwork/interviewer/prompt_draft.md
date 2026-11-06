Use a team of agents to refactor and clean up the codebase across the entire repository: eliminate unnecessary and waste code, refactor hard-to-understand logic into clean and professional code, and ensure zero breaking changes with no changes to the existing visual design.

Working directory: d:\InNeeds website
Integrity mode: development

## Requirements

### R1. Unused and Dead Code Elimination
Identify and safely remove unused code, dead functions, redundant files, and obsolete exports across the entire codebase.

### R2. Code Quality and Maintainability
Refactor complex, confusing, or hard-to-understand code into clean, well-structured, professional code while strictly preserving existing runtime behaviour.

### R3. Preservation of Design and Functionality
Maintain all existing UI designs, layouts, styling, and application behaviors exactly as they currently are, with no breaking changes.

## Acceptance Criteria

### Verification and Regression Prevention
- [ ] Project build command executes successfully with zero errors.
- [ ] Linting and typechecking commands pass with no new errors or warnings.
- [ ] No visual styling, UI layout, or user-facing design changes are introduced.
- [ ] All removed or refactored logic introduces no broken imports or runtime errors.
