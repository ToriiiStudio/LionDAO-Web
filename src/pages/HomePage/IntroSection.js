import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import Carousel from '../../components/Carousel';
import useWording from '../../utils/useWording';
import { respondTo } from '../../utils/responsive';

const IntroSection = () => {
  const wording = useWording('homepage.intro');
  return (
    <Root>
      <Carousel>
        { wording?.map((item, i) => 
          <Item key={i}>
            <div className="content">
              <img src={item.icon} alt="" />
              <p inner>{item.content}</p>
            </div>
          </Item>
        )}
      </Carousel>
    </Root>
  )
}

const Root = styled.div`
  padding-bottom: 48px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  ${respondTo.md} {
    height: 60vh;
  }
  .content {
    width: 550px;
    max-width: 100%;
    text-align: center;
    color: ${colors.green};
    white-space: break-spaces;
    ${respondTo.md} {
      width: 225px;
      font-size: 12px;
    }
    img {
      display: block;
      margin: auto;
      margin-bottom: 30px;
      width: 160px;
      height: auto;
      ${respondTo.md} {
        width: 115px;
        margin-bottom: 20px;
      }
    }
  }
`

export default IntroSection;