import React from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';
import SocialItem from '../../components/SocialItem';
import useWording from '../../utils/useWording';

const SocialSection = () => {
  const wording = useWording('homepage.social');
  return (
    <Root id="community">
      <Container>
        <SocialBlock>
          <Title>JOIN liondao community</Title>
          <SocialList>
            <div className="icon-bar">
              { wording.map((social, i) =>
                <SocialItem key={i} icon={social.icon} href={social.link} target="_blank" />
                ) }
            </div>
          </SocialList>
        </SocialBlock>
      </Container>
    </Root>
  )
}


const Root = styled.div`
`

const SocialBlock = styled.div`
  border-top: 1px solid ${colors.brown};
  padding: 200px 0;
  box-sizing: border-box;
  ${respondTo.md} {
    margin: 0 60px;
    padding: 140px 0;
    width: calc(100% - 120px);
  }

`

const Title = styled.div`
  margin-bottom: 48px;
  text-align: center;
  font-size: 32px;
  text-transform: uppercase;
  color: ${colors.green};
  ${respondTo.md} {
    margin-bottom: 40px;
    font-size: 24px;
  }
`

const SocialList = styled.div`
  ${respondTo.md} {
    margin-top: 32px;
  }
  > .icon-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    ${respondTo.md} {
      justify-content: center;
    }
  }
  > .copyright {
    color: ${colors.white};
    font-family: "Roboto";
    font-weight: 300;
    letter-spacing: 0.4px;
    font-size: 12px;
  }
  a + a {
    margin-left: 60px;
    ${respondTo.md} {
      margin-left: 30px;
    }
  }
  ${respondTo.md} {
    a {
      width: 30px;
    }
  }
`

export default SocialSection;