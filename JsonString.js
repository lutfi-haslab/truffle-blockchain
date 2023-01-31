const Web3 = require('web3');

// Connect to TomoChain nodes
const provider = new Web3.providers.HttpProvider('https://rpc.testnet.tomochain.com')
const web3 = new Web3(provider)

const contractAddress = "0xbF9B0b21ce3F78Af50b2908F3be9E7619508bCC5";
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "jsonData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_jsonData",
        "type": "string"
      }
    ],
    "name": "storeData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
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

const json = {
  "name": "Abdullah",
  "born": "21 februari 1996",
  "age": 27
}
const main = async () => {
  const tx = {
    from: coinbase,
    to: contractAddress,
    gas: 100000,
    data: contract.methods.storeData(JSON.stringify(json)).encodeABI()
  }

  // const signature = await web3.eth.accounts.signTransaction(tx, privateKey);
  // console.log(signature)
  contract.methods.getData().call().then(v => console.log("Value before increment: " + v));
  // web3.eth.sendSignedTransaction(signature.rawTransaction).on("receipt", (receipt) => {
  //   console.log(receipt)
  //   contract.methods.get().call().then(v => console.log("Value after increment: " + v));
  // })
}

main()