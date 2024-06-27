import React, { useEffect,useContext, useState } from 'react';
import style from './ScrollToTopButton.module.css'; 
import arrowTop from '@/images/chevronTop.svg?url'
import OsanoVisibilityContext from '@/context/OsanoVisibilityContext';
import useIsWideScreen from '@/hooks/useIsWideScreen'
import { sendImpressions,buildEventData } from '@/utils/impression/impressionUtils';
import {useQuestionnaire} from '@/context/QuestionnaireContext.jsx';
import env from '@/utils/data/env';
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {currentQuestion,flowID,flowName} = useQuestionnaire();

  const {osanoShown} = useContext(OsanoVisibilityContext)
  const isWideScreen = useIsWideScreen();

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight * 0.2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    sendImpressions(buildEventData(currentQuestion,flowID,flowName,env.USER_ACTION_CLICK_SCROLL_BTN), env.USER_EVENT_NAME, env.STREAM_STEP_NAME);

  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const OsanoAndMobileStyle={
   bottom:"95px"
  }
  const OsanoAndDesktopStyle={
   bottom:"70px"
  }
  return (
    isVisible && (
      <button className={style.scrollToTop} onClick={scrollToTop} style={osanoShown ? isWideScreen ? OsanoAndDesktopStyle : OsanoAndMobileStyle : {} } >
       <img src={arrowTop} width="28" height="28"/>
      </button>
    )
  );
};

export default ScrollToTopButton;
