import { useState, useEffect } from 'react';

// Custom hook to check if the screen is wider than 767px
const useIsWideScreen = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 767);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isWideScreen;
};

export default useIsWideScreen;
