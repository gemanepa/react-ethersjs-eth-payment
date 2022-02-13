import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Header from "./components/Header";
import Title from "./components/Title"
import CurrentBalance from "./components/CurrentBalance";
import ErrorMessage from "./components/ErrorMessage";
import TxList from "./components/TxList";
import Inputs from "./components/Inputs";
import ActionBtn from "./components/ActionBtn";
import startPayment from "./utils/startPayment";
import { NO_ETH_BROWSER_WALLET, FAILED_TO_CONNECT } from './constants/error';
import "./App.css";

export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [siteConnected, setSiteConnected] = useState(false);
  const [balance, setBalance] = useState("");

  const handleNewTx = (tx) => {
    setTxs([...txs, tx]);
    setBalance(balance - tx.gasPrice - tx.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (error) setError();
    await startPayment({
      setError,
      handleNewTx,
      ether: data.get("ether"),
      addr: data.get("addr"),
    });
  };

  const handleInitialConnection = async () => {
    setSiteConnected(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const listAccs = await provider.listAccounts();
    const balance = await provider.getBalance(listAccs[0]);
    const formattedBalance = ethers.utils.formatEther(balance);
    if (formattedBalance) setBalance(formattedBalance.toString());
  }

  useEffect(() => {
    const isBrowserWalletConnected = async () => {
      if (!window.ethereum)
        throw new Error(NO_ETH_BROWSER_WALLET);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if(accounts?.length > 0) {
          await handleInitialConnection();
        }
      
    }
    try { isBrowserWalletConnected() }
    catch (err) {
      setError(err.message);
    }
  }, [])

  async function handleBtnConnectSiteClick() {
    try {
      if (!window.ethereum)
        throw new Error(NO_ETH_BROWSER_WALLET); 

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        if (account) {
          await handleInitialConnection();
        } else {
          throw new Error(FAILED_TO_CONNECT);
        }

    } catch (err) {
      setError(err.message);
    }
  }



  return (
    <>
      <Header />
      <form className="m-4" onSubmit={handleSubmit}>
        <main className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <Title />
            <CurrentBalance balance={balance} />
            <Inputs siteConnected={siteConnected} />
          </div>
          <div className="p-4">
            <ActionBtn siteConnected={siteConnected} handleBtnConnectSiteClick={handleBtnConnectSiteClick}/>
            <ErrorMessage message={error} />
            <TxList txs={txs} />
          </div>
        </main>
      </form>
    </>
  );
}
