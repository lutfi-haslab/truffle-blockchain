// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Adoption {
    address[16] public adopters; // Adopting a pet

    function adopt(uint256 petId) public returns (uint256) {
        // check that petId is in range of our adopters array
        require(petId >= 0 && petId <= 15); // add the address who called this function to our adopter array
        adopters[petId] = msg.sender; // return the petId provided as a confirmation
        return petId;
    } // Retrieving the adopters

    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}
