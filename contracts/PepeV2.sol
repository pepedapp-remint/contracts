//SPDX-License-Identifier: Unlicense
pragma solidity =0.6.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC1155/IERC1155MetadataURI.sol";
import "./ERC1155.sol";

contract PepeV2 is ERC1155(), IERC1155MetadataURI {
    /*
     *     bytes4(keccak256('uri(uint256)')) == 0x0e89341c
     */
    bytes4 private constant _INTERFACE_ID_ERC1155_METADATA_URI = 0x0e89341c;

    address public immutable minterAddress;

    // Metadata mappings. 'sig' is the intermediate that was used in the initial PepeCore contract
    mapping(bytes32 => string) public sigToIpfsHash;
    mapping(uint256 => bytes32) public tokenIdToSig;

    constructor(address _minterAddress, bytes32[58] memory _orderedSigs, string[58] memory _orderedIpfsHashes) public {
        minterAddress = _minterAddress;

        for (uint256 i = 0; i < 58; i++) {
            sigToIpfsHash[_orderedSigs[i]] = _orderedIpfsHashes[i];
        }

        // register the supported interfaces to conform to ERC1155MetadataURI via ERC165
        _registerInterface(_INTERFACE_ID_ERC1155_METADATA_URI);
    }

    function setTokenId(uint256 id, bytes32 sig) external {
        require(msg.sender == minterAddress, "PepeV2: Can only set token ID from minter address");

        require(tokenIdToSig[id] == 0, "PepeV2: can only set token ID sig once");

        tokenIdToSig[id] = sig;
    }

    function mint(address account, uint256 id, uint256 amount) external {
        require(msg.sender == minterAddress, "PepeV2: Can only mint from minter address");

        _mint(account, id, amount, "0x0");
    }

    function uri(uint256 id) external view override returns (string memory) {
        string storage ipfsHash = sigToIpfsHash[tokenIdToSig[id]];

        // NOTE: bytes conversion just for empty test
        bytes memory tmpIpfsBytes = bytes(ipfsHash);
        require(tmpIpfsBytes.length > 0, "PepeV2: Can only return URI for known token IDs");

        return string(abi.encodePacked("ipfs://ipfs/", ipfsHash));
    }
}
