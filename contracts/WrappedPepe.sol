pragma solidity ^0.6.8;

import "@nomiclabs/buidler/console.sol";

import "./IPepeCore.sol";

contract WrappedPepe {
    IPepeCore public pepeCore;

    constructor(IPepeCore _pepeCore) public {
        pepeCore = _pepeCore;
    }

    // TODO:
    // - proper access to PepeCore
    // - 'claim' method
    // - ERC1155 implementation

}
