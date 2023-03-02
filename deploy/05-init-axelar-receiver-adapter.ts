import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { chainIds, chainInfos, multiSenderAddress } from "../config";

const contractName = "AxelarReceiverAdapter";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { execute, read } = hre.deployments;
  const [deployer] = await hre.getUnnamedAccounts();
  const chainId = hre.network.config.chainId || chainIds[0];
  const chainInfo = chainInfos[chainId];
  const chainRegistry = await hre.deployments.get("AxelarChainRegistry");

  const initialized = await read(contractName, "initialized");

  if (initialized) {
    console.log(`${contractName} already initialized`);
  } else {
    console.log(`${contractName} is not initialized, initializing...`);
    const initData = [chainRegistry.address, chainInfo.gateway];
    const executeTx = await execute(
      contractName,
      {
        from: deployer,
      },
      "init",
      ...initData
    );
    console.log(`${contractName} initialized`, executeTx.transactionHash);

    // Set multi sender address
    const setMultiSenderTx = await execute(
      contractName,
      {
        from: deployer,
      },
      "updateSenderAdapter",
      chainIds,
      multiSenderAddress
    );
  }
};

export const dependencies = ["AxelarReceiverAdapter"];

export default deploy;
