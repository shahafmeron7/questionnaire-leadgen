import questionnaireData from "../utils/data/questionnaireData.json";
export const initialState = () => {
  const initialQuestionCode = questionnaireData.questions[0]?.code;
  const currentQuestion = questionnaireData.questions.find(
    (q) => q.code === initialQuestionCode
  );
  const flowID = questionnaireData.flow_id;
  const flowName = questionnaireData.flow_name;

  return {
    currentQuestion: currentQuestion || {}, // Fallback to an empty object if no question matches
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
    // isNextButtonFunctionallyDisabled: false,
    flowID,
    flowName,
  };
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_QUESTION_CODE":
      const newQuestion = questionnaireData.questions.find(
        (q) => q.code === action.payload
      );
      return {
        ...state,
        currentQuestionCode: action.payload,
        currentQuestion: newQuestion || {},
      };
    case "APPEND_TO_QUESTION_HISTORY":
      return {
        ...state,
        questionHistory: [...state.questionHistory, action.payload],
      };

    case "SET_QUESTION_HISTORY":
      return {
        ...state,
        questionHistory: action.payload,
      };
    case "SET_PROGRESS_BAR_WIDTH":
      return { ...state, progressBarWidth: action.payload };
    case "SET_IS_ANIMATING_OUT":
      return {
        ...state,
        isAnimatingOut: action.payload,
      };
    case "UPDATE_RESPONSES":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.questionCode]: action.response,
        },
      };

    case "SET_ERR_RESPONSES":
      return {
        ...state,
        errResponses: action.payload,
      };

    case "CHANGE_NEXT_BTN_STATE":
      return {
        ...state,
        nextBtnEnabled: action.isEnabled,
      };
    case "TOGGLE_QUESTIONNAIRE_STARTED":
      return { ...state, questionnaireStarted: action.payload };

    case "TOGGLE_QUESTIONNAIRE_COMPLETED":
      return { ...state, questionnaireCompleted: action.payload };

    case "SET_TARGET_FORM_ID":
      return { ...state, targetFormID: action.payload };

    case "SET_INPUT_MODIFIED":
      return { ...state, inputModified: action.payload };

    // case "TOGGLE_NEXT_BUTTON_FUNCTIONALITY":
    //   return { ...state, isNextButtonFunctionallyDisabled: action.payload };

    default:
      return state;
  }
}
