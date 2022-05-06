//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract Counter {
    uint counter;
    function count() public returns(uint) {
        counter++;
        console.log(counter);
        return counter;
    }
}