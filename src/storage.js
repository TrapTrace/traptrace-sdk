/**
 * TrapTrace Storage TTL & State Archival Management Utilities for Soroban (CAP-0046).
 */

export const MIN_RENT_STROOP_PER_LEDGER_BYTE = 0.001; // Approximate reference cost
export const CRITICAL_TTL_THRESHOLD_LEDGERS = 500;
export const WARNING_TTL_THRESHOLD_LEDGERS = 5000;

/**
 * Calculates health status and remaining days for a given Soroban storage key TTL.
 * Assuming ~5 seconds per Stellar ledger closing.
 */
export function calculateTtlHealth(liveUntilLedger, currentLedger) {
  const remainingLedgers = Math.max(0, Number(liveUntilLedger) - Number(currentLedger));
  const estimatedSecondsRemaining = remainingLedgers * 5;
  const estimatedHoursRemaining = estimatedSecondsRemaining / 3600;
  const estimatedDaysRemaining = estimatedHoursRemaining / 24;

  let status = 'HEALTHY';
  if (remainingLedgers === 0) {
    status = 'ARCHIVED';
  } else if (remainingLedgers < CRITICAL_TTL_THRESHOLD_LEDGERS) {
    status = 'CRITICAL';
  } else if (remainingLedgers < WARNING_TTL_THRESHOLD_LEDGERS) {
    status = 'WARNING';
  }

  return {
    status,
    remainingLedgers,
    estimatedDaysRemaining: Number(estimatedDaysRemaining.toFixed(1)),
    isArchived: remainingLedgers === 0,
    needsRestoration: remainingLedgers === 0,
    recommendedBumpLedgers: Math.max(0, 100_000 - remainingLedgers)
  };
}

/**
 * Estimates rent resource fee cost in stroops for extending a storage entry.
 */
export function estimateRentStroops(entryBytes, extendLedgers) {
  const bytes = Math.max(64, Number(entryBytes));
  const ledgers = Math.max(1, Number(extendLedgers));
  const rawFee = Math.ceil(bytes * ledgers * MIN_RENT_STROOP_PER_LEDGER_BYTE);
  return {
    bytes,
    extendLedgers: ledgers,
    estimatedStroops: rawFee,
    estimatedXlm: Number((rawFee / 10_000_000).toFixed(7))
  };
}
