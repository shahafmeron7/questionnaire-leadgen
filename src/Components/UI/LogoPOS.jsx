import React from "react"
import styles from './LogoPOS.module.css'
const LogoPOS = ()=>{
    return (
      <div className={styles.logoPosContainer}>
        <div className={styles.logoPosWrapper}>
        <img src="https://assets.sonary.com/wp-content/uploads/2024/01/04101538/new.svg" width="91" height="39"/>
          <p className={styles.logoPosTitle}>We found you the best POS provider</p>
          <span className={styles.logoPosTitleDesc}>You're almost there! Just a few last details.</span>
        </div>
      </div>
    )
  }

  export default LogoPOS