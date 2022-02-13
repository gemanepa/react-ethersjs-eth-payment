import { ethers } from "ethers";
import { NO_ETH_BROWSER_WALLET } from '../constants/error';

const startPayment = async ({ setError, handleNewTx, ether, addr }: StartPayment) => {
    try {
      if (!window.ethereum)
        throw new Error(NO_ETH_BROWSER_WALLET);
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      
      const gasPrice = Number(ethers.utils.formatEther(Number(tx.gasPrice)))
      const value = Number(ethers.utils.formatEther(tx.value))

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

type HandleNewTxt = { hash: string, gasPrice: number, value: number }

export default startPayment;
