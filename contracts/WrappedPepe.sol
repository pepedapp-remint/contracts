//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.1;

import "@nomiclabs/buidler/console.sol";

import "./IPepeCore.sol";

contract WrappedPepe {
    IPepeCore public pepeCore;
    address public pepeCoreAddress;

    // NOTE: memoized to reduce gas load on users
    mapping(uint256 => bytes32) tokenIdToSig;
    uint256 numTokens;

    mapping(address => bool) claimedAddresses;

    constructor(IPepeCore _pepeCore) {
        pepeCore = _pepeCore;
        pepeCoreAddress = address(pepeCore);
        console.log(pepeCoreAddress);

        bytes32[] memory _allSigs = pepeCore.getAllSigs();

        // NOTE: gas profile this
        numTokens = _allSigs.length;
        for (uint8 i = 0; i < numTokens; i++) {
            tokenIdToSig[i] = _allSigs[i];
        }
    }

    function claim(uint256 tokenId) public {
        require(tokenId < numTokens, "Can't claim tokens that don't exist");

        require(!claimedAddresses[msg.sender], "Can only claim once per address");

        bytes32 sig = tokenIdToSig[tokenId];
        (bool success, bytes memory result) = pepeCoreAddress.call(abi.encodeWithSelector(
            bytes4(keccak256("getNumSigsOwned(bytes32)")),
            sig
        ));

        uint256 numOwned = abi.decode(result, (uint256));
        require(numOwned > 0, "Must own the original token in PepeCore");

        claimedAddresses[msg.sender] = true;
        // TODO: add event!
    }

    // TODO:
    // ERC1155 general implementation
    // metadata mapping


}
