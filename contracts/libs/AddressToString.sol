// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library AddressToString {
    function toString(address addr) internal pure returns (string memory) {
        bytes memory addressBytes = abi.encodePacked(addr);
        uint256 length = addressBytes.length;
        bytes memory characters = "0123456789abcdef";
        bytes memory stringBytes = new bytes(2 + addressBytes.length * 2);

        stringBytes[0] = "0";
        stringBytes[1] = "x";

        for (uint256 i; i < length; ++i) {
            stringBytes[2 + i * 2] = characters[uint8(addressBytes[i] >> 4)];
            stringBytes[3 + i * 2] = characters[uint8(addressBytes[i] & 0x0f)];
        }
        return string(stringBytes);
    }
}
