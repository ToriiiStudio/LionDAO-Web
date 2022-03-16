import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import LinksList from './LinksList';
import LinksListMobile from './LinksListMobile';
import ConnectButton from './ConnectButton';
import LanguageButton from './LanguageButton';
import { respondTo } from '../../utils/responsive';
import { colors } from '../../constants/colors';
import useWording from '../../utils/useWording';

const Header = () => {
  const wording = useWording('header');

  const headerRef = useRef(null);
  const fixederRef = useRef();

  const prevPageYOffset = useRef(0);
  const navbarTop = useRef(0);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);    
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [])

  function handleWindowScroll() {
    const pageYOffset = Math.max(window.pageYOffset, 0);
    const delta = pageYOffset - prevPageYOffset.current;
    navbarTop.current = navbarTop.current - delta;
    navbarTop.current = Math.max(navbarTop.current, -160);

    if (delta < 0) navbarTop.current = 0;
    fixederRef.current.style.setProperty('transition-duration', (delta < 0) ? '0.3s': '0s');
    fixederRef.current.style.setProperty('transform', `translateY(${navbarTop.current}px)`);

    prevPageYOffset.current = pageYOffset;
  }


  return (
    <Root ref={headerRef}>
      <Fixeder ref={fixederRef}>
        <Wrapper>
          <Link className="logo" to="/">
            <img src="/images/header-logo.svg" alt="" />
          </Link>
          <Side>
            <MenuWrapper className="menu">
              <LinksList className="link-list" data={wording.links} />
              {/* <SocialList data={wording.socials} /> */}
            </MenuWrapper>
            <Buttonbar>
              <ConnectButton />
              <LanguageButton className="lang" />
            </Buttonbar>
          </Side>
        </Wrapper>
        <LinksListMobile data={wording.links} />
      </Fixeder>
    </Root>
  )
}

const Root = styled.header`
  height: 96px;
  ${respondTo.md} {
    height: 54px;
  }
`

const Fixeder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0px 24px;
  width: 100%;
  height: 96px;
  z-index: 5;
  box-sizing: border-box;
  color: ${colors.white};
  background-color: ${colors.mainColor};
  transition: transform .3s ease;
  ${respondTo.md} {
    padding: 0;
    height: 54px;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.green};
  margin: 0 auto;
  width: 1200px;
  max-width: 100%;
  height: 100%;
  transition: all .3s ease ${({time}) => time}ms;
  box-sizing: border-box;
  ${respondTo.md} {
    padding: 0 20px;
  }
  .logo {
    position: relative;
    display: flex;
    align-items: center;
    width: 200px;
    z-index: 3;
    ${respondTo.md} {
      width: 108px;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  .menu {
    height: 100%;
    box-sizing: border-box;
    ${respondTo.md} {
      height: auto;
    }
    .link-list {
      display: flex;
      ${respondTo.md} {display: none; }
    }
  }
`

const Side = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: calc(100% - 240px);
  ${respondTo.md} {
    width: auto;
  }
`

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 24px;
  ${ respondTo.md } {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    position: absolute;
    border-radius: 8px;
    top: 100%;
    right: 40px;
    padding: 12px 30px;
    background: hsla(0, 0%, 30%, .66);
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transform: translateY(12px);
    transition: all .3s ease;
    box-sizing: border-box;
    ${({open}) => open && css`
      visibility: visible;
      opacity: 1;
      transform: translateY(0%);
    `}
  }
`
const Buttonbar = styled.div`
  display: flex;
  align-items: center;
  .lang {
    margin-left: 12px;
  }
`

export default Header;
