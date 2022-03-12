// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol";

contract IronchainDAO is
    UUPSUpgradeable,
    ERC20SnapshotUpgradeable,
    OwnableUpgradeable
{
    function initialize(
        string memory name,
        string memory symbol,
        address owner,
        uint256 amount
    ) external initializer {
        __Ownable_init();
        __ERC20Snapshot_init();
        __ERC20_init(name, symbol);
        transferOwnership(owner);
        _mint(owner, amount);
    }

    function snapshot() external returns(uint256) {
        return _snapshot();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
