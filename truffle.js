require("ts-node/register");
require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider");

const GWEI = 1000000000;

module.exports = {
    networks: {
        kovan: {
            // @ts-ignore
            provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.KOVAN_ETHEREUM_NODE),
            network_id: 42,
            gas: 6721975,
            gasPrice: 10 * GWEI,
        },
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*",
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
            version: "0.5.8",
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
        "truffle-plugin-verify"
    ],
    api_keys: {
        etherscan: process.env.ETHERSCAN_KEY,
    },
    contracts_build_directory: `./build/${process.env.NETWORK || "development"}`,
};
