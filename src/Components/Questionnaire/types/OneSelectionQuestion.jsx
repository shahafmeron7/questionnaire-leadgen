import React, { useState, useEffect,useRef } from "react";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import styles from "./AnswersContent.module.css";
import {ReactComponent as UnselectedCheckboxSVG} from "../../../images/unselectedCircleCheckbox.svg";
import {ReactComponent as SelectedCheckboxSVG} from "../../../images/selectedCircleCheckbox.svg"
import { motion,AnimatePresence } from 'framer-motion';

import InputWithValidation from "../../UI/InputWithValidation";
import { slideUpListVariant } from "../../../animations/animations";

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
      timer = setTimeout(() => {
        handleAnswerSelection(
          currentQuestion.code,
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
              <AnimatePresence>

        {currentQuestion.answers.map((answer, index) => (
          <motion.div
            key={`${currentQuestion.code}-${index}`}
            className={`${styles.answerItem} ${
              index === localSelectedIndex ? styles.selected : ""
            } ${
              isDisplayDirectionCol
                ? styles.answerRowItem
                : styles.answerCardItem
            }  `}
            custom={index}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={slideUpListVariant}
            onClick={() => handleClick(index)}
          >
            <span>{answer.text}</span>
        { index === localSelectedIndex
                  ? (<SelectedCheckboxSVG/>)
                  : (<UnselectedCheckboxSVG/>)}
           
          </motion.div>
        ))}
              </AnimatePresence>

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
