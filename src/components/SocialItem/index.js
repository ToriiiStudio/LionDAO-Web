import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';
import { Twitter, Facebook, Discord, Opensea } from '../../components/Icons';

const SocialItem = ({icon, children, ...props}) => {
  return (
    <Item {...props}>
      { children }
      { icon === 'Twitter' && <Twitter /> }
      { icon === 'Facebook' && <Facebook /> }
      { icon === 'Discord' && <Discord /> }
      { icon === 'Opensea' && <Opensea /> }
    </Item>
  )
}

const Item = styled.a`
  display: flex;
  align-items: center;
  color: ${colors.green};
  width: 30px;
  transition: opacity .3s ease;
  ${respondTo.md} {
    width: 16px;
  }
  svg, img {
    display: block;
    width: 100%;
    height: auto;
  }
`


export default SocialItem;