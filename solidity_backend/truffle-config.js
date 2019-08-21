const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    cfdfinale2019: {
      network_id: "*",
      gas: 0,
      gasPrice: 0,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\mayan\\OneDrive\\Desktop\\asdf\\cyberguards\\mnemonic.txt', 'utf-8'), "https://ec.blockchain.azure.com:3200/pX8w42ySbRnSYOjpvw-jxKw7"),
      consortium_id: 1566399345655
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.5.0"
    }
  }
};
