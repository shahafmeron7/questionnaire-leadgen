import React from "react";
// import { useQuestionnaire } from "../../context/QuestionnaireContext";
import { useQuestionnaire } from "../../../context/QuestionnaireContext.jsx";
import styles from "./FormProgress.module.css";

const FormProgress = () => {
  const { currentQuestionCode } = useQuestionnaire();
  const steps = {
    email: 1,
    personal_and_business_info: 2,
    phone: 3,
  };
  const currentStepNumber = steps[currentQuestionCode];

  return (

    <div
    key={currentQuestionCode} 
    className={`animateStaggerItem animateFadeOut  ${styles.formProgressContainer}`}>
      {Object.entries(steps).map(([code, stepNumber]) => (
        <div
        key={code}
        className={`${styles.formProgressItem} ${currentStepNumber >= stepNumber ? styles.activeItem : ''}`}>
          {stepNumber}
        </div>
      ))}
    </div>
     
  );
};

export default FormProgress;
