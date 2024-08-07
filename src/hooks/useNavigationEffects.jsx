// useNavigationEffects.js
import { useEffect } from 'react';
import { buildEventData,sendImpressions } from '../utils/impression/impressionUtils';
import env from '@/utils/data/env';
import { questionnaireVariation } from '@/utils/data/questionnaire';
export const useNavigationEffects = (state,dispatch,moveToPrevQuestion) => {
    const { questionHistory, currentQuestion,flowID,flowName, currentQuestionCode, questionnaireCompleted } = state;

    
      
     useEffect(() => {
         const handlePopState = (event) => {
             if (questionHistory.length > 1) {
                 if (questionnaireCompleted) {
                     window.location.href = "https://sonary.com/";
                 } else if (currentQuestionCode !== "loader") {
                     sendImpressions(
                         buildEventData(currentQuestion,flowID,flowName,env.USER_ACTION_CLICK_PREV_BROWSER),
                         env.USER_EVENT_NAME,
                         env.STREAM_STEP_NAME,
                         null,
                         questionnaireVariation
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
