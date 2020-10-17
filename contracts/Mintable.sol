//SPDX-License-Identifier: Unlicense
pragma solidity =0.6.11;

interface Mintable {
    function setTokenId(uint256 id, bytes32 sig) external;
    function mint(address account, uint256 id, uint256 amount) external;
}
