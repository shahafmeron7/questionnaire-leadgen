import React from 'react'
import styles from './ProgressBar.module.css'
// // import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { useQuestionnaire } from '../../context/QuestionnaireContext.jsx';
const ProgressBar = () => {
  const {progressBarWidth,} = useQuestionnaire();
  const progressBarStyle = {
    width: `${progressBarWidth}%`,
    height: '6px',
    borderRadius: '8px',
    backgroundColor: 'var(--blue-color-1)',
    transition: 'width 0.2s linear 0s'
  };
  return (
    <div  className={`${styles.progressContainer}`}>
      <div className={styles.progressWrapper}>
        <div className={styles.progressInfo}>Progress: {progressBarWidth}%</div>
        <div className={styles.lineWrapper}>
          <div  className={`progressLine ${styles.lineContainer}`} style={progressBarStyle}>

          </div>
        </div>
      </div>
    </div>
  )
};

export default ProgressBar