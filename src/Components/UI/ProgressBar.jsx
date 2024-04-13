import React,{useEffect,useState} from 'react'
import styles from './ProgressBar.module.css'
import { useQuestionnaire } from '../../context/QuestionnaireContext';
const ProgressBar = React.forwardRef((props,ref) => {
  const {currentQuestion,currentQuestionCode} = useQuestionnaire();
  const progressText = Math.round(((currentQuestion.step - 1) / (4 - 1)) * 100)
  // transition:"width 0.2s linear 0s"}
  // style={{width:`${progressWidth}%`}
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressWrapper}>
        <div className={styles.progressInfo}>Progress: {progressText}%</div>
        <div className={styles.lineWrapper}>
          <div className={styles.lineContainer} ref={ref}>

          </div>
        </div>
      </div>
    </div>
  )
})

export default ProgressBar