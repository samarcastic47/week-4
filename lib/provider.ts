import { ethers } from "ethers";
import { env } from "./env";

export function getProvider(): ethers.providers.AlchemyProvider {
  return new ethers.providers.AlchemyProvider(
    'sepolia',
    env('ALCHEMY_API_KEY')
  );
}