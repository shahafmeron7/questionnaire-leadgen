// useImpressions.js
import { useEffect, useRef } from 'react';
import { buildEventData,sendImpressions } from '../utils/impression/impressionUtils';
import Impression from '../utils/impression/impression';
export const useFirstImpression = () => {
    const hasSentImpression = useRef(false);

    useEffect(() => {
        if (!hasSentImpression.current) {
            Impression();
            sendImpressions(
                {},
                process.env.REACT_APP_FIRST_EVENT_NAME,
                process.env.REACT_APP_STREAM_STEP_NAME
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
            process.env.REACT_APP_STEP_EVENT_NAME,
            process.env.REACT_APP_STREAM_STEP_NAME
        );
    }, [currentQuestionCode]);
};

export const useUnloadImpressions = (state) => {
    const  { currentQuestion,flowID,flowName } = state 

    useEffect(() => {
        const handleUnload = (e) => {
            // e.preventDefault();
            sendImpressions(
                buildEventData(currentQuestion,flowID,flowName,process.env.REACT_APP_USER_ACTION_EXIT),
                process.env.REACT_APP_USER_EVENT_NAME,
                process.env.REACT_APP_STREAM_STEP_NAME
            );
        };

        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, []);
};
