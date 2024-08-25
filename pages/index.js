import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = require('../artifacts/contracts/SmartContract.sol/SimpleContract.json').abi;

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const App = () => {
  // State for Smart Contract Interaction
  const [contract, setContract] = useState(null);
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [deleteName, setDeleteName] = useState('');

  // State for Ethereum Wallet and ATM Contract
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  useEffect(() => {
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
    setContract(contractInstance);

    getWallet();
  }, []);

  const handleSetName = async () => {
    await contract.methods.setName(name).send({ from: account[0] });
    setName('');
    handleGetNames();
  };

  const handleGetNames = async () => {
    const names = await contract.methods.getAllNames().call();
    setNames(names);
  };

  const handleResetNames = async () => {
    await contract.methods.reset().send({ from: account[0] });
    setNames([]);
  };

  const handleDeleteName = async () => {
    await contract.methods.deleteName(deleteName).send({ from: account[0] });
    setDeleteName('');
    handleGetNames();
  };

  // wallet connection 

  const getWallet = async () => {
     if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, contractABI, signer);
 
    setATM(atmContract);
  }


  const getBalance = async () => {
    if (atm) {
      const bal = 0
      // setBalance((await atm.getBalance()).toNumber());
      setBalance(bal);
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <button onClick={deposit}>Add Money 1 ETH</button>
        <button onClick={withdraw}>Send Letter(1 ETH)</button>
        <p></p>
        <h2>Diary of love</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name to add" />
        <button onClick={handleSetName}>Add name</button><br /><br />

        <input type="text" value={deleteName} onChange={(e) => setDeleteName(e.target.value)} placeholder="Name to delete" />
        <button onClick={handleDeleteName}>Delete Name</button><br /><br />

        <button onClick={handleGetNames}>Send Love Letter to all</button>
        <button onClick={handleResetNames}>Erase Every Person Memory</button>
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      <header>
        <h1>Welcome to the Trip Diary!</h1>
      </header>

      {/* Death Note Functionality */}
      {/* <div>
        <h2>Diary of love</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name to add" />
        <button onClick={handleSetName}>Add name</button><br /><br />

        <input type="text" value={deleteName} onChange={(e) => setDeleteName(e.target.value)} placeholder="Name to delete" />
        <button onClick={handleDeleteName}>Delete Name</button><br /><br />

        <button onClick={handleGetNames}>Send Letter to all</button>
        <button onClick={handleResetNames}>Erase Every Person Memory</button>
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div> */}

      {/* ATM Functionality */}
      <div>
        {initUser()}
      </div>

      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default App;
