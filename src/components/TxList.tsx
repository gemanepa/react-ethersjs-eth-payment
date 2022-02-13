export default function TxList({ txs }: TxListProps) {
    if (txs.length === 0) return null;
    return (
      <>
        {txs.map((item) => (
          <div key={item.hash} className="alert alert-info mt-5">
            <div className="flex-1 flex-col justify-center text-center w-full">
              <label className="truncate">{item.hash}</label>
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