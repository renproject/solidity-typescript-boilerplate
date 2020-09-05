require("ts-node/register");
require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider");

const GWEI = 1000000000;

module.exports = {
    networks: {
        kovan: {
            // @ts-ignore
            provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://kovan.infura.io/v3/${process.env.INFURA_KEY}`),
            network_id: 42,
            gas: 9721975,
            gasPrice: 10 * GWEI,
        },
        mainnet: {
            // @ts-ignore
            provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`),
            network_id: 1,
            gas: 5721975,
            gasPrice: 33 * GWEI,
            networkCheckTimeout: 360000,
        },
        rinkeby: {
            // @ts-ignore
            provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`),
            network_id: 4,
            gas: 6721975,
            networkCheckTimeout: 360000,
            gasPrice: 10 * GWEI,
        },
        development: {
            host: "localhost",
            network_id: "*",
            port: 8545,
        },
        coverage: {
            host: "localhost",
            network_id: "*",
            port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
            gas: 0xfffffffffff, // <-- Use this high gas value
            gasPrice: 0x01      // <-- Use this low gas price
        },
    },
    mocha: {
        // // Use with `npm run test`, not with `npm run coverage`
        // reporter: 'eth-gas-reporter',
        // reporterOptions: {
        //   currency: 'USD',
        //   gasPrice: 21
        // },
        enableTimeouts: false,
        useColors: true,
        bail: true,
    },
    compilers: {
        solc: {
            version: "0.6.9",
            settings: {
                evmVersion: "petersburg",
                optimizer: {
                    enabled: true,
                    runs: 200,
                }
            }
        }
    },
    plugins: [
        "truffle-plugin-verify",
        "solidity-coverage"
    ],
    api_keys: {
        etherscan: process.env.ETHERSCAN_KEY,
    },
    contracts_build_directory: `./build/${process.env.NETWORK || "development"}`,
};
