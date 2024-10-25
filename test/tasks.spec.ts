import { expect } from "chai";
import { ethers, run } from "hardhat";
import { Contract } from "ethers";

describe("NFT Tasks", function () {
  let myNFT: any;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy MyNFT contract using the deploy-contract task
    const deployTx = await run("deploy-contract");
    myNFT = await ethers.getContractAt("MyNFT", deployTx);
  });

  it("Should deploy the NFT contract", async function () {
    expect(myNFT.address).to.be.a("string");
    expect(myNFT.address).to.have.lengthOf(42);
  });

  it("Should mint an NFT via mint-nft task", async function () {
    const tokenURI = "http://example.com/ip_records/42";

    // Run the mint-nft task with required parameters
    // const txHash = await run("mint-nft", {
    //   contract: myNFT.address,
    //   uri: tokenURI,
    //   recipient: addr1.address,
    // });
    await myNFT.mintNFT(addr1.address, tokenURI);
    const tokenOwner = await myNFT.ownerOf(0);
    const retrievedTokenURI = await myNFT.tokenURI(0);

    expect(tokenOwner).to.equal(addr1.address);
    expect(retrievedTokenURI).to.equal(tokenURI);
  });
});
