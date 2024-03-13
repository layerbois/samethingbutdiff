const { ethers } = require("hardhat");

async function main() {
  const Upload = await ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  const networkName = "sepolia";
  const provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/1048b9439d4f42d9a8c4b05b429bb4ab"
  );
  const signer = new ethers.Wallet(
    "0x6Ac4fe48B1BA838e283eEa22E52323C523A8442E",
    provider
  ); // Replace with your own private key
  const connectedUpload = upload.connect(signer);
  console.log(await provider.send("eth_syncing", []));
  const network = await provider.getNetwork();
  const latestBlockNumber = await provider.getBlockNumber();
  const latestBlock = await provider.getBlock(latestBlockNumber);

  console.log(`Latest block number: ${latestBlockNumber}`);
  console.log(`Latest block timestamp: ${latestBlock.timestamp}`);

  await connectedUpload.deployed();
  console.log("Library deployed to:", connectedUpload.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});