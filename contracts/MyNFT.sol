// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract MyNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender){
        nextTokenId = 0;
    }

    function mintNFT(address recipient, string memory tokenURI)
    public
    returns (uint256)
    {
        uint256 currTokenId = nextTokenId;
        _mint(recipient, currTokenId);
        _setTokenURI(currTokenId, tokenURI);
        nextTokenId++; // Increment token ID

        return currTokenId;
    }
}
