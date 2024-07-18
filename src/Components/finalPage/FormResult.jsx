import React from 'react'
import styles from './FormResult.module.css'

import BrandResultCard from './BrandResultCard'
import LegalMessage from '../UI/Form/Legal/LegalMessage'
import Form from './Form'
import useIsWideScreen from "@/hooks/useIsWideScreen";

const FormResult = () => {
   const {isWideScreen,isTabletScreen} = useIsWideScreen();

  return (
    <div className={styles.formResultContainer}>

      <div className={styles.formResultLeft}>
         <h3>According to your answers, our<br/>recommendation is:</h3>
         <BrandResultCard/>
         {isTabletScreen && <LegalMessage/>}
      </div>
      <div className={styles.formResultRight}>
         <Form/>
      </div>
      {!isTabletScreen && <LegalMessage/>}

    </div>
  )
}

export default FormResult