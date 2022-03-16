import { useEffect } from 'react';

const useIntersectionObserver = (
  ref,
  callback,
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  }
) => {

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (Array.isArray(ref)) {
      ref.forEach(item => observer.observe(item.current))
    }
    else {
      observer.observe(ref.current);
    }

    return () => {
      // Is observer really clear?
      if (ref.current) {
        if (Array.isArray(ref)) {
          ref.forEach(item => observer.unobserve(item.current))
        }
        else {
          observer.unobserve(ref.current)
        }
      };
    };

  }, []);
}

export default useIntersectionObserver;
