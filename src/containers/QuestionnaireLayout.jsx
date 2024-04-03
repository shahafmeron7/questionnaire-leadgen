import React from "react";
import styles from './QuestionnaireLayout.module.css'
const QuestionnaireLayout = ({ children }) => {
  return (
    <div className={styles.questionnaireLayout}>
      <div className={styles.questionnaireWrapper}>{children}</div>
    </div>
  );
};


export default QuestionnaireLayout;
