// src/context/OsanoVisibilityContext.js
import React, { createContext, useState, useEffect,useRef } from 'react';
import { buildEventData,sendImpressions } from '@/utils/impression/impressionUtils';
import { useQuestionnaire } from './QuestionnaireContext';
import env from '@/utils/data/env';

export const OsanoVisibilityContext = createContext({
  osanoShown: false,
  setOsanoShown: () => {}
});

export const OsanoVisibilityProvider = ({ children }) => {
  const [osanoShown, setOsanoShown] = useState(false);
  const  { currentQuestion,flowID,flowName } =useQuestionnaire(); 
  const currentQuestionRef = useRef(currentQuestion);

  useEffect(() => {
   currentQuestionRef.current = currentQuestion;
 }, [currentQuestion]);

 useEffect(() => {
   const checkOsanoExists = setInterval(() => {
     if (window.Osano) {
       setupOsanoListener();
       clearInterval(checkOsanoExists);
     }
   }, 100);

   const setupOsanoListener = () => {
     const osanoListener = (component, stateChange) => {
       if (component === "dialog") {
         setOsanoShown(stateChange === "show");
         if (stateChange === "show") {
           attachButtonListeners();
         }
       }
     };

     const attachButtonListeners = () => {
       const acceptButton = document.querySelector('.osano-cm-accept');
       const denyButton = document.querySelector('.osano-cm-deny');

       const handleAcceptClick = () => {
         sendImpressions(
           buildEventData(currentQuestionRef.current, flowID, flowName, env.USER_ACTION_CLICK_ACCEPT_COOKIES),
           env.USER_EVENT_NAME,
           env.STREAM_STEP_NAME
         );
       };

       const handleDenyClick = () => {
         sendImpressions(
           buildEventData(currentQuestionRef.current, flowID, flowName, env.USER_ACTION_CLICK_DENY_COOKIES),
           env.USER_EVENT_NAME,
           env.STREAM_STEP_NAME
         );
       };

       acceptButton?.addEventListener('click', handleAcceptClick);
       denyButton?.addEventListener('click', handleDenyClick);

       const cleanupListeners = () => {
         acceptButton?.removeEventListener('click', handleAcceptClick);
         denyButton?.removeEventListener('click', handleDenyClick);
       };
       return cleanupListeners;
     };

     Osano("onUiChanged", osanoListener);
     return () => {
       Osano("offUiChanged", osanoListener);
     };
   };
   return () => {
     clearInterval(checkOsanoExists);
   };
 }, [flowID, flowName]);
  return (
    <OsanoVisibilityContext.Provider value={{ osanoShown, setOsanoShown }}>
      {children}
    </OsanoVisibilityContext.Provider>
  );
};

export default OsanoVisibilityContext;
