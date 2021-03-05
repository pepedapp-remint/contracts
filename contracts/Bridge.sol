//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.6;

import "./IPepeCore.sol";

contract Bridge {
    IPepeCore public legacyContract;
    // TODO: V3 contract

    constructor(IPepeCore _legacyContract) public {
        legacyContract = _legacyContract;
    }

    function legacyToV3(bytes32 sig, uint256 count) external {
        (bool success, bytes memory data) = address(legacyContract).delegatecall(
            abi.encodeWithSignature(
                "transferSig(bytes32 sig,uint256 count,address newOwner)",
                sig,
                count,
                address(this)
            )
        );
        require(success, "Bridge: transfer from legacy contract to bridge unsuccessful");

        // TODO: mint 1155!
    }

    function V3ToLegacy() external {
        // TODO:
    }
}
