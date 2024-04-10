import React from 'react'
import styles from './ContentLayout.module.css'
const ContentLayout = ({children,bgColor}) => {
  return (
    <div className={styles.layoutContainer} style={{backgroundColor:bgColor}}>
      <div className={styles.layoutWrapper}>
        {children}

      </div>
    </div>
  )
}

export default ContentLayout