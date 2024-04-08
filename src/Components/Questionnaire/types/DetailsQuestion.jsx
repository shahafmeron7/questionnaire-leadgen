import React from "react";
import styles from "./AnswersContent.module.css";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import InputWithValidation from "../../UI/InputWithValidation";
const DetailsQuestion = () => {
  const { currentQuestion, responses ,errResponses,currentQuestionCode} = useQuestionnaire();
  
  const isPersonalAndBusinessInfo = currentQuestionCode === "personal_and_business_info";

  
  return (
    <div className={`${styles.inputsContainer} ${isPersonalAndBusinessInfo ? styles.specialLayout : ''}`}>
      {currentQuestion.subquestions.map((sub, index) => (
        <div id={sub.code} key={`${sub.code}-${index}`} 
             className={`${styles.inputWrapper} ${isPersonalAndBusinessInfo && index < 2 ? styles.rowChild : ''}`}>
          <h4 className={styles.inputTitle}>{sub.text}</h4>
          <InputWithValidation
            type="text"
            name={sub.code}
            value={responses[sub.code] || ""}
            placeholder={sub.example}
            errorMessage={sub.error}
            isError={errResponses[sub.code] || false}
          />
        </div>
      ))}
    </div>
  );
};

export default DetailsQuestion;
