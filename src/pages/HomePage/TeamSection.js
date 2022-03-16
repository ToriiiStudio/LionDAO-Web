import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';
import useWording from '../../utils/useWording';

const TeamSection = () => {
  const wording = useWording('homepage.team');
  const rootRef = useRef(null);
  const [ currentIndex, setCurrentIndex ] = useState(0);

  function handleClickItem(e) {
    const index = Number(e.currentTarget.dataset.index);
    setCurrentIndex(index);
  }
  
  return (
    <Root ref={rootRef} id="team">
      <Wrapper>
        <Main>
          <Title>TEAM</Title>
          <ul>
            { wording.map((item, i) =>
              <li key={i}>
                <MainItem data-index={i} active={currentIndex === i} onClick={handleClickItem}>
                  <img src={ item.image } alt="" />
                  <div className="name">{ item.name }</div>
                  <div className="title">{ item.title }</div>
                  <p className="content">{ item.content }</p>
                </MainItem>
              </li>
            ) }
          </ul>
        </Main>
        <Side>
          <div className="sticky">
            { wording.map((item, i) => 
              <SideItem qty={wording.length} key={i} data-index={i} active={currentIndex === i}>
                <img src={item.cover} alt="" />
                <div className="name">{ item.name }</div>
                <div className="title">{ item.title }</div>
                <span className="slice"></span>
                <p className="content">{ item.content }</p>
              </SideItem>
            ) }
          </div>
        </Side>
      </Wrapper>
    </Root>
  )
}

const Root = styled.div`
  background: linear-gradient(90deg, #F5F1E7 0%, #F5F1E7 50%, #F0EADC 50.1%, #F0EADC 100%);
`

const Wrapper = styled(Container)`
  position: relative;
  display: flex;
  ${respondTo.md} {
    display: block;
  }
`

const Title = styled.div`
  margin-bottom: 50px;
  margin-left: 12px;
  font-size: 32px;
  color: ${colors.green};
  ${respondTo.md} {
    margin-bottom: 80px;
    text-align: center;
    font-size: 24px;
  }
`

const Main = styled.div`
  position: relative;
  padding-top: 180px;
  padding-right: 156px;
  width: 60%;
  box-sizing: border-box;
  background-color: #F5F1E7;
  ${respondTo.md} {
    width: 100%;
    padding-top: 80px;
    padding-right: 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -16px;
    ${respondTo.md} {
      margin: 0;
    }
    > li {
      width: 50%;
      padding: 0 16px;
      box-sizing: border-box;
      ${respondTo.md} {
        width: 100%;
      }
    }
  }
`
const Side = styled.div`
  position: relative;
  width: 40%;
  padding-top: 240px;
  padding-left: 80px;
  box-sizing: border-box;
  background: #F0EADC;
  ${respondTo.md} {
    display: none;
  }
  > .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    min-height: 100vh;
  }
`

const MainItem = styled.div`
  margin-bottom: 40px;
  text-align: center;
  transition: all .3s ease;
  cursor: pointer;
  ${({ active }) => active && css`
  `}
  img {
    display: block;
    margin: 0 auto;
    margin-bottom: 12px;
    width: 200px;
    height: 200px;
  }
  .name {
    margin-bottom: 2px;
    color: ${colors.brown};
    font-size: 16px;
  }
  .title {
    color: ${colors.green};
    font-size: 14px;
    ${respondTo.md} {
      margin-bottom: 18px;
    }
  }
  .content {
    display: none;
    margin: 0 auto;
    padding-top: 20px;
    text-align: center;
    color: ${colors.green};
    white-space: break-spaces;
    width: 230px;
    font-size: 12px;
    line-height: 18px;
    ${respondTo.md} {
      display: block;
      max-height: 0;
      overflow: hidden;
      transition: max-height .3s ease;
      ${({ active }) => active && css`
        border-top: 1px solid ${colors.brown};
        max-height: 100vh;
      `}
    }
  }
`
const SideItem = styled.div`
  position: absolute;
  width: 100%;
  transition: all .3s ease;
  opacity: 0;
  visibility: hidden;
  text-align: center;
  ${({ active }) => active && css`
    opacity: 1;
    visibility: visible;
  `}
  img {
    margin: 0 auto;
    object-fit: cover;
    display: block;
    width: 285px;
    height: auto;
  }
  .name {
    margin-top: 24px;
    margin-bottom: 2px;
    color: ${colors.brown};
    font-size: 32px;
  }
  .title {
    color: ${colors.green};
    font-size: 16px;
  }
  .slice {
    display: block;
    margin: 0 auto;
    margin-top: 36px;
    margin-bottom: 20px;
    width: 90%;
    height: 1px;
    background: ${colors.brown};
  }
  .content {
    text-align: center;
    color: ${colors.green};
    white-space: break-spaces;
    font-size: 16px;
    img {
      display: block;
      margin: auto;
      margin-bottom: 30px;
      box-shadow: 16px 16px 0px ${colors.mainColor};
    }
  }
`


export default TeamSection;