## Скрипт деплоя и верифицирования смарт-контракта
``` javascript
import hardhat, { ethers } from "hardhat";

function ether(eth: string) {
    let weiAmount = ethers.utils.parseEther(eth)
    return weiAmount;
}

async function main() {

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("ERC20", "ERC20");
  await token.deployed();

  console.log("Token deployed to:", token.address);

  console.log("Waiting for 5 confirmations")
  await token.deployTransaction.wait(5)
  console.log("Confirmed!")

  console.log("Verifying...")
  await hardhat.run("verify:verify", {
    address: token.address,
    constructorArguments: ["ERC20", "ERC20"],
  })
  console.log("VERIFICATION COMPLETE")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```
