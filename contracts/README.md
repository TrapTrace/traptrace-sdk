# 🏛️ TrapTrace Soroban Diagnostic Sandbox Contract

This directory contains the reference smart contract used by `@traptrace/sdk` to verify on-chain error parsing, arithmetic trap reproduction, and invocation authorization flows against live Stellar networks.

---

## 📡 Live Testnet Deployment

| Parameter | Value |
|---|---|
| **Contract ID** | `CD3WZZJXRE6KBHFPUKYS53BKDZRNCWUT4AVD5JHSWRH4LKFXZ6URCWXL` |
| **Network** | Stellar Testnet (`Test SDF Network ; September 2015`) |
| **WASM Hash** | `ba3d7ff61edbf57db778868df3474ba855b990b3d2e42125ce58ec1c26cd4741` |
| **Deployer Address** | `GDW7WKICDI2SMXNRCG3T22GVHPIKGG75H3PMDDCC7V67RYERAZALVV6W` |
| **Stellar.Expert** | [View on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CD3WZZJXRE6KBHFPUKYS53BKDZRNCWUT4AVD5JHSWRH4LKFXZ6URCWXL) |
| **Stellar Lab** | [View in Stellar Lab](https://lab.stellar.org/r/testnet/contract/CD3WZZJXRE6KBHFPUKYS53BKDZRNCWUT4AVD5JHSWRH4LKFXZ6URCWXL) |

---

## 🛠️ Exported Endpoints

1. **`get_info() -> Vec<String>`**  
   Returns `["TrapTrace", "Soroban Diagnostic Sandbox v1.0"]` for service handshake and SDK connectivity validation.

2. **`version() -> u32`**  
   Returns the protocol compatibility version integer (`1`).

3. **`trap_arith(a: u64, b: u64) -> u64`**  
   Calculates `a + b` using checked arithmetic. If `a + b > u64::MAX`, deliberately causes a panic trap (`"TrapTrace: Arithmetic Overflow Trap"`) to test `@traptrace/sdk`'s `diagnoseSorobanError()` and simulation profiler.

4. **`hello(to: String) -> Vec<String>`**  
   Basic invocation endpoint returning `["TrapTrace", to]`.

---

## 🧪 Running Tests & Building

```bash
# Run unit test suite
cargo test

# Build WASM bytecode
stellar contract build
```
