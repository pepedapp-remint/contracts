//SPDX-License-Identifier: Unlicense
pragma solidity =0.6.11;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// TODO: Set to actual URI where metadata is hosted
contract PepeV2 is ERC1155("https://wrappedpepes.xyz") {

    address public immutable minterAddress;

    constructor(address _minterAddress) public {
        minterAddress = _minterAddress;
    }

    function mint(address account, uint256 id, uint256 amount) public {
        require(msg.sender == minterAddress, "PepeV2: Can only mint from minter address");

        _mint(account, id, amount, "0x0");
    }
}
