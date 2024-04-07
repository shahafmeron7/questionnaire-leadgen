import React from "react";
import styles from "./AnswersContent.module.css";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import InputWithValidation from "../../UI/InputWithValidation";
const DetailsQuestion = () => {
  const { currentQuestion, responses, handleInputChange ,errResponses,currentQuestionCode} = useQuestionnaire();
  const getInputType = (code) => {
    switch(code) {
      case "email": return "email";
      case "zip_code": return "zip";
      case "phone": return "phone";
      case "first_name":
      case "last_name":
      case "company_name":
       return "text"; 
      default: return "text";
    }
  };
  const isPersonalAndBusinessInfo = currentQuestion.code === "personal_and_business_info";

  
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
            onChange={handleInputChange}
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
