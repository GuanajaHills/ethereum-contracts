// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";


contract CHIPToken is ERC20Upgradeable, ERC20BurnableUpgradeable, AccessControlUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    function initialize(address _owner) public initializer {
        __ERC20_init("Guanaja Hills Resort Chip", "CHIP");
        // To ensure Context contract is not initialized multiple times, we call
        // the inherited initialize functions individually (unchained).
        __ERC20Burnable_init_unchained();
        __ERC165_init_unchained();
        __AccessControl_init_unchained();
        // Assign all roles to contract owner.
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MINTER_ROLE, _owner);
    }

    function decimals() public pure override returns (uint8) {
        // CHIP Token will be used like USD and therefore have 2 decimals.
        return(2);
    }

    function mint(address _to, uint256 _amount) public {
        require(hasRole(MINTER_ROLE, msg.sender), "CHIPToken: minter role required");
        _mint(_to, _amount);
    }

}
