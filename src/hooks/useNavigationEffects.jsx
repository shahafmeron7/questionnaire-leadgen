// useNavigationEffects.js
import { useEffect } from 'react';
import { buildEventData,sendImpressions } from '../utils/impression/impressionUtils';
import { useQuestionnaire } from '../context/QuestionnaireContext';

export const useNavigationEffects = (state,dispatch,moveToPrevQuestion) => {
    const { questionHistory, currentQuestion,flowID,flowName, currentQuestionCode, questionnaireCompleted } = state;
    // useEffect(() => {
    //     // This ensures the URL and history state are correctly set for the first question when the component mounts
    //     const currentQuestionCode = questionHistory[0]; // assuming the first element is the initial question
      
    //     if (window.history.state === null || window.history.state.questionCode !== currentQuestionCode) {
    //       window.history.replaceState({ questionCode: currentQuestionCode }, "", `?question=${currentQuestionCode}`);
    //     }
    //   }, []); 
    
      
     useEffect(() => {
         const handlePopState = (event) => {
             if (questionHistory.length > 1) {
                 if (questionnaireCompleted) {
                     window.location.href = "https://sonary.com/";
                 } else if (currentQuestionCode !== "loader") {
                     sendImpressions(
                         buildEventData(currentQuestion,flowID,flowName,process.env.REACT_APP_USER_ACTION_CLICK_PREV_BROWSER),
                         process.env.REACT_APP_USER_EVENT_NAME,
                         process.env.REACT_APP_STREAM_STEP_NAME
                     );
                     moveToPrevQuestion();
                 }
             } else {
                 window.history.go(-1);
             }
         };

         window.addEventListener("popstate", handlePopState);
         return () => window.removeEventListener("popstate", handlePopState);
     }, [questionHistory, currentQuestionCode, questionnaireCompleted, moveToPrevQuestion, sendImpressions, buildEventData]);
};
