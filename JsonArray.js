const Web3 = require('web3');

// Connect to TomoChain nodes
const provider = new Web3.providers.HttpProvider('https://rpc.testnet.tomochain.com')
const web3 = new Web3(provider)

const contractAddress = "0x128C294b9e1AE7fea20dbFFa30ca0BEB50479edA";
const abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "jsonDataArray",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_jsonData",
        "type": "string"
      }
    ],
    "name": "storeData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllData",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getArrayLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
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

const json = {
  "name": "Lutfi",
  "born": "21 februari 1996",
  "age": 28
}
const main = async () => {
  const gasAmount  = await contract.methods.storeData(JSON.stringify(json)).estimateGas({ from: coinbase });
  const tx = {
    from: coinbase,
    to: contractAddress,
    gas: Number(gasAmount),
    data: contract.methods.storeData(JSON.stringify(json)).encodeABI()
  }

  const signature = await web3.eth.accounts.signTransaction(tx, privateKey);
  console.log(signature)
  contract.methods.getAllData().call().then(v => console.log("Value before increment: " + v));
  web3.eth.sendSignedTransaction(signature.rawTransaction).on("receipt", (receipt) => {
    console.log(receipt)
    contract.methods.getAllData().call().then(v => console.log("Value after increment: " + v));
  })
}

main()