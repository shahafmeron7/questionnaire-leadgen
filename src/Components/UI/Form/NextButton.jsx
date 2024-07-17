import React, { useEffect } from "react";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import styles from "@/components/UI/Form/NextButton.module.css";

const NextButton = () => {
  const {
    checkAndEnableNextButton,
    moveToNextQuestion,
    inputModified,
    nextBtnEnabled,
    currentQuestionCode,
    responses,
    isAnimatingOut,
    currentQuestion,
    questionnaireVariation,
  } = useQuestionnaire();
  const handleNextButtonClick = () => {
    if (!isAnimatingOut) {
      moveToNextQuestion();
    }
  };

  useEffect(() => {
    checkAndEnableNextButton();
  }, [checkAndEnableNextButton, currentQuestion, responses]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && (inputModified || nextBtnEnabled)) {
        handleNextButtonClick();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextButtonClick, inputModified, nextBtnEnabled]);
  const stepText =
    currentQuestionCode === "phone"
      ? "Get Results"
      : currentQuestionCode === "form_result"
      ? "Get a Quote"
      : "Next";
  const formStyle =
    questionnaireVariation === "B" && currentQuestionCode === "form_result"
      ? styles.formResultBtn
      : "";
  return (
    <>
      <button
        className={`${styles.nextBtn} ${
          inputModified || nextBtnEnabled ? styles.enabled : ""
        } ${formStyle}`}
        onClick={() => handleNextButtonClick()}
        disabled={isAnimatingOut || !nextBtnEnabled}
      >
        {stepText}
      </button>
    </>
  );
};

export default NextButton;
