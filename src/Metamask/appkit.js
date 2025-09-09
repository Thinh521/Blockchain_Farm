import "@walletconnect/react-native-compat";
import "@ethersproject/shims";

import { createAppKit, defaultConfig, AppKit } from "@reown/appkit-ethers-react-native";

const projectId = '0e7d86fbd9291c953e8f5505b510a133';


const metadata = {
  name: 'Pione Farm',
  description: 'My Web3 React Native App',
  url: 'https://example.com',
  redirect: { native: 'walletconnectdemo://' },
};

const config = defaultConfig({ metadata });

const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    rpcUrl: "https://cloudflare-eth.com",
    explorerUrl: "https://etherscan.io"
  },
  {
    chainId: 137,
    name: "Polygon",
    currency: "MATIC",
    rpcUrl: "https://polygon-rpc.com",
    explorerUrl: "https://polygonscan.com"
  },
  {
    chainId: 5080,
    name: "Pione Zero",
    currency: "Pione Zero",
    rpcUrl: "https://rpc.zeroscan.org",
    explorerUrl: "https://zeroscan.org"
  }
];



// ✅ Tạo và export appKit
export const appKit = createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true
});
