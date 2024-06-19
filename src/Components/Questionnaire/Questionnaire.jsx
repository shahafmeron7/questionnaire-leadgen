import React, { useContext } from "react";


import QuestionnaireLayout from "@/layouts/QuestionnaireLayout";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import useIsWideScreen from "@/hooks/useIsWideScreen";

import OsanoVisibilityContext from "@/context/OsanoVisibilityContext";

import useLoader from "@/hooks/useLoader";
import useAnimations from "@/hooks/useAnimations";
import ProgressBar from "@/components/UI/ProgressBar";
 import AnswersContent from "@/components/Questionnaire/types/AnswersContent";

import Loader from "@/components/Questionnaire/types/Loader";
import QuestionnaireWrapper from "@/layouts/QuestionnaireWrapper";
import FormProgress from "@/components/UI/Form/FormProgress";
import StarsHero from "@/components/UI/StarsHero";
import ExtraInfo from "@/components/UI/Promotional/ExtraInfo";
import LegalMessage from "@/components/UI/Form/Legal/LegalMessage";
import MiniLegalMessage from "@/components/UI/Form/Legal/MiniLegalMessge";
import FormIcons from "@/components/UI/Form/FormIcons";
import QuestionnaireButtons from "@/components/UI/Form/QuestionnaireButtons";
import QuestionnaireTitle from "@/components/UI/QuestionnaireTitle";

import SSLIcon from "@/components/UI/Form/SSLIcon";

import styles from "./Questionnaire.module.css";


const Questionnaire = () => {

  const {
    currentQuestion,
    currentQuestionCode,
    questionnaireStarted,
  } = useQuestionnaire();
  const {osanoShown} = useContext(OsanoVisibilityContext);
  const isWideScreen = useIsWideScreen();
  const showLoader = useLoader();
  const layoutRef = useAnimations();


  const isFormSequence = currentQuestion.type === "form-type";
  const isFinalStep = currentQuestionCode === "phone";
  const isZipCodeStep = currentQuestionCode === "zip_code";
  const isPersonalInfoStep = currentQuestionCode ==='personal_and_business_info'
  const isEmailStep = currentQuestionCode === "email";
  

  const mobileStyle = {
    paddingBottom: osanoShown ? "170px":"88px", 
  }





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
        <div className={styles.contentWrapper} style={questionnaireStarted&& !isWideScreen ? mobileStyle : {}}>
          <AnswersContent  />

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

    </QuestionnaireLayout>
  );
};

export default Questionnaire;
