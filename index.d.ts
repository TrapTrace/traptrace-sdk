/**
 * TypeScript Type Definitions for @traptrace/sdk
 */

export interface CatalogEntry {
  id: string;
  title: string;
  category: 'host-error' | 'cli-error' | 'rpc-error' | 'sdk-error';
  error_code: string;
  verified: boolean;
  summary: string;
  tags?: string[];
  severity?: 'info' | 'warning' | 'critical';
  symptoms?: string;
  root_causes?: string;
  solutions?: string;
}

export interface DiagnosticResult {
  raw: string;
  extractedError: string | null;
  matchedEntry: CatalogEntry | null;
  matchesCount: number;
  fix?: {
    title: string;
    buggy: string;
    remediated: string;
  } | null;
}

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
  passphrase: string;
}

export interface LintFinding {
  ruleId: string;
  name: string;
  severity: 'CRITICAL' | 'WARNING';
  message: string;
  lineNum: number;
  lineContent: string;
  remediation: string;
  errorId: string;
}

export interface LintReport {
  totalFindings: number;
  criticalCount: number;
  warningCount: number;
  findings: LintFinding[];
}

export interface GasProfileReport {
  cpu: {
    used: number;
    limit: number;
    percentage: number;
    status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  };
  memory: {
    used: number;
    limit: number;
    percentage: number;
    status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  };
  footprint: {
    readOnlyCount: number;
    readWriteCount: number;
  };
  fees: {
    stroops: number;
    xlm: number;
  };
}

export interface TtlHealthReport {
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'ARCHIVED';
  remainingLedgers: number;
  estimatedDaysRemaining: number;
  isArchived: boolean;
  needsRestoration: boolean;
  recommendedBumpLedgers: number;
}

export declare const NETWORKS: Record<'testnet' | 'futurenet' | 'mainnet', NetworkConfig>;
export declare const BUNDLED_ENTRIES: CatalogEntry[];

export declare function decodeDiagnosticString(diagnosticStr: string): DiagnosticResult;
export declare function searchErrors(query: string, options?: { category?: string }): CatalogEntry[];
export declare function validateAuthTree(xdrString: string): {
  isValid: boolean;
  status: string;
  requiredSigners: string[];
  functionName: string;
  issues: string[];
};

export declare function getAutoFix(errorId: string): {
  title: string;
  buggy: string;
  remediated: string;
} | null;

export declare function diagnoseSorobanError(errorString: string): DiagnosticResult;
export declare function lintContractCode(code: string): LintReport;
export declare function profileSimulation(simResult: Record<string, any>): GasProfileReport;
export declare function calculateTtlHealth(liveUntilLedger: number | string, currentLedger: number | string): TtlHealthReport;
export declare function estimateRentStroops(entryBytes: number, extendLedgers: number): {
  bytes: number;
  extendLedgers: number;
  estimatedStroops: number;
  estimatedXlm: number;
};
export declare function generateRustTest(errorId: string): {
  title: string;
  code: string;
};

export declare class TrapTraceClient {
  network: string;
  rpcUrl: string;
  passphrase: string;
  constructor(networkOrUrl?: string);
  callRpc(method: string, params?: Record<string, any>): Promise<any>;
  getHealth(): Promise<any>;
  getLatestLedger(): Promise<any>;
  simulateTransaction(transactionXdr: string): Promise<any>;
  getTransaction(txHash: string): Promise<any>;
}
