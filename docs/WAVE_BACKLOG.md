# Wave engineering backlog

Drafted October 8, 2026 against current implementation. These are proposed contributor tasks, not Wave enrollment or earned points. Complexity requires maintainer review in the app.

## 1. Add recursive authorization-tree and credential fixtures

## Context

Cover nested calls, create-contract invocations and unsupported credential kinds with canonical XDR; malformed entries must fail without invented signers.

## Acceptance criteria

- Implement and document the specific behavior above.
- Cover positive, negative and unavailable-input cases appropriate to the change.
- Pass the repository documented build/test checks and required CI.
- Preserve exact identities/amounts and uncertain evidence outcomes.

## Relevant files

src/auth.js, test/sdk.test.js

## Proposed complexity

medium; planning only. Actual Wave complexity and enrollment are set by maintainers in the Drips app.

## Contribution

Open a focused feat/fix/test/docs branch. PRs explain behavior and actual validation and include Closes #<issue_id>. Follow CONTRIBUTING.md and SECURITY.md.

## 2. Verify nonce and expiry using explicit network context

## Context

Design an opt-in verifier with reviewed network binding and signer policy; expired/noncanonical signatures fail, and structural decoding stays separately labeled.

## Acceptance criteria

- Implement and document the specific behavior above.
- Cover positive, negative and unavailable-input cases appropriate to the change.
- Pass the repository documented build/test checks and required CI.
- Preserve exact identities/amounts and uncertain evidence outcomes.

## Relevant files

src/auth.js, index.d.ts

## Proposed complexity

high; planning only. Actual Wave complexity and enrollment are set by maintainers in the Drips app.

## Contribution

Open a focused feat/fix/test/docs branch. PRs explain behavior and actual validation and include Closes #<issue_id>. Follow CONTRIBUTING.md and SECURITY.md.

## 3. Replace whole-file auth lint suppression with scoped analysis

## Context

A require_auth in one function must not hide an unguarded mutation in another; cover comments, multiline functions and false positives before AST claims.

## Acceptance criteria

- Implement and document the specific behavior above.
- Cover positive, negative and unavailable-input cases appropriate to the change.
- Pass the repository documented build/test checks and required CI.
- Preserve exact identities/amounts and uncertain evidence outcomes.

## Relevant files

src/linter.js

## Proposed complexity

high; planning only. Actual Wave complexity and enrollment are set by maintainers in the Drips app.

## Contribution

Open a focused feat/fix/test/docs branch. PRs explain behavior and actual validation and include Closes #<issue_id>. Follow CONTRIBUTING.md and SECURITY.md.

## 4. Validate resource profiler input and estimate provenance

## Context

Reject negative/nonfinite input, distinguish unavailable cost from zero and identify limits/rent assumptions rather than asserting execution costs.

## Acceptance criteria

- Implement and document the specific behavior above.
- Cover positive, negative and unavailable-input cases appropriate to the change.
- Pass the repository documented build/test checks and required CI.
- Preserve exact identities/amounts and uncertain evidence outcomes.

## Relevant files

src/profiler.js, test/sdk.test.js

## Proposed complexity

medium; planning only. Actual Wave complexity and enrollment are set by maintainers in the Drips app.

## Contribution

Open a focused feat/fix/test/docs branch. PRs explain behavior and actual validation and include Closes #<issue_id>. Follow CONTRIBUTING.md and SECURITY.md.

## 5. Verify declarations through an installed consumer

## Context

Compile positive and negative TypeScript consumers against a packed artifact; reflect actual invocation/credential shapes and structural-only status.

## Acceptance criteria

- Implement and document the specific behavior above.
- Cover positive, negative and unavailable-input cases appropriate to the change.
- Pass the repository documented build/test checks and required CI.
- Preserve exact identities/amounts and uncertain evidence outcomes.

## Relevant files

index.d.ts, package.json

## Proposed complexity

medium; planning only. Actual Wave complexity and enrollment are set by maintainers in the Drips app.

## Contribution

Open a focused feat/fix/test/docs branch. PRs explain behavior and actual validation and include Closes #<issue_id>. Follow CONTRIBUTING.md and SECURITY.md.

## 6. Document supported auth input types and migration

## Context

Explain authorization-entry versus envelope XDR, REVIEW_REQUIRED behavior and the added Stellar SDK dependency; include runnable valid and malformed examples.

## Acceptance criteria

- Implement and document the specific behavior above.
- Cover positive, negative and unavailable-input cases appropriate to the change.
- Pass the repository documented build/test checks and required CI.
- Preserve exact identities/amounts and uncertain evidence outcomes.

## Relevant files

README.md, index.d.ts

## Proposed complexity

trivial; planning only. Actual Wave complexity and enrollment are set by maintainers in the Drips app.

## Contribution

Open a focused feat/fix/test/docs branch. PRs explain behavior and actual validation and include Closes #<issue_id>. Follow CONTRIBUTING.md and SECURITY.md.

## Published contributor issues

- [Add recursive authorization-tree and credential fixtures](https://github.com/TrapTrace/traptrace-sdk/issues/1) — proposed medium.
- [Verify nonce and expiry using explicit network context](https://github.com/TrapTrace/traptrace-sdk/issues/2) — proposed high.
- [Replace whole-file auth lint suppression with scoped analysis](https://github.com/TrapTrace/traptrace-sdk/issues/3) — proposed high.
- [Validate resource profiler input and estimate provenance](https://github.com/TrapTrace/traptrace-sdk/issues/4) — proposed medium.
- [Verify declarations through an installed consumer](https://github.com/TrapTrace/traptrace-sdk/issues/5) — proposed medium.
- [Document supported auth input types and migration](https://github.com/TrapTrace/traptrace-sdk/issues/6) — proposed trivial.
