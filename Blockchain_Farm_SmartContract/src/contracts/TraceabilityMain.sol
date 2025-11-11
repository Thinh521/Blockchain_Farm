// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./BusinessRegistry.sol";
import "./CompanyRegistry.sol";
import "./FarmRegistry.sol";
import "./ProductRegistry.sol";
import "./ProcessRegistry.sol";


contract TraceabilityMain is
    BusinessRegistry,
    CompanyRegistry,
    FarmRegistry,
    ProductRegistry,
    ProcessRegistry
{
    constructor() {}

}
