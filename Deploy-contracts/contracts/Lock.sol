// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;
    uint256 public deployTime;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        deployTime = block.timestamp;
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {

        require(block.timestamp - deployTime >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
