import React from 'react'
import styles from './BestMatch.module.css'
const BestMatch = () => {
  return (
    <div className={styles.bestMatchWrapper}>
      <div className={styles.bestMatchContainer}>
        <h3 className={styles.bestMatchTitle}>
          How we find you the best match
        </h3>
        <div className={styles.bestMatchCardsContainer}>
          <div>Expert Insight</div>
          <div>Expert Insight</div>
          <div>Expert Insight</div>
        </div>
      </div>
    </div>
  )
}

export default BestMatch