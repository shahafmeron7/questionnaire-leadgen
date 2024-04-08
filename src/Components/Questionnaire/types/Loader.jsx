import React from "react";
import LoaderSVG from "../../UI/LoaderSVG";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import styles from "../Questionnaire.module.css";
const Loader = () => {
  const { currentQuestion } = useQuestionnaire();
  return (
    <div className={styles.loaderWrapper}>
      <LoaderSVG />
      <div>
        <h1 className={styles.loaderText}>{currentQuestion.text}</h1>
        <p className={styles.loaderExtraInfoText}>
          {currentQuestion.extra_info}
        </p>
      </div>
    </div>
  );
};

export default Loader;
