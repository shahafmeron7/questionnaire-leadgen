import React, { useReducer, useMemo } from "react";
import QuestionnaireContext from "./QuestionnaireContext";
import { initialState, reducer } from "../../reducers/questionnaireReducer";
import { useNavigationHandlers } from "./eventHandlers";
import questionnaireData from "../../utils/data/questionnaireData.json";
import { useFirstImpression,useQuestionImpressions,useUnloadImpressions } from "../../custom hooks/useImpressions";
import { useQuestionnaireState } from "../../custom hooks/useQuestionnaireState";
import { useNavigationEffects } from "../../custom hooks/useNavigationEffects";


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
  } = useNavigationHandlers(state,dispatch);

  // Custom hooks that manage side effects related to state changes
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
