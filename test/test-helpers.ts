import { ethers } from "hardhat";
import { Contract } from "ethers";

export async function deployTestContract(name: string): Promise<Contract> {
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const nft = await MyNFT.deploy();
  await nft.deployed();
  return nft;
}

