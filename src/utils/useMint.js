import { useEffect, useState } from 'react';
import { whitelistNFT } from './Interact';

const useConnectWallet = () => {
  const [ curChain, setCurChain ] = useState(null);
  const [ status, setStatus ] = useState(null);

  useEffect(() => {
    fetchChainId();
  }, [])


  async function fetchChainId() {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setCurChain(chainId);
    }
    handleCurChainListener();
  }

  function handleCurChainListener(){
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (ChainId) => {
        setCurChain(ChainId);
      });
    }
  }

  async function handleMint(amount) {
    const { success, status } = await whitelistNFT(amount, curChain);
    setStatus(status);
  }

  return { 
    curChain,
    status,
    onMint: handleMint
  }
  
}

export default useConnectWallet;