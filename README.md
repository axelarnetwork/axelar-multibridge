# Axelar bridge for Multibridge

The Axelar bridge is an additional bridge that can be integrated into the Multi-Message Aggregation (MMA) project to enable cross-chain message passing between different blockchain networks.

To add the Axelar bridge to the MMA network, you can use the deployment script provided in this repository. This script will deploy the necessary contracts and configure the Axelar bridge to work with the other bridges in the MMA network.

For more information on the Multi-Message Aggregation (MMA) project, please visit the [Multibridge project](https://github.com/MultiMessageAggregation/multibridge).

## Deployment

1. Run `yarn` to install dependencies

2. Copy `secret.json.example` to `secret.json` and fill your private key.

3. Run `yarn deploy --network <NETWORK_TO_DEPLOY>`

The available values for `NETWORK_TO_DEPLOY` are:

- goerli
- avalanche

Note: You can look at `hardhat.config.ts` to confirm supported networks.
