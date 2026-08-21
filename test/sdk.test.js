import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  BUNDLED_ENTRIES,
  decodeDiagnosticString,
  searchErrors,
  diagnoseSorobanError,
  validateAuthTree,
  getAutoFix,
  TrapTraceClient
} from '../src/index.js';

test('BUNDLED_ENTRIES contains minimum 21 verified entries', () => {
  assert.ok(Array.isArray(BUNDLED_ENTRIES));
  assert.ok(BUNDLED_ENTRIES.length >= 21);
});

test('decodeDiagnosticString identifies arithmetic error trap', () => {
  const res = decodeDiagnosticString('Error: HostError::ArithDomain overflow in calculation');
  assert.equal(res.extractedError, 'arith-error');
  assert.ok(res.matchedEntry);
  assert.equal(res.matchedEntry.id, 'arith-error');
});

test('diagnoseSorobanError returns matched entry and auto-fix snippet', () => {
  const diag = diagnoseSorobanError('require_auth missing for account G... in transfer');
  assert.equal(diag.extractedError, 'require-auth-missing');
  assert.ok(diag.fix);
  assert.ok(diag.fix.remediated.includes('owner.require_auth()'));
});

test('searchErrors filters accurately by query keyword', () => {
  const results = searchErrors('arithmetic');
  assert.ok(results.length > 0);
  assert.equal(results[0].id, 'arith-error');
});

test('validateAuthTree identifies valid XDR structure', () => {
  const res = validateAuthTree('AAAAAgAAAAB6QZ5cAAAAAQAAAAAAAAAAAAAAAFjX3nQAAAAAAAB1AAAA');
  assert.equal(res.isValid, true);
  assert.equal(res.status, 'PASS');
});

test('getAutoFix retrieves Rust remediation snippet', () => {
  const fix = getAutoFix('arith-error');
  assert.ok(fix);
  assert.ok(fix.remediated.includes('checked_mul'));
});

test('TrapTraceClient initializes default Testnet config', () => {
  const client = new TrapTraceClient('testnet');
  assert.equal(client.network, 'testnet');
  assert.equal(client.rpcUrl, 'https://soroban-testnet.stellar.org');
});
