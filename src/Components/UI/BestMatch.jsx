import React from "react";
import styles from "./BestMatch.module.css";
import expertsLogo from "../../images/best matchs/experts.svg";
import tailoredMatchesLogo from "../../images/best matchs/tailored_matches.svg";
import trustedProvidedLogo from "../../images/best matchs/trusted_providers.svg";

const BestMatch = () => {
  const cards = [
    {
      title: "Expert Insight",
      info: "Utilize our expertise to quickly and easily find the best merchant service provider for your business.",
      src: expertsLogo,
      alt: "Experts Logo",
    },
    {
      title: "Trusted Providers",
      info: "We exclusively partner with reputable merchant service providers to ensure quality and reliability.",
      src: trustedProvidedLogo,
      alt: "Trusted Providers Logo",
    },
    {
      title: "Tailored Matches",
      info: "A few questions to find the right fit for your specific business needs. No more endless searching.",
      src: tailoredMatchesLogo,
      alt: "Tailored Matches Logo",

    },
  ];
  const Card = ({card})=>{
    return (
      <div className={styles.bestMatchCard}>

        <img src={card.src} alt={card.alt} className={styles.bestMatchLogo}/>
        <div className={styles.cardInfoWrapper}>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardInfo}>{card.info}</p>
        </div>

      </div>

    )
  }
  return (
    <div className={styles.bestMatchWrapper}>
      <div className={styles.bestMatchContainer}>
        <h3 className={styles.bestMatchTitle}>
          How we find you the best match
        </h3>
        <div className={styles.bestMatchCardsContainer}>
          {cards.map((card) => (
            <Card key={card.alt} card={card}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestMatch;
