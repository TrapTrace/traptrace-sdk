/**
 * TrapTrace Soroban RPC Client.
 */

export const NETWORKS = {
  testnet: {
    name: 'Stellar Testnet',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    passphrase: 'Test SDF Network ; September 2015'
  },
  futurenet: {
    name: 'Stellar Futurenet',
    rpcUrl: 'https://rpc-futurenet.stellar.org',
    passphrase: 'Test SDF Future Network ; October 2022'
  },
  mainnet: {
    name: 'Stellar Mainnet',
    rpcUrl: 'https://mainnet.sorobanrpc.com',
    passphrase: 'Public Global Stellar Network ; July 2015'
  }
};

export class TrapTraceClient {
  constructor(networkOrUrl = 'testnet') {
    if (NETWORKS[networkOrUrl]) {
      this.network = networkOrUrl;
      this.rpcUrl = NETWORKS[networkOrUrl].rpcUrl;
      this.passphrase = NETWORKS[networkOrUrl].passphrase;
    } else {
      this.network = 'custom';
      this.rpcUrl = networkOrUrl;
      this.passphrase = 'Test SDF Network ; September 2015';
    }
  }

  async callRpc(method, params = {}) {
    const res = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method,
        params
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(`RPC Error (${data.error.code}): ${data.error.message}`);
    }
    return data.result;
  }

  async getHealth() {
    return this.callRpc('getHealth');
  }

  async getLatestLedger() {
    return this.callRpc('getLatestLedger');
  }

  async simulateTransaction(transactionXdr) {
    return this.callRpc('simulateTransaction', { transaction: transactionXdr });
  }

  async getTransaction(txHash) {
    return this.callRpc('getTransaction', { hash: txHash });
  }
}
