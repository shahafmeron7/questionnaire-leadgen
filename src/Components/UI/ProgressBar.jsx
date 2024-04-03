import React from 'react'
import styles from './ProgressBar.module.css'
const ProgressBar = ({width}) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressWrapper}>
        <div className={styles.progressInfo}>Progress: {width}%</div>
        <div className={styles.lineWrapper}>
          <div className={styles.lineContainer} style={{width:`${width}%`,transition:"width 0.2s linear 0s"}}>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar