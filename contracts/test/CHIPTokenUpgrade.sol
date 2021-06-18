// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "../CHIPToken.sol";


contract CHIPTokenUpgrade is CHIPToken {
    bytes32 public testVar;

    function test() public {
        testVar = keccak256("test");
    }

}
