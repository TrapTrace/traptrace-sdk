# ⚡ @traptrace/sdk

> JavaScript & TypeScript client library for Stellar Soroban smart contract error diagnostics, static AST linting, gas profiling, and test generation.

[![CI Status](https://img.shields.io/badge/CI-Passing-2FA98C.svg?style=flat-square)](https://github.com/TrapTrace/traptrace-sdk/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Soroban](https://img.shields.io/badge/Soroban-Protocol%2021-amber.svg?style=flat-square)](https://stellar.org)
[![Catalog](https://img.shields.io/badge/Catalog-29%20Verified%20Entries-blue.svg?style=flat-square)](https://github.com/TrapTrace/soroban-error-index)

---

## 📦 Installation

```bash
npm install @traptrace/sdk
# or
yarn add @traptrace/sdk
# or
pnpm add @traptrace/sdk
```

---

## 🚀 Key Features & Quickstart

### 1. Decode Cryptic Soroban Error Strings
Decode raw host traps or XDR error strings and get immediate matched root-cause diagnoses and Rust auto-fix snippets:

```typescript
import { diagnoseSorobanError } from '@traptrace/sdk';

const diagnosis = diagnoseSorobanError(
  "Error: HostError::ArithDomain overflow in calculate_reward"
);

console.log(diagnosis.matchedEntry.title);
// => "Arithmetic Error - Integer Overflow / Underflow / Division by Zero"

console.log(diagnosis.fix.remediated);
// => "let product = base.checked_mul(multiplier).ok_or(Error::ArithmeticOverflow)?;"
```

---

### 2. Static Soroban Smart Contract Linter
Scan contract Rust source code for unhandled unwraps, unguarded callers, raw arithmetic, and storage anti-patterns:

```typescript
import { lintContractCode } from '@traptrace/sdk';

const report = lintContractCode(`
pub fn transfer(env: Env, caller: Address, amount: i128) {
    let balances = env.storage().persistent().get(&caller).unwrap();
}
`);

console.log(`Found ${report.totalFindings} issues (${report.criticalCount} critical)`);
// report.findings => [{ ruleId: 'TT-LINT-001', name: 'UNSAFE_UNWRAP', lineNum: 3, ... }]
```

---

### 3. Gas & Resource Execution Profiler
Benchmark transaction execution costs, CPU instruction consumption, memory footprints, and fee estimations:

```typescript
import { profileSimulation } from '@traptrace/sdk';

const profile = profileSimulation(simResult);
console.log(`CPU: ${profile.cpu.percentage}% (${profile.cpu.used} / 100M insns) - Status: ${profile.cpu.status}`);
console.log(`Memory: ${profile.memory.percentage}% - Status: ${profile.memory.status}`);
console.log(`Min Resource Fee: ${profile.fees.xlm} XLM`);
```

---

### 4. Storage TTL Health & Rent Calculator
Calculate remaining Time-To-Live ledger thresholds and estimate rent restoration costs under CAP-0046:

```typescript
import { calculateTtlHealth, estimateRentStroops } from '@traptrace/sdk';

const health = calculateTtlHealth(4_350_000, 4_300_000);
console.log(`Status: ${health.status}, Remaining Ledgers: ${health.remainingLedgers}`);

const rent = estimateRentStroops(1000, 50_000); // 1000 bytes for 50,000 ledgers
console.log(`Estimated Rent: ${rent.estimatedXlm} XLM (${rent.estimatedStroops} stroops)`);
```

---

### 5. Soroban Rust Unit Test Generator
Generate idiomatic unit test templates to reproduce and prevent traps before on-chain deployment:

```typescript
import { generateRustTest } from '@traptrace/sdk';

const testFixture = generateRustTest('arith-error');
console.log(testFixture.code);
// => Generates #[test] #[should_panic] reproducing arithmetic overflow trap
```

---

### 6. Validate Contract Authorization Trees
Simulate invocation authorization hierarchies before submitting transactions:

```typescript
import { validateAuthTree } from '@traptrace/sdk';

const authCheck = validateAuthTree(invocationXdr);
if (!authCheck.isValid) {
  console.error('Authorization trap detected:', authCheck.issues);
}
```

---

### 7. Interactive Stellar Soroban RPC Client

```typescript
import { TrapTraceClient } from '@traptrace/sdk';

const client = new TrapTraceClient('testnet');

// Pre-flight simulate transaction
const sim = await client.simulateTransaction(txXdr);
console.log('Simulation Cost:', sim.cost);
```

---

### 8. Search Verified Knowledge Graph (Offline Database)
Query 29 testnet-verified smart contract error patterns offline with zero network latency:

```typescript
import { searchErrors, BUNDLED_ENTRIES } from '@traptrace/sdk';

const results = searchErrors('require_auth');
console.log(`Found ${results.length} matching error patterns from ${BUNDLED_ENTRIES.length} entries`);
```

---

## 📄 License
MIT © [TrapTrace Team](https://github.com/TrapTrace)
