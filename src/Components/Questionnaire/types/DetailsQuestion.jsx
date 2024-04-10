import React,{useState,useEffect} from "react";
import styles from "./AnswersContent.module.css";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import InputWithValidation from "../../UI/InputWithValidation";
const DetailsQuestion = () => {
  const { currentQuestion, responses ,errResponses,currentQuestionCode} = useQuestionnaire();
  const isFinalStep = currentQuestionCode === "phone";
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 600);

  const isPersonalAndBusinessInfo = currentQuestionCode === "personal_and_business_info";
  const FinalStepTitle = ({text})=>{
    return(

      <div className ={styles.finalStepTitleWrapper}>
      <h1 className={styles.finalStepTitle}>Final Step</h1>
        <h4 className={styles.inputTitle}>{text}</h4>

      </div>
      )
  }
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 600);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={`${styles.inputsContainer} ${isPersonalAndBusinessInfo && isWideScreen ? styles.specialLayout : ''}`}>
      {currentQuestion.subquestions.map((sub, index) => (
        <div id={sub.code} key={`${sub.code}-${index}`} 
             className={`${styles.inputWrapper} ${isPersonalAndBusinessInfo && isWideScreen && index < 2 ? styles.rowChild : ''}`}>
                      {isFinalStep ? (
                      <FinalStepTitle text={sub.text}/>
                      ):(
                        <h4 className={styles.inputTitle}>{sub.text}</h4>
                      )}

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
