// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "../GHIToken.sol";


contract GHITokenUpgrade is GHIToken {
    bytes32 public testVar;

    function test() public {
        testVar = keccak256("test");
    }

}
