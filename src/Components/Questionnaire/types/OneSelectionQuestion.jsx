import React, { useState, useEffect, useRef } from "react";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import styles from "./AnswersContent.module.css";
import { ReactComponent as UnselectedCheckboxSVG } from "../../../images/unselectedCircleCheckbox.svg";
import { ReactComponent as SelectedCheckboxSVG } from "../../../images/selectedCircleCheckbox.svg";

import InputWithValidation from "../../UI/InputWithValidation";

const OneSelectionQuestion = React.forwardRef((props, ref) => {
  const {
    currentQuestion,
    responses,
    handleAnswerSelection,
    toggleNextButtonFunctionality,
    changeNextBtnState,
    currentQuestionCode,
  } = useQuestionnaire();
  const otherInputRef = useRef(null);
  const [localSelectedIndex, setLocalSelectedIndex] = useState(
    responses[currentQuestionCode]?.answerIndexes?.[0] || undefined
  );

  const [delayNextQuestion, setDelayNextQuestion] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");

  const isDisplayDirectionCol =
    currentQuestion.display_list_direction === "col";
  useEffect(() => {
    const response = responses[currentQuestionCode];
    if (!response){
      setIsOtherSelected(false);
      setLocalSelectedIndex(undefined);
      setOtherInputValue("");
      return;
    } 

    if (response.hasOwnProperty("other_text")) {
   
      setIsOtherSelected(true);
      // changeNextBtnState(true);
      setOtherInputValue(response.other_text);
      focusAndScrollIntoView();
    } else {
      setIsOtherSelected(false);
      setOtherInputValue("");
    }
    setLocalSelectedIndex(response.answerIndexes[0])

  }, [currentQuestion,responses]);

  useEffect(() => {
    let timer;
    if (delayNextQuestion && !isOtherSelected) {
      changeNextBtnState(true);
      toggleNextButtonFunctionality(true);
      timer = setTimeout(() => {
        handleAnswerSelection(
          currentQuestionCode,
          localSelectedIndex,
          otherInputValue,
          isOtherSelected
        );
        setDelayNextQuestion(false);
        changeNextBtnState(false);
        toggleNextButtonFunctionality(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [
    delayNextQuestion,
    localSelectedIndex,
    currentQuestionCode,
    handleAnswerSelection,
    isOtherSelected,
    otherInputValue,
    toggleNextButtonFunctionality,
    changeNextBtnState,
  ]);
  const focusAndScrollIntoView = () => {
    setTimeout(() => {
      if (otherInputRef.current) {
        otherInputRef.current.focus();
        otherInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
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
        ref={ref}
        key={currentQuestionCode}
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
            }  `}
            onClick={() => handleClick(index)}
          >
            <span>{answer.text}</span>
            {index === localSelectedIndex ? (
              <SelectedCheckboxSVG />
            ) : (
              <UnselectedCheckboxSVG />
            )}
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
});
export default OneSelectionQuestion;
