require('dotenv').config();
const fs = require('fs');
const path = require('path');
const BigNumber = require('bignumber.js');

const config = {
    deployment: {
        mumbai: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
    name: 'IronchainDAO Token',
    symbol: 'IRON',
    accounts: [
        process.env.ADMIN,
        process.env.DEPLOYER,
        process.env.TEST,
    ],
    alchemy: {
        matic: process.env.ALCHEMY_MATIC,
        mumbai: process.env.ALCHEMY_MUMBAI,
    },
    gnosisSafe: {
        api: {
            matic: 'https://safe-transaction.polygon.gnosis.io/',
        },
        admin: {
            matic: '0xFb212ab8699cF714dccaD0f6c1D817F2F229522f',
        }
    },
    scan: {
        matic: {
            api: "https://api.polygonscan.com/api",
            key: process.env.POLY_SCAN_KEY,
        },
        mumbai: {
            api: "https://api-testnet.polygonscan.com/api",
            key: process.env.POLY_SCAN_KEY,
        },
    },
    enableGasReporter: true
};

module.exports = config;
