// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract JsonString{
     string public jsonData;

    function storeData(string memory _jsonData) public {
        jsonData = _jsonData;
    }

    function getData() public view returns (string memory) {
        return jsonData;
    }
}