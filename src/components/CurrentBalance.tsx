const CurrentBalance = ({ balance }: CurrentBalanceProps) => (
    <h2 className="mt-2 p-2 text-l font-semibold text-gray-700">
        {balance && `Current Balance: ${balance} ETH`}
    </h2>
)

type CurrentBalanceProps = {
    balance: string
}

export default CurrentBalance;