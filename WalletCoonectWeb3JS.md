Провайдер Web3
```
npm install --save web3 @walletconnect/web3-provider
```
```
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
});
//  Enable session (triggers QR Code modal)
await provider.enable();
```
```
import Web3 from "web3";

//  Create Web3 instance
const web3 = new Web3(provider);
```
После настройки вашего провайдера вы должны прослушивать события EIP-1193 для обнаружения учетных записей и смены цепочки, а также отключения.
```
// Subscribe to accounts change
provider.on("accountsChanged", (accounts: string[]) => {
  console.log(accounts);
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId: number) => {
  console.log(chainId);
});

// Subscribe to session disconnection
provider.on("disconnect", (code: number, reason: string) => {
  console.log(code, reason);
});
```
Web3
```
//  Get Accounts
const accounts = await web3.eth.getAccounts();

//  Get Chain Id
const chainId = await web3.eth.getChainId();

//  Get Network Id
const networkId = await web3.eth.net.getId();

// Send Transaction
const txHash = await web3.eth.sendTransaction(tx);

// Sign Transaction
const signedTx = await web3.eth.signTransaction(tx);

// Sign Message
const signedMessage = await web3.eth.sign(msg);

// Sign Typed Data
const signedTypedData = await web3.eth.signTypedData(msg);
```
