import React, { lazy,useEffect, useState, useRef,Suspense } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import QuestionnaireLayout from "layouts/QuestionnaireLayout";
import { useQuestionnaire } from "context/QuestionnaireContext";
import ProgressBar from "components/UI/ProgressBar";
 import AnswersContent from "components/Questionnaire/types/AnswersContent";
//  import AnswersContent from "components/Questionnaire/types/AnswersContentLazy";

import Loader from "components/Questionnaire/types/Loader";
import QuestionnaireWrapper from "layouts/QuestionnaireWrapper";
import FormProgress from "components/UI/Form/FormProgress";
import StarsHero from "components/UI/StarsHero";
import ExtraInfo from "components/UI/Promotional/ExtraInfo";
import LegalMessage from "components/UI/Form/Legal/LegalMessage";
import MiniLegalMessage from "components/UI/Form/Legal/MiniLegalMessge";
import FormIcons from "components/UI/Form/FormIcons";
import QuestionnaireButtons from "components/UI/Form/QuestionnaireButtons";
import SSLIcon from "components/UI/Form/SSLIcon";

import styles from "./Questionnaire.module.css";
// const AnswersContent = lazy(() => import("components/Questionnaire/types/AnswersContent"));

gsap.config({
  nullTargetWarn: false,
})
gsap.registerPlugin(useGSAP);
const Questionnaire = () => {

  const {
    currentQuestion,
    handleNavigateNextQuestion,
    currentQuestionCode,
    questionnaireStarted,
  } = useQuestionnaire();
  const [showLoader, setShowLoader] = useState(false);
  const [componentLoaded, setComponentLoaded] = useState(false);

  const layoutRef = useRef(null);
  const tl = useRef();

  const isFormSequence = currentQuestion.type === "form-type";
  const isFinalStep = currentQuestionCode === "phone";
  const isZipCodeStep = currentQuestionCode === "zip_code";
  const isPersonalInfoStep = currentQuestionCode ==='personal_and_business_info'
  const isEmailStep = currentQuestionCode === "email";
  




  useGSAP(() => {
    // if (componentLoaded) {
      // console.log('compoenet loaded')
    tl.current = gsap.timeline()
      .fromTo(".animateItem", { opacity: 0, y: 100 }, { opacity: 1, y: 0, stagger: 0.02, duration: 0.05, ease: 'power2.inOut' })
      .fromTo(".animateTitleItem", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.inOut' })
      .fromTo(".animateStaggerItem", { opacity: 0, y: 150 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.6, ease: "back.inOut(2)" });
    // }
  }, { scope: layoutRef, dependencies: [currentQuestionCode,componentLoaded] });
  // useEffect(() => {
  //   if (componentLoaded) {
  //     gsap.timeline()
  //       .fromTo(".animateItem", { opacity: 0, y: 100 }, { opacity: 1, y: 0, stagger: 0.02, duration: 0.05, ease: 'power2.inOut' })
  //       .fromTo(".animateTitleItem", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.inOut' })
  //       .fromTo(".animateStaggerItem", { opacity: 0, y: 150 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.6, ease: "back.inOut(2)" });
  //   }
  // }, [componentLoaded]);
  
  useEffect(() => {
    let timeoutId = null;
    if (currentQuestion.type === "loader") {
      setShowLoader(true);
      timeoutId = setTimeout(() => {
        setShowLoader(false);
        const nextQuestionCode = currentQuestion.answers[0]?.next_question_code;
        if (nextQuestionCode) {
          handleNavigateNextQuestion(nextQuestionCode)
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
      <div key={currentQuestionCode} className={`animateItem animateFadeOut ${styles.titleWrapper}`}>
      <h1 className={styles.title}>Find the right merchant service provider</h1>
      <h3 className={styles.titleDescription}>Just a few questions to find your match</h3>
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
            <Suspense fallback={<div>Loading...</div>}>

      {!questionnaireStarted && (
        <>
          <QuestionnaireTitle />
          <FormIcons   />
        </>
      )}
      {isEmailStep && <StarsHero />}

      {isFormSequence && <FormProgress />}
      <QuestionnaireWrapper>
        {!isFormSequence && <ProgressBar />}
        {currentQuestion.text && (
          <div key={currentQuestionCode} className={`animateTitleItem animateFadeOut ${styles.questionDescriptionText}`}>
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
          {/* <AnswersContent onComponentLoaded={() => setComponentLoaded(true)} /> */}

          {(isFinalStep || isZipCodeStep) && <ExtraInfo />}
          {(isZipCodeStep || isEmailStep || isPersonalInfoStep) && <MiniLegalMessage/>}
          {isFinalStep && (
            <>
              <SSLIcon />
              <LegalMessage />
            </>
          )}

          <QuestionnaireButtons />
        </div>
      </QuestionnaireWrapper>
      </Suspense>

    </QuestionnaireLayout>
  );
};

export default Questionnaire;
