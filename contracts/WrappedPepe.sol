//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.1;

import "@nomiclabs/buidler/console.sol";

import "./IPepeCore.sol";

contract WrappedPepe {
    IPepeCore public pepeCore;

    // NOTE: memoized to reduce gas load on users
    mapping(uint256 => bytes32) tokenIdToSig;

    mapping(address => bool) claimedAddresses;

    constructor(IPepeCore _pepeCore) {
        pepeCore = _pepeCore;

        bytes32[] memory _allSigs = pepeCore.getAllSigs();

        // NOTE: gas profile this
        for (uint8 i = 0; i < _allSigs.length; i++) {
            tokenIdToSig[i] = _allSigs[i];
        }
    }

    function claim(uint256 tokenId) public {
        require(!claimedAddresses[msg.sender], "Can only claim once per address");

        claimedAddresses[msg.sender] = true;
    }


    // TODO:
    // - proper access to PepeCore
    // - 'claim' method
    // - ERC1155 implementation

}
