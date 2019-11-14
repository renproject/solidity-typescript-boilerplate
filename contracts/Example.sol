pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Example {
    using SafeMath for uint256;

    uint public counter;

    constructor() public {
    }

    function increment() public {
        counter = counter.add(1);
    }
}
