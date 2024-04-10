import React from "react";
import styles from "./ThankYou.module.css";
import trophyIcon from "../../../../images/thank you/Trophy.svg";
const ThankYou = () => {
  return (
    <div className={styles.thankYouContainer}>
      <img src={trophyIcon} alt="trophy icon" />
      <div className={styles.titleWrapper}>
        <h1 className={styles.thankYouTitle}>Thank You!</h1>
        <p className={styles.thankYouDesc}>
          Based on the information you provided us with, we found you the best
          merchant services provider for your needs.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
