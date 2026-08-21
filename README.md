# ⚡ @traptrace/sdk

> JavaScript & TypeScript SDK for Stellar Soroban smart contract error decoding, on-chain transaction failure diagnostics, and remediation.

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Soroban](https://img.shields.io/badge/Soroban-Protocol%2021-amber.svg)](https://stellar.org)

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

## 🚀 Quickstart

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

### 2. Search Verified Soroban Error Knowledge Graph
Query 21 testnet-verified smart contract error patterns offline with zero network latency:

```typescript
import { searchErrors } from '@traptrace/sdk';

const results = searchErrors('require_auth');
console.log(`Found ${results.length} matching error patterns`);
```

---

### 3. Validate Contract Authorization Trees
Simulate invocation authorization hierarchies before submitting transactions:

```typescript
import { validateAuthTree } from '@traptrace/sdk';

const authCheck = validateAuthTree(invocationXdr);
if (!authCheck.isValid) {
  console.error('Authorization trap detected:', authCheck.issues);
}
```

---

### 4. Interactive Stellar Soroban RPC Client

```typescript
import { TrapTraceClient } from '@traptrace/sdk';

const client = new TrapTraceClient('testnet');

// Pre-flight simulate transaction
const sim = await client.simulateTransaction(txXdr);
console.log('CPU Gas Instructions:', sim.minResourceFee);
```

---

## 📄 License
MIT © [TrapTrace Team](https://github.com/TrapTrace)
