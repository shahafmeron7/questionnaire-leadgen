import React,{useState,useEffect} from 'react'
import { useQuestionnaire } from '../../../context/QuestionnaireContext';
import unselectedCheckboxSVG from '../../../images/unselectedbox.svg'
import selectedCheckboxSVG from '../../../images/selectedbox.svg'
import styles from "./AnswersContent.module.css";

const MultipleChoiceQuestion = () => {
  const {
    currentQuestion,
    currentQuestionCode,
    responses,
    changeNextBtnState,
    handleMultipleAnswerSelection,
    toggleNextButtonFunctionality,
  } = useQuestionnaire();
  const [selectedIndexes, setSelectedIndexes] = useState(responses[currentQuestionCode]  || []);
  const [delayNextQuestion, setDelayNextQuestion] = useState(false);

  const isDisplayDirectionCol = currentQuestion.display_list_direction === "col";
  useEffect(() => {
    // Enable the next button if at least one answer is selected
    changeNextBtnState(selectedIndexes.size > 0);
  }, [selectedIndexes, changeNextBtnState]);

  useEffect(() => {
    // Load existing responses into the selected indexes
    const response = responses[currentQuestion.code];
    if (response) {
      setSelectedIndexes(response);
    }
  }, [currentQuestion, responses]);
  useEffect(() => {
    if (delayNextQuestion) {
      toggleNextButtonFunctionality(true); 
      const timer = setTimeout(() => {
        handleMultipleAnswerSelection(currentQuestion.code,  selectedIndexes);
        setDelayNextQuestion(false);
        toggleNextButtonFunctionality(false); 
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [delayNextQuestion, selectedIndexes, currentQuestionCode, handleMultipleAnswerSelection, toggleNextButtonFunctionality]);

    const handleClick = (index) => {
    if (delayNextQuestion) return; // Prevent interaction during delay
    const newSelectedIndexes = selectedIndexes.includes(index) 
    ? selectedIndexes.filter(i => i !== index) 
    : [...selectedIndexes, index];
      console.log(newSelectedIndexes)
  setSelectedIndexes(newSelectedIndexes);
  changeNextBtnState(newSelectedIndexes.length > 0);
      console.log('here')
  handleMultipleAnswerSelection(currentQuestionCode, newSelectedIndexes);
    
  };
  return (
     <div
       className={`${styles.answersContainer} ${isDisplayDirectionCol ? styles.listCol : styles.listRow} `}
     >
       {currentQuestion.answers.map((answer, index) => (
         <div
           key={`${currentQuestion.code}-${index}`}
           className={`${styles.slideUpEntranceList} ${styles.answerItem} ${selectedIndexes.includes(index) ? styles.selected : ""} ${isDisplayDirectionCol ? styles.answerRowItem : styles.answerCardItem}`}
           onClick={() => handleClick(index)}
           style={{ animationDelay: `${index * 0.1}s` }}
         >
          <img src={answer.iconSrc} alt={`${answer.text} Icon`} />
           <span>{answer.text}</span>
           <img
             className={styles.checkboxSvg}
             src={selectedIndexes.includes(index) ? selectedCheckboxSVG : unselectedCheckboxSVG}
             alt="Checkbox"
           />
         </div>
       ))}
     </div>
  );
}

export default MultipleChoiceQuestion