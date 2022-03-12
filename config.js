require('dotenv').config();
const fs = require('fs');
const path = require('path');
const BigNumber = require('bignumber.js');

const config = {
    deployment: {
        mumbai: "0xaA2c9A5e271b0519d9B3A8BB94f87331462a0352",
        matic: "0x7e0B0332aDbEC1a84E1E264f308AE581fcda5684",
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
