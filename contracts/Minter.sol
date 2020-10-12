//SPDX-License-Identifier: Unlicense
pragma solidity =0.6.11;

import "@openzeppelin/contracts/cryptography/MerkleProof.sol";

contract Minter {
    bytes32 public immutable merkleRoot;

    constructor(bytes32 _merkleRoot) public {
        merkleRoot = _merkleRoot;
    }


    function merkleVerify(bytes32 node, bytes32[] memory proof) public view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, node);
    }

    function makeNode(
        uint256 index,
        string memory sig,
        address account,
        uint256 count
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(index, sig, account, count));
    }
}
