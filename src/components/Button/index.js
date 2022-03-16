import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 4px;
  padding: 8px 40px;
  background: ${colors.brandYellow};
  color: ${colors.black};
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 1px;
  transition: all .3s ease;
  &:hover {
    background: ${colors.white};
    color: ${colors.black};
  }
  ${({ theme }) => theme === 'dark' && css`
    background: ${colors.black};
    color: ${colors.brandYellow};
  `}
  ${respondTo.md} {
    border-radius: 4px;
    padding: 15px 16px;
    font-size: 12px;
    svg {
      width: 18px;
    }
  }
`

export default Button;