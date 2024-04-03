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
    questionnaireStarted,
    startQuestionnaire,
    handleAnswerSelection,
    setCurrentQuestionCode,
    totalQuestions,
    currentQuestionIndex,
    moveToPrevQuestion,
    moveToNextQuestion,
    questionHistory,
    responses,
    questionnaireData,
  } = useQuestionnaire();

  const onAnswerSelect = (selectedIndex) => {
    handleAnswerSelection(currentQuestion.code, selectedIndex);
  };

  const selectedAnswerIndex = responses[currentQuestion.code];
  console.log("Questionnaire.jsx",selectedAnswerIndex)
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
        <div className={styles.questionDescriptionText}>
          {currentQuestion.text}
        </div>
        <div className={styles.contentWrapper}>
          <AnswersContent
          answers={currentQuestion.answers}
          questionType={currentQuestion.type}
          displayDirection={currentQuestion.display_list_direction}
          onAnswerSelect={onAnswerSelect}
          selectedAnswerIndex={selectedAnswerIndex}
        />
          <div className={styles.buttonsWrapper}>
            {questionHistory.length > 0 && (
              <button className={styles.prevBtn} onClick={moveToPrevQuestion}>
                <img src={prevIcon} alt="prev_btn_icon" />
              </button>
            )}
            <button className={styles.nextBtn} onClick={moveToNextQuestion}>
              Next
            </button>
          </div>
        </div>
      </QuestionnaireWrapper>
    </QuestionnaireLayout>
  );
};

export default Questionnaire;
