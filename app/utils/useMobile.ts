import { useState, useEffect } from 'react';

const useMobile = (breakpoint: number) => {
  const [mobile, setMobile] = useState(window.innerWidth < breakpoint);

  function detectMobile() {
    if (window.innerWidth < breakpoint) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', detectMobile);
    return () => {
      window.removeEventListener('resize', detectMobile);
    };
  }, []);

  return {
    mobile
  };
};

export default useMobile;
