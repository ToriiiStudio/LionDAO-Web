import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet, getCurrentWalletConnected} from './Interact';
import walletStatus from '../store/walletStatus';
import { isAndroid, isIOS } from "react-device-detect";

const useConnectWallet = () => {
  const dispatch = useDispatch(walletStatus);
  const { status, hint, connectId } = useSelector(state => state.walletStatus);

  useEffect(() => {
    initConnection();
  }, [])

  async function initConnection() {
    await fetchWalletAPI();
  }

  async function fetchWalletAPI() {
    const { address, status } = await getCurrentWalletConnected();

    if (address.length > 0){
      dispatch(walletStatus.actions.connectWallet());
      dispatch(walletStatus.actions.setConnectId(address.slice(0,6) + '...' + address.slice(-4)));
      
      // Whitelist
      const faunadb = require('faunadb')
      const q = faunadb.query
      const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNADB}) 
      client.query(q.Map(q.Paginate(q.Match(q.Index("Whitelist-Address"), window.ethereum.selectedAddress)),
            q.Lambda("signature", q.Get(q.Var("signature")))))
            .then((response) => {
              if (response.data[0] !== undefined){
                dispatch(walletStatus.actions.setHint("Awesome let's buy NFT. 2 pieces max in one address."));
              } else {
                dispatch(walletStatus.actions.setHint("You are not in whitelist."));
              }       
            }).catch((error) => {
              console.log('error', error)
              return {
                statusCode: 400,
                body: JSON.stringify(error)
              }
            })
    }

    addWalletListener();
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          dispatch(walletStatus.actions.connectWallet());
          dispatch(walletStatus.actions.setConnectId(accounts[0].slice(0,6) + '...' + accounts[0].slice(-4)));
        
          // Whitelist
          const faunadb = require('faunadb')
          const q = faunadb.query
          const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNADB}) 
          client.query(q.Map(q.Paginate(q.Match(q.Index("Whitelist-Address"), window.ethereum.selectedAddress)),
                q.Lambda("signature", q.Get(q.Var("signature")))))
                .then((response) => {
                  if (response.data[0] !== undefined){
                    dispatch(walletStatus.actions.setHint("Awesome let's buy NFT. 2 pieces max in one address."));
                  } else {
                    dispatch(walletStatus.actions.setHint("You are not in whitelist."));
                  }       
                }).catch((error) => {
                  console.log('error', error)
                  return {
                    statusCode: 400,
                    body: JSON.stringify(error)
                  }
                })
        } else {
          dispatch(walletStatus.actions.disconnectWallet());
          dispatch(walletStatus.actions.setConnectId(""));
          dispatch(walletStatus.actions.setHint("🦊 Please Connect to Metamask with the button first."));
        }
      });
    } else {
      dispatch(walletStatus.actions.disconnectWallet());
      dispatch(walletStatus.actions.setConnectId(""));
      dispatch(walletStatus.actions.setHint(<span>
        <p>
          {" 🦊 You must install "} 
          <a target="_blank" href={`https://metamask.io/download.html`} rel="noopener noreferrer" style={{textDecoration: 'underline'}}>
            Metamask
          </a>
          {"."}
          <br />
          {"A virtual Ethereum wallet in your browser."}
        </p>
      </span>));
    }
  }

  async function handleConnectWallet () {
    if (isAndroid || isIOS){
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        window.location = "https://metamask.app.link/dapp/liondaonft.com/";
      } else {
        const walletResponse = await connectWallet();
        if (walletResponse.address.length > 0){
          dispatch(walletStatus.actions.connectWallet());
          dispatch(walletStatus.actions.setConnectId(walletResponse.address.slice(0,6) + '...' + walletResponse.address.slice(-4)));
          
          // Whitelist
          const faunadb = require('faunadb')
          const q = faunadb.query
          const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNADB}) 
          client.query(q.Map(q.Paginate(q.Match(q.Index("Whitelist-Address"), window.ethereum.selectedAddress)),
                q.Lambda("signature", q.Get(q.Var("signature")))))
                .then((response) => {
                  if (response.data[0] !== undefined){
                    dispatch(walletStatus.actions.setHint("Awesome let's buy NFT. 2 pieces max in one address."));
                  } else {
                    dispatch(walletStatus.actions.setHint("You are not in whitelist."));
                  }       
                }).catch((error) => {
                  console.log('error', error)
                  return {
                    statusCode: 400,
                    body: JSON.stringify(error)
                  }
                })
        }
      }
    } else {
      const walletResponse = await connectWallet();
      if (walletResponse.address.length > 0){
        dispatch(walletStatus.actions.connectWallet());
        dispatch(walletStatus.actions.setConnectId(walletResponse.address.slice(0,6) + '...' + walletResponse.address.slice(-4)));
        
        // Whitelist
        const faunadb = require('faunadb')
        const q = faunadb.query
        const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNADB}) 
        client.query(q.Map(q.Paginate(q.Match(q.Index("Whitelist-Address"), window.ethereum.selectedAddress)),
              q.Lambda("signature", q.Get(q.Var("signature")))))
              .then((response) => {
                if (response.data[0] !== undefined){
                  dispatch(walletStatus.actions.setHint("Awesome let's buy NFT. 2 pieces max in one address."));
                } else {
                  dispatch(walletStatus.actions.setHint("You are not in whitelist."));
                }       
              }).catch((error) => {
                console.log('error', error)
                return {
                  statusCode: 400,
                  body: JSON.stringify(error)
                }
              })
      }
    }
  }

  return { 
    connectId,
    hint,
    status,
    onConnect: handleConnectWallet
  }
  
}

export default useConnectWallet;