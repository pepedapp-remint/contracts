//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.6;

interface IPepeCore {
    function transferSig(bytes32 sig, uint256 count, address newOwner) external;
}
