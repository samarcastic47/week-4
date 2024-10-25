import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { env } from "../lib/env";
import { getContract } from "../lib/contract";
import { getWallet } from "../lib/wallet";

let deployedContractAddress: any = null; // Temporary store for the contract address

task("deploy-contract", "Deploy NFT contract").setAction(async (_, hre) => {
  const MyNFT = await hre.ethers.getContractFactory("MyNFT", getWallet());
  const myNft = await MyNFT.deploy();
  await myNft.deployed();
  deployedContractAddress = myNft.address; // Save the deployed address
  console.log("MyNFT deployed to:", deployedContractAddress);
  return deployedContractAddress;
});

task("mint-nft", "Mint an NFT")
  .addParam("uri", "The Token URI")
  .addParam("recipient", "The address of the recipient")
  .setAction(async (args, hre) => {
    if (!deployedContractAddress) {
      console.error("Contract address is not set. Please deploy the contract first.");
      return;
    }

    const contract = await getContract("MyNFT", hre, deployedContractAddress); // Call your modified getContract
    const txn = await contract.mintNFT(args.recipient, args.uri);
    const response = await txn.wait();
    console.log("NFT minted: Txn hash is " + response.transactionHash);
    return response.transactionHash;
  });