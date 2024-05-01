import React from "react";
import styles from "./BestMatch.module.css";
import { ReactComponent as ExpertsLogo } from "images/best matchs/experts.svg";
import { ReactComponent as TailoredMatchesLogo } from "images/best matchs/tailored_matches.svg";
import { ReactComponent as TrustedProvidedLogo } from "images/best matchs/trusted_providers.svg";
const BestMatch = () => {
  const cards = [
    {
      title: "Expert Insight",
      info: "Utilize our expertise to quickly and easily find the merchant service provider for your business.",
      Logo: ExpertsLogo,
      alt: "Experts Logo",
    },
    {
      title: "Trusted Providers",
      info: "We partner with trusted merchant service providers to ensure quality and reliability.",
      Logo: TrustedProvidedLogo,
      alt: "Trusted Providers Logo",
    },
    {
      title: "Tailored Matches",
      info: "A few questions to find the right fit for your specific business needs. No more endless searching.",
      Logo: TailoredMatchesLogo,
      alt: "Tailored Matches Logo",
    },
  ];

  const Card = ({ card }) => {
    return (
      <div className={styles.bestMatchCard}>
        <card.Logo className={styles.bestMatchLogo} aria-label={card.alt} /> {/* Render SVG component */}
        <div className={styles.cardInfoWrapper}>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardInfo}>{card.info}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.bestMatchWrapper}>
      <div className={styles.bestMatchContainer}>
        <h3 className={styles.bestMatchTitle}>How we find you a match</h3>
        <div className={styles.bestMatchCardsContainer}>
          {cards.map((card) => (
            <Card key={card.alt} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestMatch;
