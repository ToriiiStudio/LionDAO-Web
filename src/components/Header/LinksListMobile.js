import React from 'react';
import styled, { css } from 'styled-components';
import { respondTo } from '../../utils/responsive';
import { colors } from '../../constants/colors';
import Link from '../../components/CustomLink';

const LinksListMobile = ({ data, onLinkClick, ...props }) => {

  return (
    <Root>
      <List {...props}>
        { data.map((link, i) =>
          <React.Fragment key={i}>
          { link.to &&
            <LinkItem onClick={onLinkClick} to={link.to} show={link.hide}>{ link.title }</LinkItem>
          }
          {
            link.href &&
            <LinkItem as="a" href={link.href} target="_blank" show={link.hide}>{ link.title }</LinkItem>
          }
          </React.Fragment>
        ) }
      </List>
    </Root>
  )
}

const Root = styled.div`
  padding: 10px 45px;
  width: 100%;
  background-color: ${colors.green};
  box-sizing: border-box;
  display: none;
  ${respondTo.md} {
    display: block;
  }
`
const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const LinkItem = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 30px;
  border: 0;
  padding: 0 10px;
  height: 100%;
  background: transparent;
  font-size: 12px;
  font-weight: 400;
  color: ${colors.mainColor};
  transition: color .3s ease;
  letter-spacing: ${16 * 0.012}px;
  &:last-child {
    margin-right: 0;
  }
`

export default LinksListMobile;