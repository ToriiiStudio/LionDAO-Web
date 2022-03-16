import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Carousel from '../../components/Carousel';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';
import { scrollTo } from '../../utils/scrollTo';
import useWording from '../../utils/useWording';

const StorySection = () => {
  const wording = useWording('homepage.story');
  const rootRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [ currentIndex, setCurrentIndex ] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleWatchScroll);
    return () => window.removeEventListener('scroll', handleWatchScroll);
  }, [])

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex])
  
  function handleWatchScroll() {
    const distance = rootRef.current.offsetHeight - window.innerHeight;
    const deltaScroll = window.pageYOffset - rootRef.current.offsetTop;
    const process = Math.min(Math.max(0, deltaScroll / distance), 1);
    const result = Math.max(Math.ceil(process * wording.length-1), 0);

    if (currentIndexRef.current !== result) {
      setCurrentIndex(result);
    }
  }

  function handleClickSide(e) {
    const index = Number(e.currentTarget.dataset.index);
    handleChangeCurrent(index);
  }

  function handleChangeCurrent(num) {
    const basic = rootRef.current.offsetTop;
    const distance = rootRef.current.offsetHeight - window.innerHeight;
    const percent = num / (wording.length-1);
    const process = distance * percent;
    scrollTo(0.3, basic + process);
  }
  
  return (
    <Root id="meta">
      <StoryWrapper ref={rootRef} qty={wording.length}>
        <StoryBoard>
          <Main>
            { wording.map((child, i) =>
              <MainItem key={i} active={currentIndex === i}>
                <div className="content">
                  <img src={child.photo} alt="" />
                  <p>{ child.content }</p>
                </div>
              </MainItem>)
            }
            <Dots>
              { wording.map((_, i) =>
                <Dot key={i}
                  data-index={i}
                  active={currentIndex === i}
                  onClick={handleClickSide} />
              ) }
            </Dots>
          </Main>
          <Side>
            { wording.map((item, i) => 
              <SideItem qty={wording.length} key={i} data-index={i} active={currentIndex === i}
                onClick={handleClickSide}>
                <img src={item.photo} alt="" />
              </SideItem>
            ) }
          </Side>
        </StoryBoard>
      </StoryWrapper>
      <StoryCarousel>
        <Carousel>
          { wording.map((item, i) => 
            <StoryItem key={i}>
              <img src={ item.photo } alt="" />
              <p>{ item.content }</p>
            </StoryItem>
          ) }
        </Carousel>
        <img className="wall" src="/images/story-wall.png" alt="" />
      </StoryCarousel>
    </Root>
  )
}

const Root = styled.div`
  background-color: ${colors.darkMainColor};
`

const StoryWrapper = styled.div`
  height: ${({ qty }) => qty * 100}vh;
  ${respondTo.md} {
    display: none;
  }
`

const StoryBoard = styled.div`
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`

const StoryCarousel = styled.div`
  display: none;
  padding-top: 70px;
  ${respondTo.md} {
    display: block;
  }
  .wall {
    display: block;
    margin-top: 60px;
    width: 100%;
    height: auto;
    filter: grayscale(1);
  }
`

const StoryItem = styled.div`
  padding-bottom: 12px;
  img {
    margin: 0 auto;
    margin-bottom: 30px;
    width: 286px;
    height: auto;
    box-shadow: 16px 16px 0px ${colors.mainColor};
  }
  p {
    margin: 0 auto;
    width: 245px;
    font-size: 12px;
    color: ${colors.green};
    text-align: center;
  }
`

const Main = styled.div`
  position: relative;
  width: calc(100% - 200px);
  height: 100vh;
`
const Side = styled.div`
  width: 200px;
`

const MainItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0;
  transition: all .3s ease;
  ${({ active }) => active && css`
    opacity: 1;
  `}
  .content {
    width: 550px;
    max-width: 100%;
    text-align: center;
    color: ${colors.green};
    white-space: break-spaces;
    img {
      display: block;
      margin: auto;
      width: 100%;
      height: auto;
      margin-bottom: 30px;
      box-shadow: 16px 16px 0px ${colors.mainColor};
    }
  }
`
const SideItem = styled.div`
  width: 100%;
  height: ${({ qty }) => 100/qty}vh;
  filter: grayscale(1);
  opacity: .3;
  transition: all .3s ease;
  cursor: pointer;
  &:hover {
    filter: grayscale(0);
    opacity: 1;
  }
  ${({ active }) => active && css`
    filter: grayscale(0);
    opacity: 1;
  `}
  img {
    object-fit: cover;
    display: block;
    width: 100%;
    height: 100%;
  }
`

const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 5%;
  left: 0;
  width: 100%;
  z-index: 3;
`

const Dot = styled.button`
  display: inline-block;
  border: 0;
  border-radius: 8px;
  margin: 0 7px;
  width: 30px;
  height: 4px;
  color: transparent;
  background: ${colors.green};
  opacity: .15;
  transition: all .3s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  ${({ active }) => active && css`
    opacity: 1;
  `}

`

export default StorySection;