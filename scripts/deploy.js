const { ethers } = require('hardhat');

async function main() {
  // Compile the contract
  const MyContract = await ethers.getContractFactory('Assessment');
  console.log('Compiling contract...');

  // Define the initial balance
  const initialBalance = ethers.utils.parseEther('1.0'); // Example: setting initial balance to 1 Ether

  // Deploy the contract with the initial balance
  const myContract = await MyContract.deploy(initialBalance);
  console.log('Deploying contract...');

  // Wait for the contract to be mined and get the deployed address
  await myContract.deployed();
  console.log('Contract deployed to:', myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
