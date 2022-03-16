import React, { useRef } from 'react';
import Slick from 'react-slick';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';

const Carousel = ({ className='', controller=true, children }) => {
  const carouselRef = useRef(null);
  const slickSettings = {
    arrows: false,
    infinite: true,
    dots: true,
    slidesToShow: 1
  };

  function handleClickArrowButton(e) {
    if (carouselRef.current) {
      const { direction } = e.currentTarget.dataset;
      if (direction === 'prev') carouselRef.current.slickPrev();
      if (direction === 'next') carouselRef.current.slickNext();
    }
  }


  return (
    <Root>
      { controller &&
        <NavContainer>
          <button data-direction="prev" onClick={handleClickArrowButton}/>
          <button data-direction="next" onClick={handleClickArrowButton}/>
        </NavContainer>
      }
      <CarouselBody>
        <Slick className={className} ref={carouselRef} {...slickSettings}>
          { children.map((child, i) => <div key={i}>{ child }</div>) }
        </Slick>
      </CarouselBody>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  .slick-dots {
    z-index: 1;
    li, button {
      width: auto;
      padding: 0;
      margin: 0 4px;
      height: auto;
      ${respondTo.md} {
        margin: 0 3px;
      }
    }
    button:before {
      position: relative;
      display: inline-block;
      border-radius: 8px;
      margin: 0;
      width: 30px;
      height: 4px;
      color: transparent;
      background: ${colors.brown};
      opacity: .15;
      transition: all .3s ease;
    }
    .slick-active button:before {
      color: transparent;
      opacity: 1;
    }
  }
`

const CarouselBody = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`

const NavContainer = styled.div`
  > button {
    position: absolute;
    top: 0;
    width: 20%;
    height: 100%;
    border: 0;
    background: transparent;
    z-index: 2;
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
  }
`
export default Carousel;
