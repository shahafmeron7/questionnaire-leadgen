import React, { useEffect, useState } from "react";
import styles from "../Questionnaire/Questionnaire.module.css";
import { ReactComponent as PrevIcon } from "../../images/prevbutton.svg";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import useIsWideScreen from "../../custom hooks/useIsWideScreen";
import { sendImpressions } from "../../utils/helperFunctions";
const USER_ACTION_CLICK_PREV = process.env.REACT_APP_USER_ACTION_CLICK_PREV;
const STREAM_STEP_NAME = process.env.REACT_APP_STREAM_STEP_NAME;
const USER_EVENT_NAME = process.env.REACT_APP_USER_EVENT_NAME;

const QuestionnaireButtons = React.forwardRef((props, ref) => {
  const isWideScreen = useIsWideScreen();
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);

  const {
    questionHistory,
    questionnaireStarted,
    isFinalStep,
    currentQuestionCode,
    checkAndEnableNextButton,
    moveToNextQuestion,
    isNextButtonFunctionallyDisabled,
    inputModified,
    nextBtnEnabled,
    moveToPrevQuestion,
    responses,
    buildEventData,
    currentQuestion,
  } = useQuestionnaire();
  const handleNextButtonClick = () => {
    setIsNextButtonClicked(true);
  };

  useEffect(() => {
    let timerId;
    if (isNextButtonClicked) {
      timerId = setTimeout(() => {
        moveToNextQuestion();

        setIsNextButtonClicked(false);
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [isNextButtonClicked, moveToNextQuestion]);

  useEffect(() => {
    checkAndEnableNextButton();
  }, [currentQuestion, responses]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Enter" &&
        !isNextButtonFunctionallyDisabled &&
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
    isNextButtonFunctionallyDisabled,
    inputModified,
    nextBtnEnabled,
  ]);
  const handlePrevClick =()=>{
    sendImpressions(buildEventData(USER_ACTION_CLICK_PREV), USER_EVENT_NAME, STREAM_STEP_NAME);
    moveToPrevQuestion();
  }

  const mobileButtonsStyle = {
    position: "absolute",
    bottom: "0",
    width: "100%",
    backgroundColor: "#fff",
    padding: "16px",
  };
  return (
    <div
      key={currentQuestionCode}
      ref={ref}
      className={styles.buttonsWrapper}
      style={questionnaireStarted && !isWideScreen ? mobileButtonsStyle : {}}
    >
      {questionHistory.length > 1 && (
        <button className={styles.prevBtn} onClick={handlePrevClick}>
          <PrevIcon />
        </button>
      )}
      <button
        className={`${styles.nextBtn} ${
          inputModified || nextBtnEnabled ? styles.enabled : ""
        }`}
        onClick={() =>
          !isNextButtonFunctionallyDisabled && handleNextButtonClick()
        }
        disabled={
          !inputModified && !nextBtnEnabled && !isNextButtonFunctionallyDisabled
        }
      >
        {isFinalStep ? "Get Results" : "Next"}
      </button>
    </div>
  );
});

export default QuestionnaireButtons;
