require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Optimized for deployment size
      },
      viaIR: true, // Use intermediate representation for better optimization
    },
  },
  paths: {
    sources: "./src/contracts",
    tests: "./src/test",
    cache: "./build/cache",
    artifacts: "./build/artifacts"
  },

  networks: {
    hardhat: {
      chainId: 1337,
    },
    zeroscan: {
      url: "https://rpc.zeroscan.org",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 5080,
    },
  },
  etherscan: {
    apiKey: {
      zeroscan:
        "0x0000000000000000000000000000000000000000000000000000000000000000", // Đây là API key nếu explorer cung cấp
    },
    customChains: [
      {
        network: "zeroscan",
        chainId: 5080,
        urls: {
          apiURL: "https://zeroscan.org/api", // API xác minh
          browserURL: "https://zeroscan.org", // Trình duyệt Explorer
        },
      },
    ],
  },
};