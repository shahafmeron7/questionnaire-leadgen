import React, { useContext } from "react";
import styles from "@/components/Questionnaire/Questionnaire.module.css";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import { buildEventData,sendImpressions } from "@/utils/impression/impressionUtils";
import env from "@/utils/data/env";
import OsanoVisibilityContext from "@/context/OsanoVisibilityContext";
import NextButton from "./NextButton";
import { questionnaireVariation } from "@/utils/data/questionnaire";


const QuestionnaireButtons = () => {
  const {isWideScreen} = useIsWideScreen();
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

 
  const handlePrevClick =()=>{
    sendImpressions(buildEventData(currentQuestion,flowID,flowName,env.USER_ACTION_CLICK_PREV), env.USER_EVENT_NAME, env.STREAM_STEP_NAME,null,questionnaireVariation);
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
      <NextButton/>
      {/* <button
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
      </button> */}
    </div>
  );
};

export default QuestionnaireButtons;
