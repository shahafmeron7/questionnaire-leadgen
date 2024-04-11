import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../containers/QuestionnaireLayout.jsx";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import ProgressBar from "../UI/ProgressBar";
import AnswersContent from "./types/AnswersContent.jsx";
import { ReactComponent as PrevIcon } from "../../images/prevbutton.svg";
import { motion, AnimatePresence } from "framer-motion";
import SSLIcon from "../UI/SSLIcon.jsx";
import styles from "./Questionnaire.module.css";
import Loader from "./types/Loader.jsx";
import QuestionnaireWrapper from "../../containers/QuestionnaireWrapper.jsx";
import FormProgress from "../UI/FormProgress.jsx";
import LogoPOS from "../UI/LogoPOS.jsx";
import ExtraInfo from "../UI/ExtraInfo.jsx";
import LegalMessage from "../UI/LegalMessage.jsx";
import FormIcons from "../UI/FormIcons.jsx";
import { defaultVariants } from "../../animations/animations.js";

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
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 767);

  const isFormSequence = currentQuestion.type === "form-type";
  const isFinalStep = currentQuestionCode === "phone";
  const isZipCodeStep = currentQuestionCode === "zip_code";
  const isEmailStep = currentQuestionCode === "email";
  const progressBarWidth = Math.round(
    ((currentQuestion.step - 1) / (4 - 1)) * 100
  );

  useEffect(() => {
    let timerId;
    if (isNextButtonClicked) {
      console.log("useeffect clciked");
      timerId = setTimeout(() => {
        moveToNextQuestion();
        // navigate(`?step=${currentQuestion.step+1}`, { replace: true });
        console.log("button false clciked");

        setIsNextButtonClicked(false);
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [isNextButtonClicked, moveToNextQuestion]);

  useEffect(() => {
    checkAndEnableNextButton();
  }, [currentQuestion, responses]);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // useEffect(() => {
  //   // Function to execute on back navigation
  //   const handleBackNavigation = (event) => {
  //     event.preventDefault();
  //     if (currentQuestion.step > 1) {
  //       moveToPrevQuestion();
  //     } else {
  //       navigate(-1);
  //     }
  //   };

  //   window.addEventListener('popstate', handleBackNavigation);

  //   return () => window.removeEventListener('popstate', handleBackNavigation);
  // }, [currentQuestion, moveToPrevQuestion, navigate]);

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
    console.log("next clicked");
    setIsNextButtonClicked(true); // Trigger the useEffect hook above
  };

  const QuestionnaireTitle = () => {
    return (
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          Find the right merchant service provider
        </h1>
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
  const mobileButtonsstyle = {
    position: "absolute",
    bottom: "0",
    width: "100%",
    backgroundColor: "#fff",
    padding: "16px",
  };
  return (
    <QuestionnaireLayout>
      {!questionnaireStarted && (
        <>
          <QuestionnaireTitle />
          <FormIcons />
        </>
      )}
      {isEmailStep && (
        <AnimatePresence>
          <motion.div
            key={currentQuestionCode}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={defaultVariants}
          >
            <LogoPOS />
          </motion.div>
        </AnimatePresence>
      )}

      {isFormSequence && (
        <AnimatePresence>
          <motion.div
            key={currentQuestionCode}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={defaultVariants}
          >
            <FormProgress />
          </motion.div>
        </AnimatePresence>
      )}
      <QuestionnaireWrapper>
        {!isFormSequence && <ProgressBar width={progressBarWidth} />}
        {currentQuestion.text && (
          <AnimatePresence>
            <motion.div
              key={currentQuestionCode}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={defaultVariants}
              className={`${styles.questionDescriptionText}`}
            >
              {currentQuestion.text}
              {currentQuestion.instructions && (
                <p className={styles.questionInstructions}>
                  {currentQuestion.instructions}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        <div className={styles.contentWrapper}>
          <AnswersContent />
         
              {(isFinalStep || isZipCodeStep) && <ExtraInfo />}

              {isFinalStep && (
                <>
                  <SSLIcon />
                  <LegalMessage />
                </>
              )}
         
          <AnimatePresence>
            <motion.div
              key={currentQuestionCode}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={defaultVariants}
              className={`${styles.buttonsWrapper}`}
              style={
                questionnaireStarted && !isWideScreen ? mobileButtonsstyle : {}
              }
            >
              {questionHistory.length > 0 && (
                <button className={styles.prevBtn} onClick={moveToPrevQuestion}>
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
                  !inputModified &&
                  !nextBtnEnabled &&
                  !isNextButtonFunctionallyDisabled
                }
              >
                {isFinalStep ? "Get Results" : "Next"}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </QuestionnaireWrapper>
    </QuestionnaireLayout>
  );
};

export default Questionnaire;
