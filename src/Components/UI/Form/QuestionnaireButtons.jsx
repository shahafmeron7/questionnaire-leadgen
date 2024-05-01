import React, { useEffect } from "react";
import styles from "../../Questionnaire/Questionnaire.module.css";
import { ReactComponent as PrevIcon } from "images/prevbutton.svg";
import { useQuestionnaire } from "context/QuestionnaireContext.jsx";
import useIsWideScreen from "hooks/useIsWideScreen";
import { buildEventData,sendImpressions } from "utils/impression/impressionUtils";
const USER_ACTION_CLICK_PREV = process.env.REACT_APP_USER_ACTION_CLICK_PREV;
const STREAM_STEP_NAME = process.env.REACT_APP_STREAM_STEP_NAME;
const USER_EVENT_NAME = process.env.REACT_APP_USER_EVENT_NAME;

const QuestionnaireButtons = () => {
  const isWideScreen = useIsWideScreen();

  const {
    questionHistory,
    questionnaireStarted,
    currentQuestionCode,
    checkAndEnableNextButton,
    moveToNextQuestion,
    inputModified,
    nextBtnEnabled,
    moveToPrevQuestion,
    responses,
    isAnimatingOut,
    currentQuestion,
    flowID,
    flowName,
  } = useQuestionnaire();
  const isFinalStep = currentQuestionCode === "phone";

  const handleNextButtonClick = () => {
    if(!isAnimatingOut){
      moveToNextQuestion();
    }
  };
    useEffect(() => {
      checkAndEnableNextButton();
    }, [checkAndEnableNextButton,currentQuestion, responses]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Enter" &&
               (inputModified || nextBtnEnabled)
      ) {
        handleNextButtonClick();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleNextButtonClick,
    inputModified,
    nextBtnEnabled,
  ]);
  const handlePrevClick =()=>{
    sendImpressions(buildEventData(currentQuestion,flowID,flowName,USER_ACTION_CLICK_PREV), USER_EVENT_NAME, STREAM_STEP_NAME);
    moveToPrevQuestion();
  }

  const mobileButtonsStyle = {
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#fff",
    padding: "16px",
  };
  return (
    <div
      key={currentQuestionCode}
      className={`animateStaggerItem animateFadeOut ${styles.buttonsWrapper}`}
      style={questionnaireStarted && !isWideScreen ? mobileButtonsStyle : {}}
    >
      {questionHistory.length > 1 && (
        <button className={styles.prevBtn} onClick={handlePrevClick} disabled={isAnimatingOut}>
          <PrevIcon />
        </button>
      )}
      <button
        className={`${styles.nextBtn} ${
          inputModified || nextBtnEnabled ? styles.enabled : ""
        }`}
        onClick={() =>
           handleNextButtonClick()
        }
        disabled={
          isAnimatingOut || !nextBtnEnabled
        }
      >
        {isFinalStep ? "Get Results" : "Next"}
      </button>
    </div>
  );
};

export default QuestionnaireButtons;
