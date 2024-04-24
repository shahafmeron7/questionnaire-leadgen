import React from "react";
// import { useQuestionnaire } from "../../context/QuestionnaireContext";
import { useQuestionnaire } from "../../../context/QuestionnaireContext.jsx";
import styles from "./ExtraInfo.module.css";

const ExtraInfo = () => {
  const { currentQuestionCode,currentQuestion } = useQuestionnaire();
  return (
    <div
              key={currentQuestionCode}
          
             className={`animateStaggerItem animateFadeOut ${styles.extraInfoContainer}`}>
      {currentQuestion.extra_info}
      </div>
      

  );
};

export default ExtraInfo;
