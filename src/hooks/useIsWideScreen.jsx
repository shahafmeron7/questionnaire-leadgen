import { useState, useEffect } from 'react';

const useIsWideScreen = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 767);
  const [isTabletScreen,setIsTabletScreen] = useState(window.innerWidth > 992);
  const [isDesktopScreen,setIsDesktopScreen] =useState(window.innerWidth > 1200);
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 767);
      setIsTabletScreen(window.innerWidth > 992);
      setIsDesktopScreen(window.innerWidth > 1200);

    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {isWideScreen,isTabletScreen,isDesktopScreen};
};

export default useIsWideScreen;
