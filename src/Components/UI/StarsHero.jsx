import React from "react"
import styles from './StarsHero.module.css'
// import { useQuestionnaire } from "../../context/QuestionnaireContext"
import { useQuestionnaire } from "../../context/QuestionnaireContext.jsx";

const StarsHero = ()=>{
const {currentQuestionCode} = useQuestionnaire();
  return (
      <div key={currentQuestionCode} className={`animateStaggerItem animateFadeOut ${styles.logoPosContainer}`}>
        <div className={styles.logoPosWrapper}>
        <img src="https://assets.sonary.com/wp-content/uploads/2024/01/04101538/new.svg" width="91" height="39" alt="logo MS"/>
          <p className={styles.logoPosTitle}>We found you the best merchant services provider!</p>
          <span className={styles.logoPosTitleDesc}>You're almost there! Just a few last details.</span>
        </div>
      </div>
    )
  }

  export default StarsHero