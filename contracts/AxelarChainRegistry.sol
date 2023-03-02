// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/IAxelarChainRegistry.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AxelarChainRegistry is AccessControl, IAxelarChainRegistry {
    mapping(uint256 => string) chainIdToName;
    mapping(string => uint256) nameToChainId;
    mapping(uint256 => uint256) chainIdToFee;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant SETTER_ROLE = keccak256("SETTER_ROLE");

    constructor(bytes memory initialValues) {
        (uint256[] memory chainIds, string[] memory chainNames) = abi.decode(
            initialValues,
            (uint256[], string[])
        );

        require(
            chainIds.length == chainNames.length,
            "chainIds and chainNames must have the same length"
        );

        for (uint256 i = 0; i < chainIds.length; i++) {
            chainIdToName[chainIds[i]] = chainNames[i];
            nameToChainId[chainNames[i]] = chainIds[i];
        }

        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(SETTER_ROLE, msg.sender);
    }

    function grantAdminRole(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(ADMIN_ROLE, account);
    }

    function addSetter(address setter) external onlyRole(ADMIN_ROLE) {
        _setupRole(SETTER_ROLE, setter);
    }

    function addChain(uint256 chainId, string calldata chainName)
        external
        onlyRole(SETTER_ROLE)
    {
        require(
            bytes(chainIdToName[chainId]).length == 0,
            "chainId already exist"
        );

        chainIdToName[chainId] = chainName;
        nameToChainId[chainName] = chainId;
    }

    function removeChain(uint256 chainId) external onlyRole(SETTER_ROLE) {
        require(
            bytes(chainIdToName[chainId]).length != 0,
            "chainId does not exist"
        );

        delete nameToChainId[chainIdToName[chainId]];
        delete chainIdToName[chainId];
    }

    function addChains(
        uint256[] calldata chainIds,
        string[] calldata chainNames
    ) external onlyRole(SETTER_ROLE) {
        require(
            chainIds.length == chainNames.length,
            "chainIds and chainNames must have the same length"
        );

        for (uint256 i = 0; i < chainIds.length; i++) {
            this.addChain(chainIds[i], chainNames[i]);
        }
    }

    function getChainName(uint256 chainId)
        external
        view
        returns (string memory)
    {
        return chainIdToName[chainId];
    }

    function getChainId(string calldata chainName)
        external
        view
        override
        returns (uint256)
    {
        return nameToChainId[chainName];
    }

    function setFee(uint256 chainId, uint256 fee)
        external
        onlyRole(SETTER_ROLE)
    {
        // revert if chainId does not exist
        require(
            bytes(chainIdToName[chainId]).length != 0,
            "chainId does not exist"
        );

        chainIdToFee[chainId] = fee;
    }

    function setFees(uint256[] calldata chainIds, uint256[] calldata fees)
        external
        onlyRole(SETTER_ROLE)
    {
        require(
            chainIds.length == fees.length,
            "chainIds and fees must have the same length"
        );

        for (uint256 i = 0; i < chainIds.length; i++) {
            this.setFee(chainIds[i], fees[i]);
        }
    }

    function getFee(uint256 chainId, uint32 gasLimit)
        external
        view
        override
        returns (uint256)
    {
        return chainIdToFee[chainId] * gasLimit;
    }
}
