import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useConnectWallet from '../../utils/useConnectWallet';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';

const ConnectButton = ({ data, onLinkClick, ...props }) => {
  const { status, connectId, onConnect } = useConnectWallet();  

  async function handleClickConnectButton() {
    if (status !== 'connect') onConnect();
  }
  
  return (
    <Root {...props}>
      <WalletButton color={status === 'connect' ? 'normal' : 'gray'} onClick={handleClickConnectButton}>
        { status === 'connect' ? 
          <span>{ connectId }</span>
          : 
          <span>CONNECT WALLET</span>
        }
      </WalletButton>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  > .hint {
    transition: all .3s ease;
    transform: translateY(50%);
    opacity: 0;
    visibility: hidden;
  }
  &:hover > .hint {
    transform: translateY(0%);
    opacity: 1;
    visibility: visible;
  }
`

const WalletButton = styled.button`
  border: 1px solid ${colors.green};
  border-radius: 12px;
  padding: 0 24px;
  font-size: 16px;
  height: 38px;
  color: ${colors.green};
  background: transparent;
  white-space: nowrap;
  ${respondTo.md} {
    border-radius: 8px;
    padding: 0 14px;
    height: 26px;
    font-size: 12px;
  }
`


export default ConnectButton;