import React, { useReducer, useMemo } from "react";
import QuestionnaireContext from "./QuestionnaireContext";
import { initialState, reducer } from "reducers/questionnaireReducer";
import { QuestionnaireHandlers } from "./handlers/QuestionnaireHandlers"
import { useFirstImpression,useQuestionImpressions,useUnloadImpressions } from "hooks/useImpressions";
import { useQuestionnaireState } from "hooks/useQuestionnaireState";
import { useNavigationEffects } from "hooks/useNavigationEffects";
import {useHistoryStack} from 'hooks/useHistoryStack'

export const QuestionnaireProvider = ({ children }) => {

  const initial = initialState();
  const [state, dispatch] = useReducer(reducer, initial);

  // const { goToNext, goToPrevious } = useHistoryStack(dispatch, state.currentQuestionCode, state);

   const {
     animateAndNavigate,
     moveToPrevQuestion,
     moveToNextQuestion,
     handleNavigateNextQuestion,
     handleMultipleAnswerSelection,
     handleAnswerSelection,
     handleInputChange,
     completeQuestionnaire,
     changeNextBtnState,
     checkAndUpdateFormID,
     checkAndEnableNextButton
   } = QuestionnaireHandlers(state,dispatch);
  // const handlers = QuestionnaireHandlers(state, dispatch, goToNext, goToPrevious);
   const handlers = QuestionnaireHandlers(state, dispatch);


  useQuestionnaireState(state,dispatch,handlers.completeQuestionnaire);
  useFirstImpression();
  useQuestionImpressions(state);
  useUnloadImpressions();
  useNavigationEffects(state,dispatch,handlers.moveToPrevQuestion);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
      ...handlers,

      // animateAndNavigate,
      // moveToPrevQuestion,
      // moveToNextQuestion,
      // handleNavigateNextQuestion,
      // handleMultipleAnswerSelection,
      // handleAnswerSelection,
      // handleInputChange,
      // completeQuestionnaire,
      // changeNextBtnState,
      // checkAndUpdateFormID,
      // checkAndEnableNextButton,
      
    }),
    [state, dispatch]
  );

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
