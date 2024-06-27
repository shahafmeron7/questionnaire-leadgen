import React, { useEffect,useState,useContext } from "react";
import styles from "../../Questionnaire/Questionnaire.module.css";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import { buildEventData,sendImpressions } from "@/utils/impression/impressionUtils";
import env from "@/utils/data/env";
import OsanoVisibilityContext from "@/context/OsanoVisibilityContext";


const QuestionnaireButtons = () => {
  const isWideScreen = useIsWideScreen();
  const { osanoShown } = useContext(OsanoVisibilityContext);


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
    sendImpressions(buildEventData(currentQuestion,flowID,flowName,env.USER_ACTION_CLICK_PREV), env.USER_EVENT_NAME, env.STREAM_STEP_NAME);
    moveToPrevQuestion();
  }

  const mobileButtonsStyle = {
    position: "fixed",
    bottom: (osanoShown && questionnaireStarted && !isWideScreen) ? '88px' : '0px',
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
        <img src="https://assets.sonary.com/wp-content/uploads/2024/05/05094124/prevbutton.svg" alt="prev button icon" />

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
