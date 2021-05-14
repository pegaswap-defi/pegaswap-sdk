pragma solidity =0.5.16;

import '../PegaswapBEP20.sol';

contract BEP20 is PegaswapBEP20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
