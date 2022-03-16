import React from 'react';
import styled from 'styled-components';
import HeadingSection from './HeadingSection';
import SocialItem from '../../components/SocialItem';
import IntroSection from './IntroSection';
import StorySection from './StorySection';
import TeamSection from './TeamSection';
import MintSection from './MintSection';
import SocialSection from './SocialSection';
import { colors } from '../../constants/colors';
import useWording from '../../utils/useWording';
import { respondTo } from '../../utils/responsive';
import Link from '../../components/CustomLink';

const HomePage = () => {
  const wording = useWording('homepage');
  return (
    <Root>
      <HeadingSection />
      <IntroSection />
      <StorySection />
      <TeamSection />
      <Banner>{ wording.banner }</Banner>
      <MintSection />
      <SocialSection />
      <MintButton to="/?to=mint">{ wording.mint_button }</MintButton>
      <Company>{ wording.side }</Company>
      <SocialBar>
        { wording.social.map((item, i) =>
          <SocialItem key={i} icon={item.icon} href={item.link} target="_blank" />
        ) }
      </SocialBar>
    </Root>
  )
}

const Root = styled.div`
  ${respondTo.md} {
    padding-top: 36px;
  }
`

const Banner = styled.div`
  padding: 140px 0;
  background: #AEB09E;
  font-size: 16px;
  color: ${colors.white};
  text-align: center;
  ${respondTo.md} {
    padding: 50px 72px;
    font-size: 12px;
  }
`

const MintButton = styled(Link)`
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid ${colors.mainColor};
  padding: 16px 0px 12px 0;
  width: 100%;
  background-color: ${colors.green};
  color: ${colors.mainColor};
  text-align: center;
  font-size: 12px;

  display: none;
  ${respondTo.md} {
    display: block;
  }
`


const Company = styled.div`
  position: fixed;
  top: 50%;
  left: 12px;
  transform-origin: left bottom;
  transform: rotate(90deg) translateX(-50%) translateY(-50%);
  color: ${colors.green};
  font-size: 16px;
  ${respondTo.md} {
    display: none;
  }
`

const SocialBar = styled.div`
  position: fixed;
  top: 50%;
  right: 12px;
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  color: ${colors.green};
  font-size: 16px;
  transform: translateY(-50%);
  a + a {
    margin-top: 26px;
  }
  &:before, &:after {
    content: "";
    position: absolute;
    left: 50%;
    width: 1px;
    height: 30px;
    background-color: ${colors.green};
  }
  &:before {
    bottom: 100%;
  }
  &:after {
    top: 100%;
  }
  ${respondTo.md} {
    position: relative;
    right: auto;
    transform: none;
    flex-direction: row;
    justify-content: center;
    background-color: ${colors.green};
    padding: 60px 0;
    a {
      width: 30px;
      color: ${colors.mainColor};
    }

    &:before, &:after {
      content: none;
    }
    > a + a {
      margin: 0;
      margin-left: 30px;
    }
  }
`


export default HomePage;