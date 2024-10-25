import { ethers } from "hardhat";
import hre from "hardhat";
import { expect } from "chai";
import { Contract, Wallet } from "ethers";
import { deployTestContract } from "./test-helpers";

describe("MyNFT", () => {
  const TOKEN_URI = "http://example.com/ip_records/42";
  let deployedContract: Contract;

  const deployNFT = async () => {
    const myNFT = await deployTestContract("MyNFT");
    return myNFT; // Return the instance of the deployed contract
  };

  beforeEach(async function () {
    deployedContract = await deployNFT(); // Assign deployed contract to the variable
  });

  it("Should mint an NFT", async function () {
    const [owner, recipient] = await hre.ethers.getSigners(); // Get signers
    const txn = await deployedContract.mintNFT(recipient.address, TOKEN_URI); // Use deployed contract
    await txn.wait(); 
    expect(await deployedContract.ownerOf(0)).to.equal(recipient.address); // Check ownership
  });

  it("Should return the correct token URI for a minted NFT", async function () {
    const [owner, recipient] = await hre.ethers.getSigners();
    const txn = await deployedContract.mintNFT(recipient.address, TOKEN_URI);
    await txn.wait();
    expect(await deployedContract.tokenURI(0)).to.equal(TOKEN_URI); // Check token URI
  });
});
