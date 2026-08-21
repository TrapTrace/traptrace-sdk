/**
 * Soroban Diagnostic Event and XDR Error Decoder.
 */

import { BUNDLED_ENTRIES } from './data.js';

export function decodeDiagnosticString(diagnosticStr) {
  if (!diagnosticStr || typeof diagnosticStr !== 'string') {
    return {
      raw: '',
      extractedError: null,
      suggestedFix: null,
      matches: []
    };
  }

  const raw = diagnosticStr.trim();
  let extractedError = null;

  // Common Soroban host trap regex patterns
  const patterns = [
    { regex: /HostError::ArithDomain|arithmetic error|overflow|underflow|division by zero/i, id: 'arith-error' },
    { regex: /HostError::BudgetExceeded|cpu instructions limit|memory limit exceeded/i, id: 'wasm-memory-exhausted' },
    { regex: /require_auth|missing signature|unauthorized/i, id: 'require-auth-missing' },
    { regex: /invalid signature|signature verification failed/i, id: 'auth-invalid-signature' },
    { regex: /EntryArchived|TTL expired|storage entry not found/i, id: 'entry-archived-ttl-expired' },
    { regex: /ContractDataSizeExceedsLimit|storage size limit/i, id: 'contract-data-size-exceeds-limit' },
    { regex: /SubInvocationUserError|sub-contract call failed/i, id: 'sub-invocation-user-error' },
    { regex: /CryptoError|crypto verification failed/i, id: 'crypto-verification-failed' },
    { regex: /InvalidChainId|passphrase mismatch/i, id: 'invalid-chain-id' },
    { regex: /WasmVerificationFailed|malformed wasm/i, id: 'wasm-verification-failed' }
  ];

  for (const p of patterns) {
    if (p.regex.test(raw)) {
      extractedError = p.id;
      break;
    }
  }

  // Find matching catalog entry
  const matches = BUNDLED_ENTRIES.filter(e => {
    if (extractedError && e.id === extractedError) return true;
    const query = raw.toLowerCase();
    return (
      e.id.toLowerCase().includes(query) ||
      e.error_code.toLowerCase().includes(query) ||
      e.title.toLowerCase().includes(query)
    );
  });

  return {
    raw,
    extractedError,
    matchedEntry: matches[0] || null,
    matchesCount: matches.length
  };
}

export function searchErrors(query, options = {}) {
  if (!query || !query.trim()) return BUNDLED_ENTRIES;
  const q = query.toLowerCase().trim();
  return BUNDLED_ENTRIES.filter(e => {
    if (options.category && e.category !== options.category) return false;
    return (
      e.id.toLowerCase().includes(q) ||
      e.title.toLowerCase().includes(q) ||
      e.error_code.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q) ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes(q)))
    );
  });
}
