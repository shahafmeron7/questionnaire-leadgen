import React, { useState, useEffect } from "react";
import styles from "./AnswersContent.module.css";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import InputWithValidation from "../../UI/InputWithValidation";
import { motion, AnimatePresence } from "framer-motion";
import { slideUpBoxVariant } from "../../../animations/animations";
import useIsWideScreen from "../../../custom hooks/useIsWideScreen";

const DetailsQuestion = React.forwardRef((props,ref) => {
  const { currentQuestion, responses, errResponses, currentQuestionCode } =
    useQuestionnaire();
  const isWideScreen = useIsWideScreen();
    const isFinalStep = currentQuestionCode === "phone";

  const isPersonalAndBusinessInfo =
    currentQuestionCode === "personal_and_business_info";
  const FinalStepTitle = ({ text }) => {
    return (
      <div className={styles.finalStepTitleWrapper}>
        <h1 className={styles.finalStepTitle}>Final Step</h1>
        <h4 className={styles.inputTitle}>{text}</h4>
      </div>
    );
  };
 
  return (
    <div
      className={`${styles.inputsContainer} ${
        isPersonalAndBusinessInfo && isWideScreen ? styles.specialLayout : ""
      }`}
    >
      {/* <AnimatePresence> */}
      {currentQuestion.subquestions.map((sub, index) => (
          // <motion.div
          //   custom={index} // Pass the index as a custom prop to the motion component
          //   initial="initial"
          //   animate="animate"
          //   exit="exit"
          //   variants={slideUpBoxVariant}
          <div
            key={`${sub.code}-${index}`}
            className={`${styles.inputWrapper} ${
              isPersonalAndBusinessInfo && isWideScreen && index < 2
                ? styles.rowChild
                : ""
            }`}
          >
            {isFinalStep ? (
              <FinalStepTitle text={sub.text} />
            ) : (
              <h4 className={styles.inputTitle}>{sub.text}</h4>
            )}

            <InputWithValidation
              type="text"
              name={sub.code}
              value={responses[sub.code] || ""}
              placeholder={sub.example}
              errorMessage={sub.error}
              isError={errResponses[sub.code] || false}
            />
            </div>
      ))}
      {/* </AnimatePresence> */}
    </div>
  );
});

export default DetailsQuestion;
