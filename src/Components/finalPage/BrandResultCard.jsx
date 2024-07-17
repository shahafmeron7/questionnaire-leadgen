import React from "react";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import { brandInfo } from "@/utils/data/brandInfo";
import styles from './BrandResultCard.module.css'
const prosIcon =
  "https://assets.sonary.com/wp-content/uploads/2024/01/18084718/Icon-Name.svg";
const BrandResultCard = () => {
  const { formBrand } = useQuestionnaire();
  console.log(brandInfo);
  console.log(formBrand);
  console.log(brandInfo[formBrand]);


  const { sellingLines, imgSrc, imgAlt } = brandInfo[formBrand];
  return (
    <div className={styles.brandCard}>
      <img src={imgSrc} alt={imgAlt} width="294" height="58" />
      <ul className={styles.sellingList}>
        {sellingLines.length > 0 &&
          sellingLines.map((line, index) => (
            <li key={`${line}-${index}`}  className={styles.sellingLine}>
            <img
                      src={prosIcon}
                      alt={`Checkmark Icon`}
                      className={styles.prosIcon}
                      loading="lazy"

                    />
                    <p>{line}</p>
          
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BrandResultCard;
