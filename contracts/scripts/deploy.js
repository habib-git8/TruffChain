const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  try {
    // Deploy BookingPayment contract
    const BookingPayment = await hre.ethers.getContractFactory("BookingPayment");
    const bookingPayment = await BookingPayment.deploy();
    await bookingPayment.deployed();
    console.log("BookingPayment deployed to:", bookingPayment.address);

    // Deploy ReviewContract
    const ReviewContract = await hre.ethers.getContractFactory("ReviewContract");
    const reviewContract = await ReviewContract.deploy();
    await reviewContract.deployed();
    console.log("ReviewContract deployed to:", reviewContract.address);

    // Done
    console.log("✅ Both contracts deployed successfully");

  } catch (error) {
    console.error("Error during deployment:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in main:", error);
    process.exit(1);
  });
