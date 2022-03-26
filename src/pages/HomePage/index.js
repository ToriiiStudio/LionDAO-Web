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
  background: #828B75;
  font-size: 16px;
  color: ${colors.mainColor};
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


export default HomePage;