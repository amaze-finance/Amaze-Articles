require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('solidity-coverage');
// require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

 require('dotenv').config()
 const MORALIS_URL = process.env.MORALIS_URL
 const PRIVATE_KEY = process.env.PRIVATE_KEY
 const API_KEY = process.env.API_KEY

module.exports = {
  solidity: "0.8.13",
  networks: {
    testnet: {
      url: MORALIS_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: API_KEY
  }
};
