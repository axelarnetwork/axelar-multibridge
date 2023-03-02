import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "ethers";

const contractName = "AxelarSenderAdapter";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deterministic } = hre.deployments;
  const [deployer] = await hre.getUnnamedAccounts();

  const { deploy } = await deterministic(contractName, {
    from: deployer,
    salt: ethers.id("v1"),
    args: [deployer],
  });

  const receipt = await deploy();

  console.log(`${contractName} deployed at`, receipt.address);
};

export const dependencies = ["AxelarChainRegistry"];

export default deploy;
