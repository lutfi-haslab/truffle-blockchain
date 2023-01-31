'use strict'
var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = 'toy disorder topic fancy eager urban wish assist mistake punch east hub';

module.exports = {
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },
  networks: {
    development: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "http://127.0.0.1:8545",
      ),
      host: "127.0.0.1",
      port: "8545",
      network_id: "*", // Match any network id
    },
    tomotestnet: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "https://rpc.testnet.tomochain.com",
        0,
        true,
        "m/44'/889'/0'/0/"
      ),
      network_id: "89",
      gas: 2000000,
      gasPrice: 10000000000
    },
    tomomainnet: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "https://rpc.tomochain.com",
        0,
        true,
        "m/44'/889'/0'/0/",
      ),
      network_id: "88",
      gas: 2000000,
      gasPrice: 10000000000000,
    }
  }
};