//SPDX-License-Identifier: Unlicense
pragma solidity =0.6.11;

import "@openzeppelin/contracts/cryptography/MerkleProof.sol";

contract Minter {
    bytes32 public immutable merkleRoot;

    constructor(bytes32 _merkleRoot) public {
        merkleRoot = _merkleRoot;
    }


    // ['uint256', 'string', 'address', 'uint256'], [idx, sig, acct, count]
    function merkleVerify(bytes32 node, bytes32[] memory proof) public view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, node);
    }
}
