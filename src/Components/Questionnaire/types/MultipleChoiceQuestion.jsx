import React, { useState, useEffect } from "react";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import { ReactComponent as UnselectedCheckboxSVG } from "../../../images/unselectedbox.svg";
import { ReactComponent as SelectedCheckboxSVG } from "../../../images/selectedbox.svg";
import { ReactComponent as CreditCardSVG } from "../../../images/multiselection/creditcard.svg";
import { ReactComponent as CashSVG } from "../../../images/multiselection/cash.svg";
import { ReactComponent as PhoneSVG } from "../../../images/multiselection/phone.svg";
import styles from "./AnswersContent.module.css";
import useIsWideScreen from "../../../custom hooks/useIsWideScreen";

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
    toggleNextButtonFunctionality,
    isAnimatingOut
  } = useQuestionnaire();
  const [selectedIndexes, setSelectedIndexes] = useState(
    responses[currentQuestionCode]?.answerIndexes || []
  );
  const isWideScreen = useIsWideScreen();

  const isDisplayDirectionCol =
    currentQuestion.display_list_direction === "col";
  
    useEffect(() => {
      const response = responses[currentQuestionCode];
      if (response && response.answerIndexes) {
        setSelectedIndexes(response.answerIndexes);
      } else {
        setSelectedIndexes([]);
      }
    }, [currentQuestionCode, responses]);
  // useEffect(() => {
  //   if (delayNextQuestion) {
  //     toggleNextButtonFunctionality(true);
  //     const timer = setTimeout(() => {
  //       handleMultipleAnswerSelection(currentQuestionCode, selectedIndexes);
  //       setDelayNextQuestion(false);
  //       toggleNextButtonFunctionality(false);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [
  //   delayNextQuestion,
  //   selectedIndexes,
  //   currentQuestionCode,
  //   handleMultipleAnswerSelection,
  //   toggleNextButtonFunctionality,
  // ]);
  const handleClick = (index) => {
    if(isAnimatingOut) return;
    const newSelectedIndexes = selectedIndexes.includes(index)
      ? selectedIndexes.filter(i => i !== index)
      : [...selectedIndexes, index];

    setSelectedIndexes(newSelectedIndexes);
    changeNextBtnState(newSelectedIndexes.length > 0);
    handleMultipleAnswerSelection(currentQuestionCode, newSelectedIndexes);
  };
  // const handleClick = (index) => {
  //   if (delayNextQuestion) return; // Prevent interaction during delay
  //   const newSelectedIndexes = selectedIndexes.includes(index)
  //     ? selectedIndexes.filter((i) => i !== index)
  //     : [...selectedIndexes, index];
  //   setSelectedIndexes(newSelectedIndexes);
  //   changeNextBtnState(newSelectedIndexes.length > 0);
  //   handleMultipleAnswerSelection(currentQuestionCode, newSelectedIndexes);
  // };
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
