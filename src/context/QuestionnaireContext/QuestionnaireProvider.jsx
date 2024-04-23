import React, { useReducer, useMemo } from "react";
import QuestionnaireContext from "./QuestionnaireContext";
import { initialState, reducer } from "../../reducers/questionnaireReducer";
import { QuestionnaireHandlers } from "./handlers/QuestionnaireHandlers";
import { useFirstImpression,useQuestionImpressions,useUnloadImpressions } from "../../hooks/useImpressions";
import { useQuestionnaireState } from "../../hooks/useQuestionnaireState";
import { useNavigationEffects } from "../../hooks/useNavigationEffects";


export const QuestionnaireProvider = ({ children }) => {

  const initial = initialState();
  const [state, dispatch] = useReducer(reducer, initial);
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

  useQuestionnaireState(state,dispatch,completeQuestionnaire);
  useFirstImpression();
  useQuestionImpressions(state);
  useUnloadImpressions();
  useNavigationEffects(state,moveToPrevQuestion);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
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
      checkAndEnableNextButton,
      
    }),
    [state, dispatch]
  );

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
