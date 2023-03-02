import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { chainIds, chainNames } from "../config";
import { ethers } from "ethers";

const contractName = "AxelarChainRegistry"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const [deployer] = await hre.getUnnamedAccounts();
  const initialValues = ethers.AbiCoder.defaultAbiCoder().encode(
    ["uint256[]", "string[]"],
    [chainIds, chainNames]
  );

  const receipt = await deploy(contractName, {
    args: [initialValues],
    from: deployer,
  });

  console.log(`${contractName} deployed at`, receipt.address);
};

export default func;
