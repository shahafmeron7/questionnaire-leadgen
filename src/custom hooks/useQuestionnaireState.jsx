// useQuestionnaireState.js
import { useEffect } from 'react';

export const useQuestionnaireState = (state,dispatch,completeQuestionnaire) => {
     const { currentQuestion, currentQuestionCode } = state;
    useEffect(() => {
        if (currentQuestion?.step > 1) {
            dispatch({ type: "TOGGLE_QUESTIONNAIRE_STARTED", payload: true });
        } else {
            dispatch({ type: "TOGGLE_QUESTIONNAIRE_STARTED", payload: false });
        }
        if (currentQuestionCode === "thank_you") {
            dispatch({ type: "TOGGLE_QUESTIONNAIRE_COMPLETED", payload: true });
            completeQuestionnaire()
        } else {
            dispatch({ type: "TOGGLE_QUESTIONNAIRE_COMPLETED", payload: false });
        }
    }, [currentQuestion, currentQuestionCode, dispatch,completeQuestionnaire]);
};
