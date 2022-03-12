const { admin } = require('../lib/utils.js');

module.exports = async ({ ethers, upgrades, localConfig } = hre) => {
    const owner = await admin(hre);
    const DAO = await ethers.getContractFactory("IronchainDAO");
    console.log("Deploying IronchainDAO...");

    const deployed = localConfig.deployment[hre.network.name];
    const upgraded = await upgrades.upgradeProxy(
        deployed, DAO, {deployer: owner.signer}
    );
    await upgraded.deployed();
    console.log("IronchainDAO deployed to:", upgraded.address);
};

module.exports.tags = ['DAO', 'Upgrade'];
