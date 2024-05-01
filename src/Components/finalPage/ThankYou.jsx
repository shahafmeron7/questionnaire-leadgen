import React from "react";
import styles from "./ThankYou.module.css";
import { ReactComponent as TrohpyIcon } from "../../images/thank you/Trophy.svg";
const ThankYou = () => {
  return (
    <div className={styles.thankYouContainer}>
      <TrohpyIcon aria-label={"Trophy Icon"}/>
      <div className={styles.titleWrapper}>
        <h1 className={styles.thankYouTitle}>Thank You!</h1>
        <p className={styles.thankYouDesc}>
          Based on the information you provided us with, we found you a
          merchant service provider match for your needs.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
