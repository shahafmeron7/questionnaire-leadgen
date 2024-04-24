import React from "react";
import LoaderSVG from "../../UI/LoaderSVG";
// import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import { useQuestionnaire } from "../../../context/QuestionnaireContext.jsx";

import styles from "../Questionnaire.module.css";
const Loader = () => {
  const { currentQuestion,currentQuestionCode } = useQuestionnaire();
  return (
    <div
        key={currentQuestionCode}
    
        className={`animateTitleItem animateFadeOut ${styles.loaderWrapper}`}
      >
        <LoaderSVG />
        <div style={{lineHeight:"48px"}}>
          <h1 className={styles.loaderText}>{currentQuestion.text}</h1>
          <p className={styles.loaderExtraInfoText}>
            {currentQuestion.extra_info}
          </p>
        </div>
      </div>
  );
};

export default Loader;
