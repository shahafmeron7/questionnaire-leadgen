import React, { useEffect, useState } from "react";
import QuestionnaireLayout from "../../containers/QuestionnaireLayout.jsx";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import ProgressBar from "../UI/ProgressBar";
import AnswersContent from "./types/AnswersContent.jsx";
import prevIcon from "../../images/prevbutton.svg";
import styles from "./Questionnaire.module.css";
import Loader from "./types/Loader.jsx";
import QuestionnaireWrapper from "../../containers/QuestionnaireWrapper.jsx";
import FormProgress from "../UI/FormProgress.jsx";
import LogoPOS from "../UI/LogoPOS.jsx";
import ExtraInfo from "../UI/ExtraInfo.jsx";
import LegalMessage from "../UI/LegalMessage.jsx";
import FormIcons from "../UI/FormIcons.jsx";
const Questionnaire = () => {
  const {
    currentQuestion,
    setCurrentQuestionCode,
    currentQuestionCode,
    moveToPrevQuestion,
    questionnaireStarted,
    moveToNextQuestion,
    questionHistory,
    isNextButtonFunctionallyDisabled,
    checkAndEnableNextButton,
    inputModified,
    nextBtnEnabled,
    responses,
  } = useQuestionnaire();
  const [showLoader, setShowLoader] = useState(false);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);

  const isFormSequence = currentQuestion.type === "form-type";
  const isFinalStep = currentQuestionCode === "phone";
  const isZipCodeStep = currentQuestionCode === "zip_code";
  const isEmailStep = currentQuestionCode === "email";
  const progressBarWidth = Math.round(((currentQuestion.step-1) / (4-1)) * 100);

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
    let timeoutId = null;
    if (currentQuestion.type === "loader") {
      setShowLoader(true);
      timeoutId = setTimeout(() => {
        setShowLoader(false);
        const nextQuestionCode = currentQuestion.answers[0]?.next_question_code;
        if (nextQuestionCode) {
          setCurrentQuestionCode(nextQuestionCode);
        }
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentQuestion]);

  const handleNextButtonClick = () => {
    setIsNextButtonClicked(true); // Trigger the useEffect hook above
  };
  
  const QuestionnaireTitle = () => {
    return (
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Find the right merchant service provider</h1>
        <h3 className={styles.titleDescription}>
          Just a few questions to find your match
        </h3>
      </div>
    );
  };

  if (showLoader) {
    return (
      <QuestionnaireLayout>
        <QuestionnaireWrapper>
          <Loader />
        </QuestionnaireWrapper>
      </QuestionnaireLayout>
    );
  }
  return (
    <QuestionnaireLayout>
      {!questionnaireStarted && (
        <>
        <QuestionnaireTitle />
        <FormIcons/>
        </>
      )}
      {isEmailStep && <LogoPOS />}
      {isFormSequence && <FormProgress />}
      <QuestionnaireWrapper>
        {!isFormSequence && <ProgressBar width={progressBarWidth} />}
        {/* {isFinalStep && <FinalStepTitle/>} */}
        {currentQuestion.text && (
          <div className={styles.questionDescriptionText}>
            {currentQuestion.text}
          </div>
        )}
        <div className={styles.contentWrapper}>
          <AnswersContent />
          {(isFinalStep || isZipCodeStep) && <ExtraInfo />}

          {isFinalStep && <LegalMessage />}
          <div className={styles.buttonsWrapper}>
            {questionHistory.length > 0 && (
              <button className={styles.prevBtn} onClick={moveToPrevQuestion}>
                <img src={prevIcon} alt="prev_btn_icon" />
              </button>
            )}
            <button
              className={`${styles.nextBtn} ${
                inputModified || nextBtnEnabled ? styles.enabled : ""
              }`}
              onClick={() =>
                !isNextButtonFunctionallyDisabled && moveToNextQuestion()
              }
              disabled={
                !inputModified &&
                !nextBtnEnabled &&
                !isNextButtonFunctionallyDisabled
              }
            >
              {isFinalStep ? 'Get Results' :'Next'}
            </button>
          </div>
        </div>
      </QuestionnaireWrapper>
    </QuestionnaireLayout>
  );
};

export default Questionnaire;
