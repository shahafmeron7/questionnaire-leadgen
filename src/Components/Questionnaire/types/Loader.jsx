import React from "react";
import LoaderSVG from "../../UI/LoaderSVG";
// import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import { useQuestionnaire } from "../../../context/QuestionnaireContext/QuestionnaireContext.jsx";

import { motion, AnimatePresence } from "framer-motion";
import { defaultVariants } from "../../../animations/animations";
import styles from "../Questionnaire.module.css";
const Loader = () => {
  const { currentQuestion,currentQuestionCode } = useQuestionnaire();
  return (
    <AnimatePresence>
      <motion.div
        key={currentQuestionCode}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={defaultVariants}
        className={styles.loaderWrapper}
      >
        <LoaderSVG />
        <div style={{lineHeight:"48px"}}>
          <h1 className={styles.loaderText}>{currentQuestion.text}</h1>
          <p className={styles.loaderExtraInfoText}>
            {currentQuestion.extra_info}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
