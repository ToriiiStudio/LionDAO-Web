import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Minus } from '../../components/Icons';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';
import useConnectWallet from '../../utils/useConnectWallet';
import useMint from '../../utils/useMint';

const max = 2;

const MintSection = ({ price }) => {
  const [ qty, setQty ] = useState(1);
  const { hint } = useConnectWallet();
  const { onMint, status } = useMint();

  function handleAddQty() {
    if (qty<max){
      let currentQty = Math.max(qty+1, 1);
      setQty(currentQty);
    }
  }

  function handleDecreaseQty() {
    let currentQty = Math.max(qty-1, 1);
    setQty(currentQty);
  }
  
  function handleSetQty(value) {
    if (value<=max){
      setQty(value);
    } else {
      setQty(max);
    }
  }
  
  async function handleClickMintButton() {
    onMint(qty);
  }
  
  return (
    <Root>
      <div className="price">
        <label>MINT PRICE</label>
        <p><span>{ price }</span> ETH</p>
      </div>
      <QtySelector qty={qty} 
        onPlusClick={handleAddQty}
        onMinusClick={handleDecreaseQty}
        onQtyInput={handleSetQty}
      />
      <div className="buttonbar">
        <Button onClick={handleClickMintButton}>MINT</Button>
      </div>
      <div className="hint">{ status || hint }</div>
    </Root>
  )
}


const QtySelector = ({ qty, onPlusClick, onMinusClick, onQtyInput }) => {

function handleChangeQty(e) {
  const value = Number(e.currentTarget.value);
  (value !== NaN && value >= 0) && onQtyInput(value);
}

return (
  <Selector>
    <QtyButton disabled={qty <= 1} onClick={onMinusClick}><Minus /></QtyButton>
    <input className="qty" type="text" value={qty} onChange={handleChangeQty} />
    <QtyButton disabled={false} onClick={onPlusClick}><Plus /></QtyButton>
  </Selector>
)
}

const Root = styled.div`
  text-align: center;
  .price {
    margin-bottom: 48px;
    text-transform: uppercase;
    label {
      font-size: 16px;
      color: ${colors.green};
    }
    p {
      font-size: 32px;
      color: ${colors.green};
      span {
        color: ${colors.brown};
      }
    }
  }
  .hint {
    margin-top: 16px;
    color: ${colors.brown};
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: 300;
    ${respondTo.md} {
      font-size: 12px;
    }
  }
  .buttonbar {
    text-align: center;
    margin-top: 16px;
  }
`

const Selector = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${colors.green};
  border-radius: 12px;
  .qty {
    border: 0;
    border-radius: 5px;
    height: 40px;
    width: 60px;
    line-height: 30px;
    font-size: 16px;
    background: transparent;
    color: ${colors.green};
    text-align: center;
  }
`

const QtyButton = styled.button`
  border: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  font-size: 12px;
  line-height: 1;
  background: transparent;
  color: ${colors.brown};
  > svg {
    width: 18px;
  }
  &:first-child {
    margin-right: 18px;
  }
  &:last-child {
    margin-left: 18px;
  }
`

const Button = styled.button`
  border: 0;
  border-radius: 12px;
  padding: 10px 24px;
  height: 40px;
  width: 170px;
  background: ${colors.green};
  color: ${colors.mainColor};
`

export default MintSection