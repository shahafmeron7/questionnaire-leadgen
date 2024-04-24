import * as actionTypes from './actionTypes'
import questionnaireData from "../utils/data/questionnaireData.json";
export const initialState = () => {
  const initialQuestionCode = questionnaireData.questions[0]?.code;
  const currentQuestion = questionnaireData.questions.find(
    (q) => q.code === initialQuestionCode
  );
  const flowID = questionnaireData.flow_id;
  const flowName = questionnaireData.flow_name;

  return {
    currentQuestion: currentQuestion || {}, 
    currentQuestionCode: initialQuestionCode,
    questionHistory: [initialQuestionCode],
    isAnimatingOut: false,
    responses: {},
    errResponses: {},
    questionnaireStarted: false,
    questionnaireCompleted: false,
    targetFormID: undefined,
    inputModified: false,
    nextBtnEnabled: false,
    progressBarWidth: 0,
    flowID,
    flowName,
  };
};

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_QUESTION_CODE:
      const newQuestion = questionnaireData.questions.find(
        (q) => q.code === action.payload
      );
      return {
        ...state,
        currentQuestionCode: action.payload,
        currentQuestion: newQuestion || {},
      };
    case actionTypes.APPEND_TO_QUESTION_HISTORY:
      return {
        ...state,
        questionHistory: [...state.questionHistory, action.payload],
      };

    case actionTypes.SET_QUESTION_HISTORY:
      return {
        ...state,
        questionHistory: action.payload,
      };
    case actionTypes.SET_PROGRESS_BAR_WIDTH:
      return { ...state, progressBarWidth: action.payload };
    case actionTypes.SET_IS_ANIMATING_OUT:
      return {
        ...state,
        isAnimatingOut: action.payload,
      };
    case actionTypes.UPDATE_RESPONSES:
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.questionCode]: action.response,
        },
      };

    case actionTypes.SET_ERR_RESPONSES:
      return {
        ...state,
        errResponses: action.payload,
      };

    case actionTypes.CHANGE_NEXT_BTN_STATE:
      return {
        ...state,
        nextBtnEnabled: action.isEnabled,
      };
    case actionTypes.TOGGLE_QUESTIONNAIRE_STARTED:
      return { ...state, questionnaireStarted: action.payload };

    case actionTypes.TOGGLE_QUESTIONNAIRE_COMPLETED:
      return { ...state, questionnaireCompleted: action.payload };

    case actionTypes.SET_TARGET_FORM_ID:
      return { ...state, targetFormID: action.payload };

    case actionTypes.SET_INPUT_MODIFIED:
      return { ...state, inputModified: action.payload };

    default:
      return state;
  }
}