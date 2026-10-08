import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Address, Keypair, xdr } from '@stellar/stellar-sdk';

import {
  BUNDLED_ENTRIES,
  decodeDiagnosticString,
  searchErrors,
  diagnoseSorobanError,
  validateAuthTree,
  getAutoFix,
  TrapTraceClient,
  lintContractCode,
  profileSimulation,
  calculateTtlHealth,
  estimateRentStroops,
  generateRustTest
} from '../src/index.js';

test('BUNDLED_ENTRIES contains 35 catalog entries without unsupported verification claims', () => {
  assert.ok(Array.isArray(BUNDLED_ENTRIES));
  assert.ok(BUNDLED_ENTRIES.length >= 35);
  assert.ok(BUNDLED_ENTRIES.every(entry => entry.verified === false));
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

function authEntry(credentials = xdr.SorobanCredentials.sorobanCredentialsSourceAccount()) {
  return new xdr.SorobanAuthorizationEntry({ credentials,
    rootInvocation: new xdr.SorobanAuthorizedInvocation({
      function: xdr.SorobanAuthorizedFunction.sorobanAuthorizedFunctionTypeContractFn(
        new xdr.InvokeContractArgs({ contractAddress: Address.contract(Buffer.alloc(32, 1)).toScAddress(),
          functionName: 'transfer', args: [] })), subInvocations: [],
    }),
  }).toXDR('base64');
}

test('valid authorization entry is decoded without asserting valid signatures', () => {
  const res = validateAuthTree(authEntry());
  assert.equal(res.isValid, true);
  assert.equal(res.status, 'REVIEW_REQUIRED');
  assert.equal(res.signaturesVerified, false);
  assert.equal(res.functionName, 'transfer');
  assert.deepEqual(res.requiredSigners, []);
});

test('address credentials report the actual address and remain unverified', () => {
  const address = Keypair.random().publicKey();
  for (const kind of ['sorobanCredentialsAddress', 'sorobanCredentialsAddressV2']) {
    const encoded = authEntry(xdr.SorobanCredentials[kind](new xdr.SorobanAddressCredentials({
      address: Address.fromString(address).toScAddress(), nonce: xdr.Int64.fromString('1'),
      signatureExpirationLedger: 123, signature: xdr.ScVal.scvVoid(),
    })));
    const report = validateAuthTree(encoded);
    assert.equal(report.status, 'REVIEW_REQUIRED');
    assert.deepEqual(report.requiredSigners, [address]);
    assert.equal(report.signaturesVerified, false);
  }
});

test('arbitrary text, truncated XDR, trailing bytes and wrong XDR type fail closed', () => {
  const encoded = authEntry();
  for (const input of [null, '', 'this is definitely not valid XDR or a signature',
    'AAAAAgAAAAB6QZ5cAAAAAQAAAAAAAAAAAAAAAFjX3nQAAAAAAAB1AAAA',
    encoded.slice(0, -8), Buffer.concat([Buffer.from(encoded, 'base64'), Buffer.alloc(4)]).toString('base64'),
    xdr.ScVal.scvVoid().toXDR('base64')]) {
    const report = validateAuthTree(input);
    assert.equal(report.isValid, false);
    assert.equal(report.status, 'FAIL');
    assert.equal(report.signaturesVerified, false);
    assert.ok(report.issues.length);
  }
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

test('lintContractCode detects unhandled unwrap and unguarded caller', () => {
  const badCode = `
  pub fn transfer(env: Env, caller: Address) {
      let opt = items.get(0).unwrap();
  }
  `;
  const report = lintContractCode(badCode);
  assert.ok(report.totalFindings >= 2);
  assert.ok(report.criticalCount >= 2);
});

test('profileSimulation computes CPU and memory percentages correctly', () => {
  const mockSim = {
    cost: { cpuInsns: 50_000_000, memBytes: 20_971_520 },
    minResourceFee: 1_500_000,
    transactionData: { footprint: { readOnly: ['k1'], readWrite: ['w1'] } }
  };
  const profile = profileSimulation(mockSim);
  assert.equal(profile.cpu.percentage, 50);
  assert.equal(profile.memory.percentage, 50);
  assert.equal(profile.footprint.readOnlyCount, 1);
  assert.equal(profile.fees.stroops, 1_500_000);
});

test('calculateTtlHealth estimates expiration status and remaining ledgers', () => {
  const healthActive = calculateTtlHealth(4_300_000, 4_250_000);
  assert.equal(healthActive.status, 'HEALTHY');
  assert.equal(healthActive.remainingLedgers, 50_000);

  const healthArchived = calculateTtlHealth(4_200_000, 4_250_000);
  assert.equal(healthArchived.status, 'ARCHIVED');
  assert.equal(healthArchived.isArchived, true);
});

test('estimateRentStroops calculates correct fee estimations', () => {
  const rent = estimateRentStroops(1000, 10_000);
  assert.ok(rent.estimatedStroops > 0);
  assert.ok(rent.estimatedXlm > 0);
});

test('generateRustTest returns valid Rust test template', () => {
  const testArith = generateRustTest('arith-error');
  assert.ok(testArith.code.includes('#[test]'));
  assert.ok(testArith.code.includes('test_reproduce_arith_overflow_panic'));
});
