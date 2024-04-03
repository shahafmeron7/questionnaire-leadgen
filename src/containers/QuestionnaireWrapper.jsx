import React from "react";
import styles from './QuestionnaireLayout.module.css'
const QuestionnaireWrapper = ({ children }) => {
  return <div className={styles.questionnaireContentWrapper}>{children}</div>;
};

export default QuestionnaireWrapper;
