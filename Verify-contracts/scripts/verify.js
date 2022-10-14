const hre = require("hardhat");

async function main() {

  console.log("Verifying...")
  await hardhat.run("verify:verify", {
    address: "write your address here",
    constructorArguments: [
      "write your arguments here"
      ],
  })
  console.log("VERIFICATION COMPLETE")

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
