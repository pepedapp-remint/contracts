//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.1;

import "../IPepeCore.sol";

contract TestPepeCore is IPepeCore {
    bytes32[] allSigs;
    mapping(address => mapping(bytes32 => uint256)) ownerToSigToCount;
    mapping(bytes32 => uint256) sigToCount;

    constructor(bytes32[] memory _allSigs) {
        allSigs = _allSigs;
    }

    function getAllSigs() public view override returns (bytes32[] memory) {
        return allSigs;
    }

    function setNumSigsOwned(bytes32 sig, uint256 count) public {
        ownerToSigToCount[msg.sender][sig] = count;
    }

    function getNumSigsOwned(bytes32 sig) public view override returns (uint256) {
        return ownerToSigToCount[msg.sender][sig];
    }

    function setNumSigs(bytes32 sig, uint256 count) public {
        sigToCount[sig] = count;
    }

    function getNumSigs(bytes32 sig) public view override returns (uint256) {
        return sigToCount[sig];
    }
}
