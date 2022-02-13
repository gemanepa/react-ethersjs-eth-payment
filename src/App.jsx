import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./components/ErrorMessage";
import TxList from "./components/TxList";
import startPayment from "./utils/startPayment"
import './App.css';

export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [balance, setBalance] = useState(NaN)

  const handleNewTx = (tx) => {
    setTxs([...txs, tx])
    setBalance(balance - tx.gasPrice - tx.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (error) setError();
    await startPayment({
      setError,
      handleNewTx,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  useEffect(() => {
    async function fetchBalance() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const listAccs = await provider.listAccounts()
          const balance = await provider.getBalance(listAccs[0])
          const formattedBalance = ethers.utils.formatEther(balance)
          if(formattedBalance) setBalance(formattedBalance)
        } catch(e) {
          setError("Unable to connect site to Metamask account");
        }
      } else {
        setError("No crypto wallet found. Please install it.");
      }
    }
    fetchBalance();
  }, [])
  

  return (
    <>
      <header className="w-1/2 mx-auto flex flex-1 justify-around">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg" alt="" className="App-logo" title="Ethereum"/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="" className="App-logo" title="Metamask"/>
      </header>
      <form className="m-4" onSubmit={handleSubmit}>
        <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Send ETH Metamask Payment
            </h1>
            {balance && <h2 className="mt-2 p-2 text-l font-semibold text-gray-700">Current Balance: {balance} ETH</h2>}
            <div className="">
              <div className="my-3">
                <input
                  type="text"
                  name="addr"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Recipient Address"
                />
              </div>
              <div className="my-3">
                <input
                  name="ether"
                  type="text"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Amount in ETH"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Pay now
            </button>
            <ErrorMessage message={error} />
            <TxList txs={txs} />
          </footer>
        </div>
      </form>
    </>

  );
}
