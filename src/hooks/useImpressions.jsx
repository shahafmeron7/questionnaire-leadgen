// useImpressions.js
import { useEffect, useRef } from 'react';
import { buildEventData,sendImpressions } from '@/utils/impression/impressionUtils';
import Impression from '@/utils/impression/impression';
import env from '@/utils/data/env';
import { questionnaireVariation } from '@/utils/data/questionnaire';
export const useFirstImpression = () => {
    const hasSentImpression = useRef(false);
    
    useEffect(() => {
        if (!hasSentImpression.current) {
            Impression(questionnaireVariation);
            sendImpressions(
                {},
                env.FIRST_EVENT_NAME,
                env.STREAM_STEP_NAME,
                null,
                questionnaireVariation
            );
            hasSentImpression.current = true;
        }
    }, []);
};

export const useQuestionImpressions = (state) => {
    const  { currentQuestionCode,currentQuestion,flowID,flowName } =state 
    useEffect(() => {
        sendImpressions(
            buildEventData(currentQuestion,flowID,flowName),
            env.STEP_EVENT_NAME,
            env.STREAM_STEP_NAME ,
            null,
            questionnaireVariation
        );
    }, [currentQuestionCode]);
};

export const useUnloadImpressions = (state) => {
    const  { currentQuestion,flowID,flowName } = state 

    useEffect(() => {
        const handleUnload = (e) => {
            // e.preventDefault();
            sendImpressions(
                buildEventData(currentQuestion,flowID,flowName,env.USER_ACTION_EXIT),
                env.USER_EVENT_NAME,
                env.STREAM_STEP_NAME,
                null,
                questionnaireVariation
            );
        };

        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, []);
};
