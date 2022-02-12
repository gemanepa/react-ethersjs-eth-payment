export default function TxList({ txs }: TxListProps) {
    if (txs.length === 0) return null;
    console.log('txs ', txs)
    return (
      <>
        {txs.map((item) => (
          <div key={item.hash} className="alert alert-info mt-5">
            <div className="flex-1 flex-col justify-center text-center">
              <label>{item.hash}</label>
              <label>Amount: {item.value} ETH</label>
              <label>Gas Price: {item.gasPrice} ETH</label>
            </div>
          </div>
        ))}
      </>
    );
  }
  
type TxListProps = {
  txs: { hash: string, value: number, gasPrice: number }[]
}