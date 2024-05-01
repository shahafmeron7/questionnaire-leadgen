import React, { useState, useEffect } from "react";
// import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import { useQuestionnaire } from "context/QuestionnaireContext.jsx";

import { ReactComponent as UnselectedCheckboxSVG } from "images/unselectedbox.svg";
import { ReactComponent as SelectedCheckboxSVG } from "images/selectedbox.svg";
import { ReactComponent as CreditCardSVG } from "images/multiselection/creditcard.svg";
import { ReactComponent as CashSVG } from "images/multiselection/cash.svg";
import { ReactComponent as PhoneSVG } from 'images/multiselection/phone.svg'
import styles from "./AnswersContent.module.css";
import useIsWideScreen from "hooks/useIsWideScreen.jsx";

const icons = {
  1: CashSVG,
  2: CreditCardSVG,
  3: PhoneSVG,
};
const MultipleChoiceQuestion = () => {
  const {
    currentQuestion,
    currentQuestionCode,
    responses,
    changeNextBtnState,
    handleMultipleAnswerSelection,
    isAnimatingOut
  } = useQuestionnaire();
  const [selectedIndexes, setSelectedIndexes] = useState(
    responses[currentQuestionCode]?.answerIndexes || []
  );
  const isWideScreen = useIsWideScreen();

  const isDisplayDirectionCol =
    currentQuestion.display_list_direction === "col";
    useEffect(() => {
      changeNextBtnState(selectedIndexes.length > 0);
    }, [selectedIndexes]); 

    useEffect(() => {
      const response = responses[currentQuestionCode];
      if (response && response.answerIndexes) {
        setSelectedIndexes(response.answerIndexes);
      } else {
        setSelectedIndexes([]);
      }
    }, [currentQuestionCode, responses]);

  const handleClick = (index) => {
    if(isAnimatingOut) return;
    const newSelectedIndexes = selectedIndexes.includes(index)
      ? selectedIndexes.filter(i => i !== index)
      : [...selectedIndexes, index];

    setSelectedIndexes(newSelectedIndexes);

    handleMultipleAnswerSelection(currentQuestionCode, newSelectedIndexes);
  };
  
  return (
    <div
      className={`animateFadeOut ${styles.answersContainer} ${
        isDisplayDirectionCol ? styles.listCol : styles.listRow
      } `}
    >
      {currentQuestion.answers.map((answer, index) => {
        const IconComponent = icons[index + 1];
        return (
         <div
              key={`${currentQuestionCode}-${index}`}
              className={`animateStaggerItem
          ${styles.answerItem} 
          ${selectedIndexes.includes(index) ? styles.selected : ""}
          ${
            isWideScreen
              ? isDisplayDirectionCol
                ? styles.answerRowItem
                : styles.answerCardItem
              : styles.answerRowItem
          }
        `}
              onClick={() => handleClick(index)}
            >
              {isWideScreen && <IconComponent />}
              <span>{answer.text}</span>
              {selectedIndexes.includes(index) ? (
                <SelectedCheckboxSVG />
              ) : (
                <UnselectedCheckboxSVG />
              )}
            </div>
        );
      })}
    </div>
  );
};

export default MultipleChoiceQuestion;
