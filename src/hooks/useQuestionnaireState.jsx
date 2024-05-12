// useQuestionnaireState.js
import * as actionTypes from '@/reducers/actionTypes'
import { useEffect } from 'react';

export const useQuestionnaireState = (state,dispatch,completeQuestionnaire) => {
     const { currentQuestion, currentQuestionCode } = state;
    useEffect(() => {
        if (currentQuestion?.step > 1) {
            dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_STARTED, payload: true });
        } else {
            dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_STARTED, payload: false });
        }
        if (currentQuestionCode === "thank_you") {
            dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_COMPLETED, payload: true });
            completeQuestionnaire()
        } else {
            dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_COMPLETED, payload: false });
        }
    }, [currentQuestion, currentQuestionCode, dispatch,completeQuestionnaire]);
};
