import React, { useEffect, useState } from "react";
import QuestionnaireLayout from "../../containers/QuestionnaireLayout.jsx";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import ProgressBar from "../UI/ProgressBar";
import AnswersContent from "./types/AnswersContent.jsx";
import prevIcon from "../../images/prevbutton.svg";
import styles from "./Questionnaire.module.css";
import Loader from "./types/Loader.jsx";
import QuestionnaireWrapper from "../../containers/QuestionnaireWrapper.jsx";
import FormProgress from "../UI/FormProgress.jsx";
import LogoPOS from "../UI/LogoPOS.jsx";
const Questionnaire = () => {
  const {
    currentQuestion,
    setCurrentQuestionCode,
    totalQuestions,
    currentQuestionIndex,
    currentQuestionCode,
    moveToPrevQuestion,
    questionnaireStarted,
    moveToNextQuestion,
    questionHistory,
    checkAndEnableNextButton,
    inputModified,
    nextBtnEnabled,
    responses,
  } = useQuestionnaire();
  const [showLoader, setShowLoader] = useState(false);

  const isFormSequence = currentQuestion.type === "form-type";

  const progressBarWidth = Math.round(
    (currentQuestion.step / 4) * 100
  );
  useEffect(() => {
    checkAndEnableNextButton();
  }, [currentQuestion, responses]);

  
  useEffect(() => {
    let timeoutId = null; 
    if (currentQuestion.type === 'loader') {
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
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Find your POS system</h1>
        <h3 className={styles.titleDescription}>
          6 questions for a customized business solution
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
       {!questionnaireStarted &&<QuestionnaireTitle />}
       {currentQuestionCode === "email" && <LogoPOS/>}
        {isFormSequence &&<FormProgress/>}
       <QuestionnaireWrapper>
         {!isFormSequence && <ProgressBar width={progressBarWidth} />}
         {currentQuestion.text && (
           <div className={styles.questionDescriptionText}>
             {currentQuestion.text}
           </div>
         )}
         <div className={styles.contentWrapper}>
           <AnswersContent />
           <div className={styles.buttonsWrapper}>
             {questionHistory.length > 0 && (
               <button className={styles.prevBtn} onClick={moveToPrevQuestion}>
                 <img src={prevIcon} alt="prev_btn_icon" />
               </button>
             )}
             <button
               className={`${styles.nextBtn} ${
                 inputModified || nextBtnEnabled ? styles.enabled : ""
               }`}
               onClick={moveToNextQuestion}
               disabled={!inputModified && !nextBtnEnabled}
             >
               Next
             </button>
           </div>
         </div>
       </QuestionnaireWrapper>
     </QuestionnaireLayout>
   );
};

export default Questionnaire;
