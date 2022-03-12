const { expect } = require("chai");
const { localConfig, ethers } = hre = require("hardhat");
const { admin } = require("../lib/utils.js");

describe("IronchainDAO", function () {
    const decimals = 18;
    const supply = ethers.BigNumber.from(10).pow(decimals).mul(10000000);

    var owner, deployer, test;
    var dao;

    beforeEach(async function() {
        // set up account
        owner = await admin(hre);
        const signers = await ethers.getNamedSigners();
        deployer = signers.deployer;
        test = signers.test;

        // deploy
        const IronchainDAO = await ethers.getContractFactory("IronchainDAO");
        dao = await upgrades.deployProxy(
            IronchainDAO,
            [
                localConfig.name,
                localConfig.symbol,
                owner.address,
                supply
            ]
        );
    });

    it("IronchainDAO Metadata", async function() {
        expect(await dao.name()).to.equal(localConfig.name);
        expect(await dao.symbol()).to.equal(localConfig.symbol);
        expect(await dao.decimals()).to.equal(18);
        expect(await dao.owner()).to.equal(owner.address);
        expect(await dao.totalSupply()).to.equal(supply);
        expect(await dao.balanceOf(owner.address)).to.equal(supply);
    });

    it("IronchainDAO Upgrade", async function() {
        const IronchainDAOV2 = await ethers.getContractFactory("IronchainDAOUpgradeTest");
        const upgraded = await upgrades.upgradeProxy(
            dao.address,
            IronchainDAOV2,
            {deployer: owner.signer}
        );

        expect(dao.address).to.equal(upgraded.address);
        await upgraded.connect(owner.signer).burn(supply);
        expect(await dao.totalSupply()).to.equal(0);
        expect(await dao.balanceOf(owner.address)).to.equal(0);
    });
});
