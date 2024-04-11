import React from "react";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import styles from "./ExtraInfo.module.css";
import {motion,AnimatePresence} from 'framer-motion'
import { defaultVariants } from "../../animations/animations";
const ExtraInfo = () => {
  const { currentQuestionCode,currentQuestion } = useQuestionnaire();
  return (
    <AnimatePresence>
            <motion.div
              key={currentQuestionCode}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={defaultVariants}
             className={styles.extraInfoContainer}>
      {currentQuestion.extra_info}
      </motion.div>
      </AnimatePresence>

  );
};

export default ExtraInfo;
