require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",  // Local Ganache instance
      accounts: ["0x35fe2503729e6e2432d1fb437aea83a216d418983f90ab27feec81cfb900404e"]  // Use a private key from Ganache
    }
  }
};
