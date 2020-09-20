pragma solidity ^0.6.8;

import "../IPepeCore.sol";

contract TestPepeCore is IPepeCore {
    bytes32[] allSigs;
    mapping(address => mapping(bytes32 => uint256)) ownerToSigToCount;
    mapping(bytes32 => uint256) sigToCount;

    constructor(bytes32[] memory _allSigs) public {
        allSigs = _allSigs;
    }

    function getAllSigs() public view returns (bytes32[] memory) {
        return allSigs;
    }

    function getNumSigsOwned(bytes32 sig) public view returns (uint256) {
        return 0;
    }

    function getNumSigs(bytes32 sig) public view returns (uint256) {
        return 0;
    }
}
