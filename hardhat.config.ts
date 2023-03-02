import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import { privateKey } from "./secret.json";
import { chainIds } from "./config";
import { ethers } from "ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: chainIds[0],
      forking: {
        url: "https://goerli.blockpi.network/v1/rpc/public",
      },
    },
    goerli: {
      chainId: chainIds[1],
      url: "https://goerli.blockpi.network/v1/rpc/public",
      accounts: [privateKey],
      gasMultiplier: 1.5,
    },
    avalanche: {
      chainId: chainIds[0],
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [privateKey],
    },
  },
  deterministicDeployment: (network: string) => {
    return {
      deployer: new ethers.Wallet(privateKey).address,
      factory: "",
      funding: "",
      signedTx: "",
    };
  },
};

export default config;
