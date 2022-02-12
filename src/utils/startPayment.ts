import { ethers } from "ethers";

const startPayment = async ({ setError, handleNewTx, ether, addr }: StartPayment) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      
      const gasPrice = ethers.utils.formatEther(Number(tx.gasPrice))
      const value = ethers.utils.formatEther(tx.value)

      handleNewTx({ hash: tx.hash, gasPrice, value });
    } catch (err: any) {
      setError(err.message);
    }
  };

type StartPayment = {
    setError: (arg0: string) => void;
    handleNewTx: ({hash, gasPrice, value } : HandleNewTxt) => void;
    ether: string;
    addr: string;
}

type HandleNewTxt = { hash: string, gasPrice: string, value: string }

export default startPayment;
