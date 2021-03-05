//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.6;

import "./IPepeCore.sol";

contract TestPepeCore is IPepeCore {
    mapping(address => mapping(bytes32 => uint256)) public _ownerToSigToCount;

    function getSigCount(bytes32 sig, address owner) external returns (uint256) {
        return _ownerToSigToCount[owner][sig];
    }

    // NOTE: for tests
    function setSigCount(bytes32 sig, uint256 count, address owner) external {
        _ownerToSigToCount[owner][sig] = count;
    }

    function transferSig(bytes32 sig, uint256 count, address newOwner) override external {
        uint256 numOwned = _ownerToSigToCount[msg.sender][sig];
        require(numOwned >= count, "TestPepeCore: must own enough tokens for transfer");

        // emulate transfer into newOwner
        _ownerToSigToCount[msg.sender][sig] = _ownerToSigToCount[msg.sender][sig] - count;
        _ownerToSigToCount[newOwner][sig] = _ownerToSigToCount[newOwner][sig] + count;
    }
}
