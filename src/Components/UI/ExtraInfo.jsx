import React from 'react'
import {useQuestionnaire} from '../../context/QuestionnaireContext';
import styles from './ExtraInfo.module.css'

const ExtraInfo = () => {
    const {currentQuestion} = useQuestionnaire();
  return (
    <div className={styles.extraInfoContainer}>{currentQuestion.extra_info}</div>
  )
}

export default ExtraInfo