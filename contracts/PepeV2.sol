//SPDX-License-Identifier: Unlicense
pragma solidity =0.6.11;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC1155/IERC1155MetadataURI.sol";
import "./ERC1155.sol";

// TODO: Set to actual URI where metadata is hosted
contract PepeV2 is ERC1155(), IERC1155MetadataURI {
    /*
     *     bytes4(keccak256('uri(uint256)')) == 0x0e89341c
     */
    bytes4 private constant _INTERFACE_ID_ERC1155_METADATA_URI = 0x0e89341c;

    address public immutable minterAddress;

    mapping(uint256 => string) tokenIdToIpfsHash;

    constructor(address _minterAddress, string[58] memory _orderedIpfsHashes) public {
        minterAddress = _minterAddress;

        uint256 numHashes = _orderedIpfsHashes.length;
        for (uint256 i = 0; i < numHashes; i++) {
            tokenIdToIpfsHash[i+1] = _orderedIpfsHashes[i];
        }

        // register the supported interfaces to conform to ERC1155MetadataURI via ERC165
        _registerInterface(_INTERFACE_ID_ERC1155_METADATA_URI);
    }

    function mint(address account, uint256 id, uint256 amount) public {
        require(msg.sender == minterAddress, "PepeV2: Can only mint from minter address");

        _mint(account, id, amount, "0x0");
    }

    function uri(uint256 id) external view override returns (string memory) {
        string storage ipfsHash = tokenIdToIpfsHash[id];
        // TODO: add this back in!
        //require(ipfsHash.length > 0, "PepeV2: Can only return URI for known token IDs");

        return string(abi.encodePacked("ipfs://ipfs/", ipfsHash));
    }
}
