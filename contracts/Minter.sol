//SPDX-License-Identifier: Unlicense
pragma solidity =0.6.11;

import "@openzeppelin/contracts/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Minter is Ownable {
    event Claimed(
        uint256 index,
        bytes32 sig,
        address account,
        uint256 count
    );

    bytes32 public immutable merkleRoot;

    address public tokenAddress;
    bool public tokenAddressLocked = false;

    mapping(uint256 => bool) public claimed;

    uint256 public nextId = 1;
    mapping(bytes32 => uint256) public sigToTokenId;

    constructor(bytes32 _merkleRoot) public {
        merkleRoot = _merkleRoot;
        nextId = 1;
    }

    function setTokenAddress(address _tokenAddress) public onlyOwner {
        require(!tokenAddressLocked, "Minter: Can't set token address twice");
        tokenAddress = _tokenAddress;
        tokenAddressLocked = true;
    }

    function merkleVerify(bytes32 node, bytes32[] memory proof) public view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, node);
    }

    function makeNode(
        uint256 index,
        bytes32 sig,
        address account,
        uint256 count
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(index, sig, account, count));
    }

    function claim(
        uint256 index,
        bytes32 sig,
        address account,
        uint256 count,
        bytes32[] memory proof
    ) public {
        require(tokenAddress != address(0), "Minter: Must have a token address set");

        require(!claimed[index], "Minter: Can't claim a drop that's already been claimed");
        claimed[index] = true;

        bytes32 node = makeNode(index, sig, account, count);
        require(merkleVerify(node, proof), "Minter: merkle verification failed");

        uint256 id = sigToTokenId[sig];
        if (id == 0) {
            sigToTokenId[sig] = nextId;
            (bool success, bytes memory result) = tokenAddress.call(abi.encodeWithSelector(
                bytes4(keccak256("setTokenId(uint256,bytes32)")),
                nextId,
                sig
            ));
            require(success, "Minter: Failed to set token ID on token contract");
            id = nextId;

            nextId++;
        }

        (bool success, bytes memory result) = tokenAddress.call(abi.encodeWithSelector(
            bytes4(keccak256("mint(address,uint256,uint256)")),
            account,
            id,
            count
        ));
        require(success, "Minter: Failed to mint.");
        emit Claimed(index, sig, account, count);
    }
}
