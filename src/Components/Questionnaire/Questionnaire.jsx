import React, { useEffect, useState,useRef,useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireLayout from "../../containers/QuestionnaireLayout.jsx";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import ProgressBar from "../UI/ProgressBar";
import AnswersContent from "./types/AnswersContent.jsx";
import { motion, AnimatePresence } from "framer-motion";
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
import { defaultVariants } from "../../animations/animations.js";
import QuestionnaireButtons from "../UI/QuestionnaireButtons.jsx";

const Questionnaire = () => {
  gsap.registerPlugin(useGSAP);

  const {
    currentQuestion,
    setCurrentQuestionCode,
    currentQuestionCode,

    questionnaireStarted,
  } = useQuestionnaire();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  const isFormSequence = currentQuestion.type === "form-type";
  const isFinalStep = currentQuestionCode === "phone";
  const isZipCodeStep = currentQuestionCode === "zip_code";
  const isEmailStep = currentQuestionCode === "email";
  

  const titleRef = useRef(null);
  const textRef = useRef(null);
  const iconsRef = useRef(null);
  const progressBarRef = useRef(null);
  const answersContentRef = useRef(null);
  const sslIconRef = useRef(null);
  const legalMessageRef = useRef(null);
  const buttonsRef = useRef(null);
  useGSAP(() => {
    const progressBarWidth = Math.round(((currentQuestion.step - 1) / (4 - 1)) * 100) + '%';

    const tl = gsap.timeline();

    tl.fromTo(progressBarRef.current,
        { width: "0%" }, // Assuming the initial state should be 0% or capture the initial width dynamically
        { width: progressBarWidth, duration: 0.2, ease: 'none' },
      ).fromTo(textRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo(answersContentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.3")
        .fromTo(buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.3");
  
      // return () => {
      //   // Clean up animation
      //   gsap.to([textRef.current, answersContentRef.current, buttonsRef.current], {
      //     opacity: 0, y: -30, duration: 0.5, ease: 'power2.in'
      //   });
      // };
  }, [currentQuestionCode]); 
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

  const QuestionnaireTitle = () => {
    return (
      <div ref={titleRef} className={styles.titleWrapper}>
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

  return (
    <QuestionnaireLayout>
      {!questionnaireStarted && (
        <>
          <QuestionnaireTitle />
          <FormIcons />
        </>
      )}
      {isEmailStep && <LogoPOS />}

      {isFormSequence && <FormProgress />}
      <QuestionnaireWrapper>
        {!isFormSequence && <ProgressBar ref={progressBarRef} />}
        {currentQuestion.text && (
          <div ref={textRef} key={currentQuestionCode} className={`${styles.questionDescriptionText}`}>
            {currentQuestion.text}
            {currentQuestion.instructions && (
              <p className={styles.questionInstructions}>
                {currentQuestion.instructions}
              </p>
            )}
          </div>
        )}
        <div className={styles.contentWrapper}>
          <AnswersContent ref={answersContentRef} />

          {(isFinalStep || isZipCodeStep) && <ExtraInfo />}

          {isFinalStep && (
            <>
              <SSLIcon />
              <LegalMessage />
            </>
          )}

          <QuestionnaireButtons ref={buttonsRef} />
        </div>
      </QuestionnaireWrapper>
    </QuestionnaireLayout>
  );
};

export default Questionnaire;
