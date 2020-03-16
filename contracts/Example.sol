pragma solidity ^0.5.16;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Example {
    using SafeMath for uint256;

    uint256 public counter;

    constructor() public {}

    function increment() public {
        counter = counter.add(1);
    }
}
