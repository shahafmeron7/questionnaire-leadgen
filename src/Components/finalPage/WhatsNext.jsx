import React from 'react'
import styles from './WhatsNext.module.css'
import phoneIcon from '../../images/thank you/phone.svg'
import discussionIcon from '../../images/thank you/discussion.svg'
import handsIcon from '../../images/thank you/hands.svg'

const WhatsNext = () => {
    const cards = [
        {
          title: "Wait for a call from the relevant provider(s)",
          info: "Please expect a call from the provider (or providers) we matched you with shortly. You are even likely to hear back from them within one business day! The number of providers will depend on your business requirements and our matching process but can be 1-3.",
          src: phoneIcon,
          bolds:["within one business day!","1-3"],
          alt: "Phone icon",
        },
        {
          title: "Discuss your business needs",
          info: "Once the provider calls you, this is your chance to ask any questions about the services. See if the provider is right for you and your specific needs. You’ll also be able to receive a pricing quote to see which plans are available. Speaking to a representative in person is always more efficient than finding what you need.",
          src: discussionIcon,

          bolds:["ask any questions","receive a pricing quote","plans are available.","Speaking to a representative in person"],

          alt: "Dicussion icon",
        },
        {
          title: "Count on us",
          info: "We're here for you if you need anything throughout the process. Feel free to email us with any questions or concerns at service@sonary.com, and we'll get back to you as soon as possible.",
          src: handsIcon,
          bolds:[],

          alt: "Hands icon",
    
        },
      ];
      const Card = ({ card }) => {
        const renderInfoTextWithBolds = (info, bolds) => {
          let modifiedText = info;
      
          // Replace bold words with markers that will not be affected by the split operation
          bolds.forEach((boldWord, index) => {
            const marker = `@@${index}@@`;
            modifiedText = modifiedText.replace(boldWord, marker);
          });
      
          // Split text by spaces, but keep markers intact
          const parts = modifiedText.split(/(\s+|@@\d+@@)/).filter(part => part);
      
          // Replace markers with bold words and return array of strings and JSX elements
          return parts.map((part, index) => {
            const match = part.match(/^@@(\d+)@@$/);
            if (match) {
              const boldIndex = parseInt(match[1], 10);
              return <strong key={index}>{bolds[boldIndex]}</strong>;
            }
            return part;
          });
        };
      
        return (
          <div className={styles.card}>
            <img src={card.src} alt={card.alt} className={styles.cardIcon} />
            <div className={styles.cardInfoWrapper}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardInfo}>
                { card.bolds.length>1 ? renderInfoTextWithBolds(card.info, card.bolds) : card.info}
              </p>
            </div>
          </div>
        );
      };
  return (
    <div className={styles.container}>
        <h2 className={styles.titleSection}>What's next?</h2>

        <div className={styles.cardsContainer}>
            {cards.map((card,index)=>(
                <Card key={index} card={card}/>
            ))}
        </div>
        
    </div>
  )
}

export default WhatsNext