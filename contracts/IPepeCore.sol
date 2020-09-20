pragma solidity ^0.6.8;

interface IPepeCore {
    function getAllSigs() public view returns (bytes32[] memory);
    function getNumSigsOwned(bytes32 sig) public view returns (uint256);
    function getNumSigs(bytes32 sig) public view returns (uint256);
}
