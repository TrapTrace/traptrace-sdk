/**
 * Automated Rust Soroban Remediation Generator.
 */

export const CODE_FIXES = {
  'arith-error': {
    title: 'Checked Arithmetic Operations',
    buggy: 'let total = base * multiplier;',
    remediated: 'let total = base.checked_mul(multiplier).ok_or(Error::ArithmeticOverflow)?;'
  },
  'require-auth-missing': {
    title: 'Explicit Authorization Check',
    buggy: 'pub fn withdraw(env: Env, owner: Address, amount: i128) { ... }',
    remediated: 'pub fn withdraw(env: Env, owner: Address, amount: i128) {\n    owner.require_auth();\n    ...\n}'
  },
  'entry-archived-ttl-expired': {
    title: 'Storage State TTL Auto-Extension',
    buggy: 'env.storage().instance().set(&key, &val);',
    remediated: 'env.storage().instance().set(&key, &val);\nenv.storage().instance().extend_ttl(17280, 518400);'
  },
  'instance-already-initialized': {
    title: 'Idempotent Initialization Guard',
    buggy: 'env.storage().instance().set(&IS_INIT, &true);',
    remediated: 'if env.storage().instance().has(&IS_INIT) {\n    return Err(Error::AlreadyInitialized);\n}\nenv.storage().instance().set(&IS_INIT, &true);'
  },
  'cross-contract-reentrancy-blocked': {
    title: 'Checks-Effects-Interactions Pattern',
    buggy: 'token.transfer(&caller, &amount);\nenv.storage().persistent().set(&user, &new_bal);',
    remediated: 'env.storage().persistent().set(&user, &new_bal);\ntoken.transfer(&caller, &amount);'
  },
  'unauthorized-storage-access': {
    title: 'Cross-Contract Public Getter Interface',
    buggy: 'let val = env.storage().instance().get(&foreign_key);',
    remediated: 'let foreign_client = ForeignContractClient::new(&env, &target);\nlet val = foreign_client.get_state_value();'
  },
  'crypto-curve25519-invalid-scalar': {
    title: 'Canonical Point & Subgroup Validation',
    buggy: 'env.crypto().ed25519_verify(&raw_bytes, &msg, &sig);',
    remediated: 'let key: BytesN<32> = raw_bytes.try_into().map_err(|_| Error::InvalidKey)?;\nenv.crypto().ed25519_verify(&key, &msg, &sig);'
  },
  'tx-simulation-fee-insufficient': {
    title: 'Dynamic Fee Surge Buffer',
    buggy: 'const fee = 100;',
    remediated: 'const feeStats = await rpc.getFeeStats();\nconst fee = Math.ceil(feeStats.fee_charged.mode * 1.20);'
  },
  'contract-spec-missing': {
    title: 'Preserve Contract Spec Custom Section',
    buggy: 'wasm-opt -Oz --strip-all contract.wasm',
    remediated: 'stellar contract build\n# or: wasm-opt -Oz --strip-debug contract.wasm'
  }
};

export function getAutoFix(errorId) {
  return CODE_FIXES[errorId] || null;
}
