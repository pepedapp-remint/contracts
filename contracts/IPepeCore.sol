//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.1;

interface IPepeCore {
    function getAllSigs() external view returns (bytes32[] memory);
    function getNumSigsOwned(bytes32 sig) external view returns (uint256);
    function getNumSigs(bytes32 sig) external view returns (uint256);
}
