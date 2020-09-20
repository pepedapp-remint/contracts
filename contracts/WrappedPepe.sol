//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.1;

import "@nomiclabs/buidler/console.sol";

import "./IPepeCore.sol";

contract WrappedPepe {
    IPepeCore public pepeCore;

    constructor(IPepeCore _pepeCore) {
        pepeCore = _pepeCore;
    }

    // TODO:
    // - proper access to PepeCore
    // - 'claim' method
    // - ERC1155 implementation

}
