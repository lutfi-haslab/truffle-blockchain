const Web3 = require('web3');

// Connect to TomoChain nodes
const provider = new Web3.providers.HttpProvider('https://rpc.testnet.tomochain.com')
const web3 = new Web3(provider)

const contractAddress = "0x2Bb5C882E9Ed93A7D51d9dDd6aC801EFe0AC6771";
const abi = [
  {
    "inputs": [],
    "name": "a",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_a",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contract = new web3.eth.Contract(abi, contractAddress);

const privateKey = process.env.WALLET_PRIVATE_KEY;
// Unlock wallet by private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey)
let coinbase = account.address
web3.eth.accounts.wallet.add(privateKey);
web3.eth.defaultAccount = coinbase
console.log(coinbase)

const main = async () => {
  const tx = {
    from: coinbase,
    to: contractAddress,
    gas: 50000,
    data: contract.methods.set(6).encodeABI()
  }

  const signature = await web3.eth.accounts.signTransaction(tx, privateKey);
  console.log(signature)
  contract.methods.get().call().then(v => console.log("Value before increment: " + v));
  web3.eth.sendSignedTransaction(signature.rawTransaction).on("receipt", (receipt) => {
    console.log(receipt)
    contract.methods.get().call().then(v => console.log("Value after increment: " + v));
  })
}

main()