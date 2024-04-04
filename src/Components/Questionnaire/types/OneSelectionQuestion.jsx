 import React, { useState, useEffect } from 'react';
 import { useQuestionnaire } from '../../../context/QuestionnaireContext';
 import styles from './AnswersContent.module.css';

 const selectedCheckboxSVG = 'https://assets.sonary.com/wp-content/uploads/2023/12/27112431/Selector-1.svg';
 const unselectedCheckboxSVG = 'https://assets.sonary.com/wp-content/uploads/2023/12/27112433/Selector.svg';

 const OneSelectionQuestion = () => {
    const { currentQuestion, responses, handleAnswerSelection,changeNextBtnState } = useQuestionnaire();
    const [localSelectedIndex, setLocalSelectedIndex] = useState(responses[currentQuestion.code]);
    const [delayNextQuestion, setDelayNextQuestion] = useState(false);
    const displayDirection = currentQuestion.display_list_direction;
    useEffect(() => {
        setLocalSelectedIndex(responses[currentQuestion.code]);
        
        setDelayNextQuestion(false);
        
    }, [currentQuestion, responses]);

    useEffect(() => {
        let timer;
        if (delayNextQuestion) {
            timer = setTimeout(() => {
                handleAnswerSelection(currentQuestion.code, localSelectedIndex);
                setDelayNextQuestion(false);
                changeNextBtnState(false);

            }, 1000); 
        }
        return () => clearTimeout(timer);
    }, [delayNextQuestion, localSelectedIndex, currentQuestion.code, handleAnswerSelection]);

    const handleClick = (index) => {
        changeNextBtnState(true);
        //need to add logic of 'other' input
        setLocalSelectedIndex(index);
        setDelayNextQuestion(true);
    };

    return (
        <div className={`${styles.answersContainer} ${displayDirection === "column" ? styles.listCol : styles.listRow}`}>
            {currentQuestion.answers.map((answer, index) => (
                <div key={`${currentQuestion.code}-${index}`}
                    className={`${styles.answerItem} ${index === localSelectedIndex ? styles.selected : ''} ${
                        displayDirection === "column" ? styles.answerRowItem : styles.answerCardItem
                    } ${styles.slideUpEntranceList} `} // Use delayNextQuestion to toggle animation classes
                    onClick={() => handleClick(index)}
                    style={{ animationDelay: `${index * 0.1}s` }} // Stagger the entrance of each answer
                >
                    <span>{answer.text}</span>
                    <img className={styles.checkboxSvg} src={index === localSelectedIndex ? selectedCheckboxSVG : unselectedCheckboxSVG} alt="Checkbox" />
                </div>
            ))}
        </div>
    );
};
 export default OneSelectionQuestion;