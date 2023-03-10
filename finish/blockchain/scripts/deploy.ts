import { ethers } from "hardhat";

async function main () {
  // We get the contract to deploy
  const Counter = await ethers.getContractFactory('Counter');
  console.log('Deploying Contract...');
  const counter = await Counter.deploy();
  await counter.deployed();
  console.log('Contract deployed to:', counter.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
