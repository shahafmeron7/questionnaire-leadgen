import React, { useEffect, useState,useRef,useLayoutEffect } from "react";
import QuestionnaireLayout from "../../containers/QuestionnaireLayout.jsx";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import ProgressBar from "../UI/ProgressBar";
import AnswersContent from "./types/AnswersContent.jsx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SSLIcon from "../UI/SSLIcon.jsx";
import styles from "./Questionnaire.module.css";
import Loader from "./types/Loader.jsx";
import QuestionnaireWrapper from "../../containers/QuestionnaireWrapper.jsx";
import FormProgress from "../UI/FormProgress.jsx";
import LogoPOS from "../UI/LogoPOS.jsx";
import ExtraInfo from "../UI/ExtraInfo.jsx";
import LegalMessage from "../UI/LegalMessage.jsx";
import FormIcons from "../UI/FormIcons.jsx";
import QuestionnaireButtons from "../UI/QuestionnaireButtons.jsx";

const Questionnaire = () => {
  gsap.registerPlugin(useGSAP);

  const {
    currentQuestion,
    setCurrentQuestionCode,
    currentQuestionCode,
    navigate,
    questionnaireStarted,
  } = useQuestionnaire();
  const [showLoader, setShowLoader] = useState(false);

  const isFormSequence = currentQuestion.type === "form-type";
  const isFinalStep = currentQuestionCode === "phone";
  const isZipCodeStep = currentQuestionCode === "zip_code";
  const isEmailStep = currentQuestionCode === "email";
  

  const tl = useRef();


  const layoutRef = useRef(null);

  useGSAP(() => {
    const progressBarWidth = Math.round(((currentQuestion.step - 1) / (4 - 1)) * 100) + '%';
   
   

    tl.current = gsap.timeline()
      .fromTo(".progressLine",
      { width: "0%" }, 
      { width: progressBarWidth, duration: 0.5, ease: 'none' })
      .fromTo(".titleItem",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.1, ease: 'power2.inOut' })
      .fromTo(".answerItem", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.inOut' })
      .fromTo(".buttonsWrapper", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.inOut' })
    
    
  }, {scope:layoutRef,dependencies:[currentQuestionCode]}); 
  
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
  }, [currentQuestion,navigate]);

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
      <QuestionnaireLayout ref={layoutRef}>
        <QuestionnaireWrapper>
          <Loader />
        </QuestionnaireWrapper>
      </QuestionnaireLayout>
    );
  }

  return (
    <QuestionnaireLayout ref={layoutRef}>
      {!questionnaireStarted && (
        <>
          <QuestionnaireTitle />
          <FormIcons />
        </>
      )}
      {isEmailStep && <LogoPOS />}

      {isFormSequence && <FormProgress />}
      <QuestionnaireWrapper>
        {!isFormSequence && <ProgressBar />}
        {currentQuestion.text && (
          <div key={currentQuestionCode} className={`titleItem ${styles.questionDescriptionText}`}>
            {currentQuestion.text}
            {currentQuestion.instructions && (
              <p className={styles.questionInstructions}>
                {currentQuestion.instructions}
              </p>
            )}
          </div>
        )}
        <div className={styles.contentWrapper}>
          <AnswersContent  />

          {(isFinalStep || isZipCodeStep) && <ExtraInfo />}

          {isFinalStep && (
            <>
              <SSLIcon />
              <LegalMessage />
            </>
          )}

          <QuestionnaireButtons />
        </div>
      </QuestionnaireWrapper>
    </QuestionnaireLayout>
  );
};

export default Questionnaire;
