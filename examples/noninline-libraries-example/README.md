# zkSync 2.0 non-inline libraries environment example

This project demonstrates how to compile and deploy your contracts in zkSync 2.0 when there are missing libraries.

## Prerequisites

- node.js 14.x or later.
- yarn.

## Configuration

Plugin configuration is located in [`hardhat.config.ts`](./hardhat.config.ts).
You should only change the zkSync network configuration.

`hardhat.config.ts` example with zkSync network configured with the name `zkTestnet` and `goerli` used as the underlying layer 1 network:
```ts
import "@matterlabs/hardhat-zksync-deploy";
import { HardhatUserConfig } from 'hardhat/types';

const config: HardhatUserConfig = {
    networks: {
        goerli: {
            url: 'https://goerli.infura.io/v3/<API_KEY>' // you can use either the URL of the Ethereum Web3 RPC, or the identifier of the network (e.g. `mainnet` or `rinkeby`)
        },
        zkTestnet: {
            url: 'https://zksync2-testnet.zksync.dev', // you should use the URL of the zkSync network RPC
            ethNetwork: 'goerli',
            zksync: true
        },
    }
};

export default config;
```

## Usage

Before using plugins, you need to build them first

```sh
# Run the following in the *root* of the repo.
yarn
yarn build
```

After that you should be able to run plugins:

```sh
# Run the following in `examples/noninline-libraries-example` folder.
yarn
yarn hardhat compile
yarn hardhat deploy-zksync:libraries --private-key PRIVATE_KEY
yarn hardhat compile
yarn hardhat deploy-zksync

```

- `yarn hardhat compile`: compiles all the contracts in the `contracts` folder. Since there will be missing libraries, the output of this command will be a file where all the missing libraries are stored with their dependent libraries.
- `yarn hardhat deploy-zksync:libraries --private-key PRIVATE_KEY`: compiles and deploys all the missing libraries obtained from the previous step, in order.
- `yarn hardhat compile`: compiles all the contracts in the `contracts` folder. Since all the missing libraries are deployed, the output of the command will be artifacts and cache files.
- `yarn hardhat deploy-zksync`: runs all the deploy scripts in the `deploy` folder.
    - To run a specific script, add the `--script` argument, e.g. `--script 001_deploy.ts`.
    - To run on a specific zkSync network, use standard hardhat `--network` argument, e.g. `--network zkTestnet`
    (with `zkTestnet` network specified in the `hardhat.config` networks section, with the `zksync` flag set to `true` and `ethNetwork` specified).

If you don't specify zkSync network (`--network`), `local-setup` with <http://localhost:8545> (Ethereum RPC URL) and <http://localhost:8011> (zkSync RPC URL) will be used.