# Contributing to `@traptrace/sdk`

Thank you for contributing to the TrapTrace JavaScript & TypeScript SDK!

---

## 🛠 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/TrapTrace/traptrace-sdk.git
cd traptrace-sdk

# Install dependencies
npm install

# Run the unit test suite
npm test
```

---

## 🏗 Architecture

The `@traptrace/sdk` package provides modular diagnostics for Stellar Soroban:
- `src/decoder.js`: Diagnostic string pattern matching and catalog lookup.
- `src/client.js`: JSON-RPC 2.0 network client for Stellar networks.
- `src/auth.js`: Structural authorization-entry XDR decoder; signatures remain unverified.
- `src/linter.js`: Heuristic regular-expression anti-pattern scanner for Soroban Rust code.
- `src/profiler.js`: Gas instruction and memory resource breakdown profiler.
- `src/storage.js`: Time-To-Live (TTL) health and rent estimator.
- `src/test_generator.js`: Soroban Rust test suite generator.
- `src/fixes.js`: Ready-to-paste Rust remediation blocks.
- `src/data.js`: Bundled offline error database of 35 cataloged entries.

---

## 🧪 Testing Guidelines

Always add unit tests in `test/sdk.test.js` using Node.js native test runner (`node --test`) for every new function or rule.
