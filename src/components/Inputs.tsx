const Inputs = ({ siteConnected }: InputsProps) => (
    <div className={!siteConnected ? 'opacity-50' : ''}>
      <div className="my-3">
        <input
          type="text"
          name="addr"
          className="input input-bordered block w-full focus:ring focus:outline-none"
          placeholder="Recipient Address"
          disabled={!siteConnected}
        />
      </div>
      <div className="my-3">
        <input
          name="ether"
          type="text"
          className="input input-bordered block w-full focus:ring focus:outline-none"
          placeholder="Amount in ETH"
          disabled={!siteConnected}
        />
      </div>
    </div>
  );
  
  type InputsProps = {
    siteConnected: boolean,
  };
  
  export default Inputs;
  