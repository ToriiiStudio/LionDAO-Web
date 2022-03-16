import React from 'react';
import styled, { css } from 'styled-components';
import { respondTo } from '../../utils/responsive';
import { colors } from '../../constants/colors';
import Link from '../../components/CustomLink';

const LinksList = ({ data, onLinkClick, ...props }) => {

  return (
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
  )
}

const List = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  ${respondTo.md} {
    display: block;
    height: auto;
    text-align: center;
  }
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
  font-size: 16px;
  font-weight: 400;
  color: ${colors.green};
  transition: color .3s ease;
  letter-spacing: ${16 * 0.012}px;
  &:last-child {
    margin-right: 0;
  }
  ${respondTo.md} {
    display: block;
    margin: 0;
    padding: 4px 0;
    width: 100%;
    height: auto;
    font-size: 12px;
    font-weight: 600;
    font-style: normal;
    text-align: center;
    & + a {
      margin-top: 32px;
    }
  }

  ${({ show }) => show === 'desktop' && css`
    display: none;
  `}

  ${ respondTo.md } {
    display: block;
    ${({ show }) => show === 'desktop' && css`
      display: block;
    `}
  }
`

export default LinksList;