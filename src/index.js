/**
 * TrapTrace JavaScript / TypeScript SDK.
 * Comprehensive diagnostics, error decoding, RPC client, and remediation for Stellar Soroban smart contracts.
 */

export { BUNDLED_ENTRIES } from './data.js';
export { decodeDiagnosticString, searchErrors } from './decoder.js';
export { TrapTraceClient, NETWORKS } from './client.js';
export { validateAuthTree } from './auth.js';
export { CODE_FIXES, getAutoFix } from './fixes.js';
export { lintContractCode, LINT_RULES } from './linter.js';
export { profileSimulation, MAX_CPU_INSTRUCTIONS, MAX_MEM_BYTES } from './profiler.js';
export { calculateTtlHealth, estimateRentStroops } from './storage.js';
export { generateRustTest, TEST_FIXTURES } from './test_generator.js';

import { decodeDiagnosticString } from './decoder.js';
import { getAutoFix } from './fixes.js';

export function diagnoseSorobanError(errorString) {
  const decoded = decodeDiagnosticString(errorString);
  const fix = decoded.extractedError ? getAutoFix(decoded.extractedError) : null;

  return {
    ...decoded,
    fix
  };
}
