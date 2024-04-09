import React, { useState, useEffect,useRef } from "react";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import styles from "./AnswersContent.module.css";
import exitStyle from "../Questionnaire.module.css";

import InputWithValidation from "../../UI/InputWithValidation";
const selectedCheckboxSVG =
  "https://assets.sonary.com/wp-content/uploads/2023/12/27112431/Selector-1.svg";
const unselectedCheckboxSVG =
  "https://assets.sonary.com/wp-content/uploads/2023/12/27112433/Selector.svg";

const OneSelectionQuestion = () => {
  const {
    currentQuestion,
    responses,
    handleAnswerSelection,
    toggleNextButtonFunctionality,
    changeNextBtnState,
  } = useQuestionnaire();
  const otherInputRef = useRef(null);
  const [localSelectedIndex, setLocalSelectedIndex] = useState(
    responses[currentQuestion.code]
  );

  const [delayNextQuestion, setDelayNextQuestion] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const [applyExitAnimation, setApplyExitAnimation] = useState(false);

  const isDisplayDirectionCol = currentQuestion.display_list_direction === "col";
  useEffect(() => {
    const response = responses[currentQuestion.code];

    if (response !== undefined) {
      if (
        typeof response === "object" &&
        response.hasOwnProperty("otherValue")
      ) {
        setIsOtherSelected(true);
        changeNextBtnState(true);

        setOtherInputValue(response.otherValue);

        const otherIndex = currentQuestion.answers.findIndex(
          (answer) => answer.isOther
        );
        setLocalSelectedIndex(otherIndex);
        focusAndScrollIntoView();
      } else {
        setIsOtherSelected(false);
        setLocalSelectedIndex(response);
      }
    } else {
      setIsOtherSelected(false);
      setLocalSelectedIndex(undefined);
      setOtherInputValue("");
    }
  }, [currentQuestion, responses]);

  useEffect(() => {
    let timer;
    if (delayNextQuestion && !isOtherSelected) {
        changeNextBtnState(true);
        toggleNextButtonFunctionality(true); 
        setApplyExitAnimation(true); 
      timer = setTimeout(() => {
        handleAnswerSelection(
          currentQuestion.code,
          localSelectedIndex,
          otherInputValue,
          isOtherSelected
        );
        setDelayNextQuestion(false);
        setApplyExitAnimation(false);
        changeNextBtnState(false);
        toggleNextButtonFunctionality(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [
    delayNextQuestion,
    localSelectedIndex,
    currentQuestion.code,
    handleAnswerSelection,
    isOtherSelected,
    otherInputValue,
    toggleNextButtonFunctionality,
    changeNextBtnState
  ]);
  const focusAndScrollIntoView = () => {
    setTimeout(() => {
        if (otherInputRef.current) {
            otherInputRef.current.focus();
            otherInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 0);
};
  const handleClick = (index) => {
    if (delayNextQuestion) return;

    const selectedAnswer = currentQuestion.answers[index];
    if (!selectedAnswer.isOther) {
      changeNextBtnState(true);
      setDelayNextQuestion(true);
    } else {
      changeNextBtnState(false);
      focusAndScrollIntoView();
    }
    setLocalSelectedIndex(index);
    setIsOtherSelected(selectedAnswer.isOther); // Set true if the selected answer has "isOther": true
  };

  return (
    <>
      <div
        className={`${styles.answersContainer} ${
          isDisplayDirectionCol ? styles.listCol : styles.listRow
        }`}
      >
        {currentQuestion.answers.map((answer, index) => (
          <div
            key={`${currentQuestion.code}-${index}`}
            className={`${styles.answerItem} ${
              index === localSelectedIndex ? styles.selected : ""
            } ${
              isDisplayDirectionCol
                ? styles.answerRowItem
                : styles.answerCardItem
            } ${styles.slideUpEntranceList}  `}
            // ${applyExitAnimation ? `${styles.exitFadeOut}`:''}
            onClick={() => handleClick(index)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span>{answer.text}</span>
            <img
              className={styles.checkboxSvg}
              src={
                index === localSelectedIndex
                  ? selectedCheckboxSVG
                  : unselectedCheckboxSVG
              }
              alt="Checkbox"
            />
          </div>
        ))}
      </div>
      {isOtherSelected && (
        <InputWithValidation
          ref={otherInputRef}
          type="text"
          name={currentQuestion.code}
          value={otherInputValue}
          placeholder="Please specify"
          isOther={true}
        />
      )}
    </>
  );
};
export default OneSelectionQuestion;
