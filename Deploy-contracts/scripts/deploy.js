const hre = require("hardhat");
const { BigNumber, utils } = require("ethers");
const hardhat = require("hardhat");

async function main() {

  const Lock = await ethers.getContractFactory("Lock"); // you should write contract name after getContractFactory

  const lock = await Lock.deploy( // constructor arguments
    21600 // 6 hours * 60 minutes * 60 seconds = 6 hours in seconds
  );
  await lock.deployed();

  console.log("Lock deployed to:", lock.address); // write contract address in terminal

  console.log("Waiting for 5 confirmations") // time for upload byte code in blockchain
  await lock.deployTransaction.wait(5)
  console.log("Confirmed!")

  // deployed to 0xc11DDe33F515618B6370651B7fb7a0d103c8e943 in goerli testnet
}

main() 
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });