//  import React from "react";
//  import styles from "./AnswersContent.module.css";

//   const selectedCheckboxSVG = 'https://assets.sonary.com/wp-content/uploads/2023/12/27112431/Selector-1.svg';
//   const unselectedCheckboxSVG = 'https://assets.sonary.com/wp-content/uploads/2023/12/27112433/Selector.svg';



//  const OneSelectionQuestion = ({ answers, displayDirection, onAnswerSelect, selectedAnswerIndex }) => {
//     const handleClick = (index)=>{
//         onAnswerSelect(index)
//         setTimeout(() => {

//         }, 1000);
//     }
//      return (
//      <div className={`${styles.answersContainer} ${displayDirection === "column" ? styles.listCol : styles.listRow}`}>
//        {answers.map((answer, index) => (
//          <div key={index} 
//               className={`${styles.answerItem} ${index === selectedAnswerIndex ? styles.selected : ""} ${
//                 displayDirection === "column" ? styles.answerRowItem : styles.answerCardItem
//               }`} 
//               onClick={()=>handleClick(index)}
//          >
//            <span>{answer.text}</span>
//            <img className={styles.checkboxSvg} src={index === selectedAnswerIndex ? selectedCheckboxSVG : unselectedCheckboxSVG} alt="Checkbox" />
//          </div>
//        ))}
//      </div>
//    );
//  };

//  export default OneSelectionQuestion;
 import React, { useState, useEffect } from 'react';
 import { useQuestionnaire } from '../../../context/QuestionnaireContext';
 import styles from './AnswersContent.module.css';

 const selectedCheckboxSVG = 'https://assets.sonary.com/wp-content/uploads/2023/12/27112431/Selector-1.svg';
 const unselectedCheckboxSVG = 'https://assets.sonary.com/wp-content/uploads/2023/12/27112433/Selector.svg';

 const OneSelectionQuestion = ({ displayDirection }) => {
     const { currentQuestion, responses, handleAnswerSelection } = useQuestionnaire();
     const [localSelectedIndex, setLocalSelectedIndex] = useState(responses[currentQuestion.code]);


    const isRowItem = displayDirection === "column";

     const handleClick = (index) => {
         setLocalSelectedIndex(index);
         setTimeout(()=>{
            
             handleAnswerSelection(currentQuestion.code, index);
         },1000)
     };

     return (
         <div className={`${styles.answersContainer} ${isRowItem ? styles.listCol : styles.listRow}`}>
             {currentQuestion.answers.map((answer, index) => (
                 <div key={index} 
                      className={`${styles.answerItem} ${index === localSelectedIndex ? styles.selected : ''} ${
                          isRowItem ? styles.answerRowItem : styles.answerCardItem
                      }`} 
                      onClick={() => handleClick(index)}
                 >
                     <span>{answer.text}</span>
                     {!isRowItem && (
                         <img className={styles.checkboxSvg} src={index === localSelectedIndex ? selectedCheckboxSVG : unselectedCheckboxSVG} alt="Checkbox" />
                     )}
                 </div>
             ))}
         </div>
     );
 };
 export default OneSelectionQuestion;