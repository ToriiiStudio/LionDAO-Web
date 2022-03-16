import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';
import language from "../../store/language";
import LanguageHelper from '../LanguageHelper';

const LanguageButton = ({ ...props }) => {
  const { lang } = useSelector(state => state.language);
  const [ selectedLang, setSelectedLang ] = useState(null);

  function handleClickLink(e) {
    const lang = e.currentTarget.dataset.lang;
    setSelectedLang(lang);
  }
  
  return (
    <Root {...props}>
      { selectedLang &&
        <LanguageHelper selectedLang={selectedLang} />
      }
      <LinkItem data-lang="en" active={lang !== 'en'} to="/" onClick={handleClickLink}>EN</LinkItem>
      <div className="slice">/</div>
      <LinkItem data-lang="zh-TW" active={lang !== 'zh-TW'} to="/zh-TW" onClick={handleClickLink}>中文</LinkItem>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  > .slice {
    display: none;
    margin: 0 2px;
    color: ${colors.brown};
    font-size: 12px;
    ${respondTo.md} {
      display: block;
    }
  }
`

const LinkItem = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 0px 20px;
  height: 38px;
  background-color: ${colors.brown};
  color: ${colors.mainColor};
  pointer-events: none;
  white-space: nowrap;
  box-sizing: border-box;
  ${({ active }) => active && css`
    background-color: transparent;
    color: ${colors.green};
    pointer-events: auto;
  `}
  ${respondTo.md} {
    padding: 0;
    background-color: transparent;
    color: ${colors.brown};
    font-size: 12px;
  }
`

export default LanguageButton;