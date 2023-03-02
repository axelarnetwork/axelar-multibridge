// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IMultiBridgeSender {
    function caller() external view returns (address);
}
