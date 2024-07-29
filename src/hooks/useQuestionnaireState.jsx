// useQuestionnaireState.js
import * as actionTypes from '@/reducers/actionTypes'
import { useEffect } from 'react';

export const useQuestionnaireState = (state,dispatch,completeQuestionnaire) => {
     const { currentQuestion, currentQuestionCode ,formBrand,questionnaireStarted} = state;
    useEffect(() => {
        if (currentQuestion?.step > 1) {
            if(questionnaireStarted===false){
                dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_STARTED, payload: true });
            }
            
        } else {
            if(formBrand){

                dispatch({ type: actionTypes.SET_FORM_BRAND, payload:undefined  });
            }
            dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_STARTED, payload: false });
        }
        if (currentQuestionCode === "thank_you") {
            dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_COMPLETED, payload: true });
            completeQuestionnaire()
        } 
        // else {
        //     console.log('test');
        //     dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_COMPLETED, payload: false });
        // }
    }, [currentQuestion, currentQuestionCode, dispatch]);
};
