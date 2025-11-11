// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FarmRegistry {
    struct Farm {
        uint256 id;
        string name;
        address owner;
    }

    uint256 public nextFarmId;
    mapping(uint256 => Farm) public farms;

    function registerFarm(string memory _name) public {
        farms[nextFarmId] = Farm(nextFarmId, _name, msg.sender);
        nextFarmId++;
    }

    function getFarm(uint256 _id) public view returns (Farm memory) {
        return farms[_id];
    }
}
