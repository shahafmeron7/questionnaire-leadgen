import React from "react";
import styles from "./HearBack.module.css";

const HearBack = () => {
  
  return (
    <div className={styles.container}>
      <h2 className={styles.titleSection}>
        What if I don’t hear back from a provider?
      </h2>
      <div className={styles.infoContainer}>
        <div className={styles.infoTop}>
          <h3 className={styles.infoTitle}>
            There are a few reasons that you may not hear back from a brand.
          </h3>

          <div className={styles.infoItem}>
            <div>•</div>
            <p>
              The information you provided us with does not meet the criteria
              for the provider’s services. We apologize but encourage you to
              always check again.
            </p>
          </div>
          <div className={styles.infoItem}>
            <div>•</div>

            <p>
              There is something wrong with the contact details you provided.
              Please try completing the form again with the correct information.
              Perhaps you were missing a digit in your phone number? 
            </p>
          </div>
        </div>
        <div className={styles.infoBottom}>

          <p>We’re happy to provide you with our services. We’ll email
                      you here and there to keep you updated on relevant
                      services. If you’re not interested, you can unsubscribe at
                      any time through the emails we will send you or contact us
                      directly at:&#8194;
                      <a href="mailto:service@sonary.com" target="_blank" rel="noopener noreferrer">service@sonary.com</a>.
                    </p>
        </div>
      </div>
    </div>
  );
};

export default HearBack;
