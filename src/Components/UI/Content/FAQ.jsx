import React from 'react'
import styles from './FAQ.module.css'
const FAQ = () => {
  const faqItems = [
    {
        text: "Why it is important to compare brands?",
        details: "Comparing merchant service providers is key in finding the right one for your business needs. It ensures you get the most cost-effective and suitable option with the right features and services.",
    },
    {
      text: "How long does it take to hear from the provider(s) once I submit my information?",
      details: "Once you submit your request, our system will process your responses to find you the best provider. You can expect to hear from them shortly after. The exact timing may vary based on your location, needs and availability of the providers.",
  },
  {
    text: "Is there an associated fee or cost for using this service?",
    details: "No, our service is free for businesses like yours. You can use our questionnaire to receive matches at no cost.",
},
  ]
  const FaqItem = ({item})=>{
    return(
            <details className={styles.faqItem}>
              <summary>
                <h3>{item.text}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M14 12L9 7L4 12" stroke="#313131" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>

              </summary>
              <p>
                {item.details}
              </p>
            </details>
    )
  }
  return (
    <div className={styles.faqWrapper}>
      <div className={styles.faqContainer}>
      <h2>FAQ</h2>
      <div className={styles.faqItemsContainer}>

      {faqItems.map((item,index)=>(
        <FaqItem key={index} item={item}/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ