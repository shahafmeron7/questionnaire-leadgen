import React from 'react'
import styles from '@/components/Questionnaire/Questionnaire.module.css'
import { useQuestionnaire } from "@/context/QuestionnaireContext";
const QuestionnaireTitle = () => {
    const {currentQuestionCode} = useQuestionnaire();
    return (
      <div key={currentQuestionCode} className={`${styles.titleWrapper}`}>
      <h1 className={styles.title}>Find the right merchant service provider</h1>
      <h2 className={styles.titleDescription}>Just a few questions to find your match</h2>
    </div>
    );
  };

export default QuestionnaireTitle