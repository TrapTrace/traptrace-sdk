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
  }
};

export function getAutoFix(errorId) {
  return CODE_FIXES[errorId] || null;
}
