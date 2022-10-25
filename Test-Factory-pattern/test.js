const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");
const { ethers, deployments } = require("hardhat");

let TX = await router.deposit(
    mock.address,
    user1.address,
    ether("50"));

  let receipt = await TX.wait();
  console.log("...create Token action (gas spent: %s)...\n\n", receipt.gasUsed);
  let addresses = await router.tokens(mock.address);
  const Mocktoken = await Token.attach(addresses);

  expect(await Mocktoken.balanceOf(user1.address)).to.equal(ether("50"));