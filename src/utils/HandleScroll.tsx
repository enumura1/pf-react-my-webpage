import { MutableRefObject } from 'react';

const handleScroll = (scrollPercentRef: MutableRefObject<number>) => {
    return () => {
      scrollPercentRef.current =
        (document.documentElement.scrollTop /
          (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
        100;
        console.log(scrollPercentRef.current)
    };
  };
  
  export default handleScroll;