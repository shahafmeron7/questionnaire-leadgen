import React from 'react'
import styles from './ContentLayout.module.css'
const ContentLayout = ({children}) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.layoutWrapper}>
        {children}

      </div>
    </div>
  )
}

export default ContentLayout