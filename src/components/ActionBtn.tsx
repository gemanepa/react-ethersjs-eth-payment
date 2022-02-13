const btnClass =
"btn btn-primary submit-button focus:ring focus:outline-none w-full";

const payBtn = (
    <button type="submit" className={btnClass}>
      Pay now
    </button>
  );

const ActionBtn = ({ siteConnected, handleBtnConnectSiteClick }: ActionBtnProps) => {
  const connectSiteBtn = (
    <button type="button" className={btnClass} onClick={() => handleBtnConnectSiteClick()}>
      Connect Browser Wallet
    </button>
  );

  return siteConnected ? payBtn : connectSiteBtn
}

type ActionBtnProps = {
    siteConnected: boolean,
    handleBtnConnectSiteClick: () => void
}

export default ActionBtn;