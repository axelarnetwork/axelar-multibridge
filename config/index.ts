import testnet from "@axelar-network/axelar-cgp-solidity/info/testnet.json";

export const chainIds = [43113, 5];

export const chainNames = ["Avalanche", "ethereum-2"];

export const multiSenderAddress = [
  "0x5a5f095183241f4b23a7aa7f8949fd02d06caecf",
  "0x5a5f095183241f4b23a7aa7f8949fd02d06caecf",
];

export const chainInfos = chainIds.reduce((acc, chainId, index) => {
  acc[chainId.toString()] = testnet.find((chain) => chain.chainId === chainId);
  return acc;
}, {} as Record<string, any>);
