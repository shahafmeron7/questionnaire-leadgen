import React from "react";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import { brandInfo } from "@/utils/data/brandInfo";
import styles from './BrandResultCard.module.css'
import prosIcon from '@/images/bluecheckmark.svg?url'
const BrandResultCard = () => {
  const { formBrand } = useQuestionnaire();



  const { sellingLines, imgSrc, imgAlt } = brandInfo[formBrand];
  return (
    <div className={styles.brandCard}>
      <img className={styles.brandLogo} src={imgSrc} alt={imgAlt} width="294" height="58" />
      <ul className={styles.sellingList}>
        {sellingLines.length > 0 &&
          sellingLines.map((line, index) => (
            <li key={`${line}-${index}`}  className={styles.sellingLine}>
            <img
                      src={prosIcon}
                      alt={`Checkmark Icon`}
                      className={styles.prosIcon}
                      loading="lazy"
                      width="28"
                      height="28"

                    />
                    <p>{line}</p>
          
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BrandResultCard;
