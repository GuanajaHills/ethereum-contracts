// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";


contract GHIToken is ERC20Upgradeable, ERC20SnapshotUpgradeable, AccessControlUpgradeable {
    bytes32 public constant SNAPSHOT_ROLE = keccak256("SNAPSHOT_ROLE");

    function initialize(address _owner) public initializer {
        __ERC20_init("Guanaja Hills Investment Token", "GHI");
        // To ensure Context contract is not initialized multiple times, we call
        // the inherited initialize functions individually (unchained).
        __ERC20Snapshot_init_unchained();
        __ERC165_init_unchained();
        __AccessControl_init_unchained();
        // Assign all roles to contract owner.
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(SNAPSHOT_ROLE, _owner);
        // 100 million GHI will be minted, no public minting function -> capped.
        _mint(_owner, 100000000);
    }

    function decimals() public pure override returns (uint8) {
        // GHI Token do not have decimal places.
        return(0);
    }

    function snapshot() public {
        require(hasRole(SNAPSHOT_ROLE, msg.sender), "GHIToken: snapshot role required");
        _snapshot();
    }

    function _beforeTokenTransfer(address _from, address _to, uint256 _amount)
        internal
        override(ERC20Upgradeable, ERC20SnapshotUpgradeable)
    {
        super._beforeTokenTransfer(_from, _to, _amount);
    }

}
