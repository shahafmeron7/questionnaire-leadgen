// src/context/questionnaire/eventHandlers.js
import * as actionTypes from  'reducers/actionTypes';
import { useCallback } from "react";
import { validateField } from "utils/validationUtils";
import { gsap } from "gsap";
import questionnaireData from "utils/data/questionnaireData.json";
import {
  buildEventData,
  sendImpressions,
} from "utils/impression/impressionUtils";
const TIME_DELAY_NEXT_QUESTION = 0.2;

export const QuestionnaireHandlers = (state, dispatch,goToNext,goToPrevious) => {
  const findStepNumber = (questionCode) => {
    return questionnaireData.questions.find((q) => q.code === questionCode)
      .step;
  };
  const animateAndNavigate = (onComplete, nextProgressWidth, delay = 0) => {
    dispatch({ type: actionTypes.SET_IS_ANIMATING_OUT, payload: true });
    const tl = gsap.timeline({
      onComplete: () => {
        dispatch({ type: actionTypes.SET_IS_ANIMATING_OUT, payload: false });
        onComplete();
      },
    });

    tl.to(".progressLine", {
      width: `${nextProgressWidth}%`,
      duration: 0.3,
      ease: "none",
    });

    tl.to(
      ".animateFadeOut",
      {
        opacity: 0,
        delay: delay,
        duration: 0.1,
      },
      `+=0.1`
    );
  };
  const moveToPrevQuestion = () => {
    const { questionHistory } = state;
    if (questionHistory.length > 1) {
      const newHistory = questionHistory.slice(0, -1);
      const prevQuestionCode = newHistory[newHistory.length - 1];
      const prevStep = findStepNumber(prevQuestionCode);
      const newProgressBarWidth = Math.min(
        100,
        Math.round(((prevStep - 1) / (4 - 1)) * 100)
      );

      dispatch({
        type: actionTypes.SET_PROGRESS_BAR_WIDTH,
        payload: newProgressBarWidth,
      });
      animateAndNavigate(() => {
         dispatch({
           type: actionTypes.SET_CURRENT_QUESTION_CODE,
           payload: prevQuestionCode,
         });
        // goToPrevious(prevQuestionCode,newHistory);  // Now purely handles the state and history update

      }, newProgressBarWidth);
      
      dispatch({ type: actionTypes.SET_QUESTION_HISTORY, payload: newHistory });
    }
  };

  const moveToNextQuestion = () => {
    let proceedToNext = true;
    let nextQuestionCode;

    const {
      currentQuestion,
      currentQuestionCode,
      responses,
      flowID,
      flowName,
    } = state;
    const newErrResponses = {};
    if (
      currentQuestion.type === "details-question" ||
      currentQuestion.type === "form-type"
    ) {

      currentQuestion.subquestions.forEach((sub) => {
        if (!validateField(sub.code, responses[sub.code]?.answer)) {
          proceedToNext = false;
          newErrResponses[sub.code] = true; // Set error for this sub-question
        }
      });
      nextQuestionCode = currentQuestion.answers[0]?.next_question_code;
    } else if (currentQuestion.type === "one-selection") {
      const response = responses[currentQuestion.code];
      if (response && response.answerIndexes) {
        const selectedIndex = response.answerIndexes[0];
        checkAndUpdateFormID(currentQuestionCode, selectedIndex);

        nextQuestionCode =
          currentQuestion.answers[selectedIndex]?.next_question_code;
      } else {
        proceedToNext = false;
      }
    } else if (currentQuestion.type === "multi-selection") {
      const response = responses[currentQuestion.code];
      if (
        response &&
        response.answerIndexes &&
        response.answerIndexes.length > 0
      ) {
        nextQuestionCode =
          currentQuestion.answers[response.answerIndexes[0]]
            ?.next_question_code;
      } else {
        proceedToNext = false;
      }
    }

    if (proceedToNext && nextQuestionCode) {
      const eventData = buildEventData(
        currentQuestion,
        flowID,
        flowName,
        process.env.REACT_APP_USER_ACTION_CLICK_NEXT
      );
      sendImpressions(
        eventData,
        process.env.REACT_APP_USER_EVENT_NAME,
        process.env.REACT_APP_STREAM_STEP_NAME
      );
      dispatch({ type: actionTypes.CHANGE_NEXT_BTN_STATE, isEnabled: true });

      const nextStep = findStepNumber(nextQuestionCode);
      const newProgressBarWidth = Math.min(
        100,
        Math.round(((nextStep - 1) / (4 - 1)) * 100)
      );
      dispatch({
        type: actionTypes.SET_PROGRESS_BAR_WIDTH,
        payload: newProgressBarWidth,
      });

      animateAndNavigate(
        () => {
          // goToNext(nextQuestionCode)
           handleNavigateNextQuestion(nextQuestionCode);
        },
        newProgressBarWidth,
        TIME_DELAY_NEXT_QUESTION
      );
    } else {
      dispatch({ type: actionTypes.CHANGE_NEXT_BTN_STATE, isEnabled: false });
      dispatch({
        type: actionTypes.SET_ERR_RESPONSES,
        payload: newErrResponses,
      });
    }
  };

  const handleNavigateNextQuestion = (nextQuestionCode) => {
    if (nextQuestionCode !== "loader") {
      dispatch({ type: actionTypes.APPEND_TO_QUESTION_HISTORY, payload: nextQuestionCode });
    }
    dispatch({ type: actionTypes.SET_CURRENT_QUESTION_CODE, payload: nextQuestionCode });
    window.history.pushState({}, null, " ");
  };

  const handleMultipleAnswerSelection = (questionCode, selectedIndexes) => {
    const { currentQuestion } = state;
    const answersData = selectedIndexes.map((index) => {
      return {
        text: currentQuestion.answers[index].text,
        index: index,
      };
    });

    const response = {
      answer: answersData.map((answer) => answer.text).join(", "),
      answerIndexes: selectedIndexes,
      step: currentQuestion.step,
      question: currentQuestion.text,
    };

    dispatch({
      type: actionTypes.UPDATE_RESPONSES,
      questionCode: questionCode,
      response: response,
    });
  };
  const checkAndEnableNextButton = useCallback(() => {
    const { currentQuestion, responses } = state;
    if (
      currentQuestion.type === "details-question" ||
      currentQuestion.type === "form-type"
    ) {
      // Check if all subquestions have been answered
      const allSubquestionsAnswered = currentQuestion.subquestions.every(
        (sub) => {
          const response = responses[sub.code];
          return response && response.answer && response.answer.trim() !== "";
        }
      );
      dispatch({
        type: actionTypes.CHANGE_NEXT_BTN_STATE,
        isEnabled: allSubquestionsAnswered,
      });
    } else {
      const response = responses[currentQuestion.code];
      let isAnswered = false;

      if (response) {
        // Separate logic for one-selection, which may include an 'other' text input
        if (currentQuestion.type === "one-selection") {
          if (response.answerIndexes.length > 0) {
            const answerIndex = response.answerIndexes[0]; // Since one-selection should have only one index
            if (currentQuestion.answers[answerIndex].isOther) {
              // Check if other text is not empty when 'Other' option is selected
              isAnswered = response.other_text !== undefined && response.other_text !== null && response.other_text.trim() !== "";
            } else {
              // Regular answer is selected

              isAnswered = true;
            }
          }
        } else if (currentQuestion.type === "multi-selection") {
          isAnswered = response.answerIndexes.length > 0;
        }
      }
      dispatch({
        type: actionTypes.CHANGE_NEXT_BTN_STATE,
        isEnabled: isAnswered,
      });
    }
  }, [state.currentQuestion, state.responses, dispatch]);

  const handleAnswerSelection = (questionCode, answerIndex) => {
    const { currentQuestion, responses } = state;
    const answer = currentQuestion.answers[answerIndex];
    const answerText = answer?.text;
    const existingResponse = responses[questionCode] || {};
    checkAndUpdateFormID(questionCode, answerIndex);

    const newResponse = {
      ...existingResponse,
      answer: answerText,
      answerIndexes: [answerIndex],
      step: currentQuestion.step,
      question: currentQuestion.text,
    };

    if (answer?.isOther) {
      newResponse.other_text = existingResponse.other_text || "";
    } else {
      if (newResponse.other_text) {
        delete newResponse.other_text;
      }
    }

    dispatch({
      type: actionTypes.UPDATE_RESPONSES,
      questionCode: questionCode,
      response: newResponse,
    });
    const nextQuestionCode = answer?.next_question_code;
    if (nextQuestionCode) {
      const nextStep = findStepNumber(nextQuestionCode);
      const newProgressBarWidth = Math.min(
        100,
        Math.round(((nextStep - 1) / (4 - 1)) * 100)
      );
      dispatch({
        type: actionTypes.SET_PROGRESS_BAR_WIDTH,
        payload: newProgressBarWidth,
      });

      animateAndNavigate(
        () => {
        //goToNext(nextQuestionCode)
           handleNavigateNextQuestion(nextQuestionCode);
        },
        newProgressBarWidth,
        TIME_DELAY_NEXT_QUESTION
      );
    }
  };
  const handleInputChange = (questionCode, inputValue, isOther = false) => {
    const { currentQuestion, responses,errResponses } = state;
    const currentResponse = responses[questionCode] || {
      step: currentQuestion.step,
      question:
        currentQuestion.type === "details-question" ||
        currentQuestion.type === "form-type"
          ? currentQuestion.subquestions.find(
              (sub) => sub.code === questionCode
            ).text
          : currentQuestion.text,
      answerIndexes: [],
    };

    let updatedResponse;

    if (!isOther) {
      updatedResponse = {
        ...currentResponse,
        answer: inputValue,
      };
    } else {
      const otherIndex = currentQuestion.answers.findIndex(
        (answer) => answer.isOther
      );
      const otherAnswerText = currentQuestion.answers[otherIndex].text;
      updatedResponse = {
        ...currentResponse,
        answer: otherAnswerText,
        other_text: inputValue,
        answerIndexes: [otherIndex],
      };
    }
    dispatch({
      type: actionTypes.UPDATE_RESPONSES,
      questionCode: questionCode,
      response: updatedResponse,
    });
    dispatch({
      type: actionTypes.CHANGE_NEXT_BTN_STATE,
      isEnabled: inputValue.trim().length > 0,
    });
     // Check if there's an existing error and clear it
     if (errResponses[questionCode]) {
      const newErrResponses = { ...errResponses };

      delete newErrResponses[questionCode];  // Remove the error entry for this question

      dispatch({
          type: actionTypes.SET_ERR_RESPONSES,
          payload: newErrResponses,
      });
  }

  };
  const completeQuestionnaire = useCallback(() => {
    const { targetFormID, responses } = state;
    let finalResponses = {};
    Object.keys(responses).forEach(key => {
      responses[key].users_answer = responses[key].answer;
  });
    if (targetFormID === process.env.REACT_APP_PAYSAFE_FORM_ID) {
      const paysafe_monthly_volume = ["1-999", "1000-9999", "10000", "0"];
      const monthly_volume = responses.monthly_volume;
      monthly_volume.answer =
        paysafe_monthly_volume[monthly_volume.answerIndexes[0]];
    }
    finalResponses = Object.keys(responses).reduce((acc, key) => {
      const { answerIndexes, ...responseWithoutIndexes } = responses[key];
      acc[key] = responseWithoutIndexes;
      return acc;
    }, {});
   console.log(finalResponses)
    sendImpressions(
      finalResponses,
      process.env.REACT_APP_FINAL_SUBMIT_EVENT_NAME,
      process.env.REACT_APP_STREAM_FINAL_NAME,
      targetFormID
    );
    dispatch({ type: actionTypes.TOGGLE_QUESTIONNAIRE_COMPLETED, payload: true });
  },[state.targetFormID,state.responses]);

  const changeNextBtnState = (isEnabled) => {
    dispatch({ type: actionTypes.CHANGE_NEXT_BTN_STATE, isEnabled: isEnabled });
  };

  
  const checkAndUpdateFormID = (questionCode, answerIndex) => {
    // if (questionCode === "industry_type") {
    //   let formID =
    //     answerIndex === 2
    //       ? process.env.REACT_APP_STAX_FORM_ID
    //       : Math.random() < 0.9
    //       ? process.env.REACT_APP_PAYSAFE_FORM_ID
    //       : process.env.REACT_APP_STAX_FORM_ID;
    //   dispatch({ type: "SET_TARGET_FORM_ID", payload: formID });
    // }
    if (questionCode === "industry_type") {
      let min=1;
      let max=10;
      let probability = Math.floor(Math.random() * (max - min + 1)) + min;  
      let formID =
        answerIndex === 2
          ? process.env.REACT_APP_STAX_FORM_ID
          : probability <= 8
        ? process.env.REACT_APP_STAX_FORM_ID
          : process.env.REACT_APP_STAX_FORM_ID
      dispatch({ type: actionTypes.SET_TARGET_FORM_ID, payload: formID });
    }
  };

  return {
    animateAndNavigate,
    moveToPrevQuestion,
    checkAndEnableNextButton,
    moveToNextQuestion,
    handleNavigateNextQuestion,
    handleMultipleAnswerSelection,
    handleAnswerSelection,
    handleInputChange,
    completeQuestionnaire,
    changeNextBtnState,
    checkAndUpdateFormID,
  };
};
