import React, { useEffect, useRef } from 'react';
import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';
import { scrollTo } from '../../utils/scrollTo';

const AutoScrollHelper = () => {
  const location = useLocation();
  const firstScroll = useRef(true);
  
  useEffect(() => {
    if (location.search) handleApplyAutoScroll()
    else firstScroll.current = false;
  }, [location])

  function handleApplyAutoScroll() {
    const { to } = parse(location.search);
    if (to) {
      const element = document.getElementById(to);
      if (element) {
        const sec = firstScroll.current ? 0 : 2;
        scrollTo(sec, element.offsetTop);
        firstScroll.current = false;
      }
    }
  }
  
  return <></>;
};

export default AutoScrollHelper;
