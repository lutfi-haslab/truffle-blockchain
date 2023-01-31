// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Count{
    uint256 public a;

    function set(uint256 _a) public {
        a = _a;
    }

    function get() public view returns(uint256){
        return a;
    }
}
