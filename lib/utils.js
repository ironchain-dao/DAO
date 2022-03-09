const p = require('prompts');

async function admin(hre) {
    const signers = await hre.ethers.getNamedSigners();
    const admin = hre.localConfig.gnosisSafe.admin[hre.network.name];
    if (admin) {
        return {
            address: admin,
            signer: signers.admin,
            type: 'GNOSIS'
        };
    }
    return {
        address: signers.admin.address,
        signer: signers.admin,
        type: 'EOA'
    };
}

async function prompts(func) {
    return await (async () => {
        const response = await p({
          type: 'text',
          name: 'continue',
          message: 'Confirm to continue? (Y/n) '
        });
        var answer = response['continue'].toLowerCase();
        if (answer == 'y' || answer == 'yes') {
            return await func();
        }
    })();
}

module.exports = { admin, prompts }
