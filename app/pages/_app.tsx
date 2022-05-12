
import { AppProps } from 'next/app';
import { Provider, createClient, chain } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { providers } from 'ethers';
const { JsonRpcProvider, getNetwork } = providers;

const ETH_RPC_URL = 'https://eth-goerli.alchemyapi.io/v2/qN6hf8EK20v1LhblrIGvSRyw4FE6Tvfq';
const client = createClient({
  autoConnect: true,
  provider: new JsonRpcProvider(ETH_RPC_URL, getNetwork(5)),
  connectors: [new MetaMaskConnector({ chains: [chain.goerli] })],
});

function App({ Component, pageProps, router }: AppProps) {
  return (
    <Provider client={client}>
      <Component {...pageProps} key={router.route} />
    </Provider>
  );
}

export default App;
