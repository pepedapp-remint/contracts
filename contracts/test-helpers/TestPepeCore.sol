//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.1;

import "../IPepeCore.sol";

import "@nomiclabs/buidler/console.sol";

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
        //console.log(address(this));
        //console.log(msg.sender);
        //console.logBytes32(sig);
        ownerToSigToCount[msg.sender][sig] = count;
        console.log(ownerToSigToCount[msg.sender][sig]);
    }

    function getNumSigsOwned(bytes32 sig) public view override returns (uint256) {
        //console.log(address(this));
        console.log(msg.sender);
        console.logBytes32(sig);
        console.logBytes32(allSigs[0]);
        console.log(ownerToSigToCount[msg.sender][sig]);
        return ownerToSigToCount[msg.sender][sig];
    }

    function setNumSigs(bytes32 sig, uint256 count) public {
        sigToCount[sig] = count;
    }

    function getNumSigs(bytes32 sig) public view override returns (uint256) {
        return sigToCount[sig];
    }
}
