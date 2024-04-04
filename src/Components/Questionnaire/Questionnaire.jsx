import React from "react";
import QuestionnaireLayout from "../../containers/QuestionnaireLayout.jsx";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import ProgressBar from "../UI/ProgressBar";
import AnswersContent from "./types/AnswersContent.jsx";
import prevIcon from "../../images/prevbutton.svg";
import styles from "./Questionnaire.module.css";
import QuestionnaireWrapper from "../../containers/QuestionnaireWrapper.jsx";
const Questionnaire = () => {
  const {
    currentQuestion,
    totalQuestions,
    currentQuestionIndex,
    moveToPrevQuestion,
    moveToNextQuestion,
    questionHistory,

    inputModified,
    nextBtnEnabled
  } = useQuestionnaire();

  const progressBarWidth = Math.round(
    (currentQuestionIndex / (totalQuestions - 1)) * 100
  );

  const QuestionnaireTitle = () => {
    return (
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Find your POS system</h1>
        <h3 className={styles.titleDescription}>
          6 questions for a customized business solution
        </h3>
      </div>
    );
  };
  return (
    <QuestionnaireLayout>
      <QuestionnaireTitle />
      <QuestionnaireWrapper>
        <ProgressBar width={progressBarWidth} />
        {currentQuestion.text && (
          <div className={styles.questionDescriptionText}>
            {currentQuestion.text}
          </div>
        )}
        <div className={styles.contentWrapper}>
          <AnswersContent />
          <div className={styles.buttonsWrapper}>
            {questionHistory.length > 0 && (
              <button className={styles.prevBtn} onClick={moveToPrevQuestion}>
                <img src={prevIcon} alt="prev_btn_icon" />
              </button>
            )}
            <button
              className={`${styles.nextBtn} ${
                inputModified ||  nextBtnEnabled ? styles.enabled : ""
              }`}
              onClick={moveToNextQuestion}
              disabled={!inputModified && !nextBtnEnabled}
            >
              Next
            </button>
          </div>
        </div>
      </QuestionnaireWrapper>
    </QuestionnaireLayout>
  );
};

export default Questionnaire;
