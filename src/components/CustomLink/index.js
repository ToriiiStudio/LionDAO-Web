import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomLink = ({ to, children, ...props }) => {
  const { path } = useSelector(state => state.language);

  return (
    <Root to={`${path}${to}`} {...props}>
      { children }
    </Root>
  )
}

const Root = styled(Link)``

export default CustomLink;