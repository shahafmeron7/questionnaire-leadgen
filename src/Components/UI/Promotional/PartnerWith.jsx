import React from "react";
import  LeadersLogo  from "@/images/brands/LEADERS.svg";
import  PaysafeLogo  from "@/images/brands/Paysafe.svg";
import  StaxLogo  from "@/images/brands/Stax.svg";
import  CloverLogo  from "@/images/brands/Clover.svg";
import  HelcimLogo  from "@/images/brands/Helcim.svg";
import  MerchantOneLogo  from "@/images/brands/MerchantOne.svg";
import  PressPayLogo  from "@/images/brands/PressPayLogo2.svg";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import styles from './PartnerWith.module.css';
import useIsWideScreen from "@/hooks/useIsWideScreen";

const PartnerWith = () => {
  const logos = [
    { Logo: LeadersLogo, alt: "Leaders Logo" },
    { Logo: PaysafeLogo, alt: "Paysafe Logo" },
    { Logo: StaxLogo, alt: "Stax Logo" },
    { Logo: CloverLogo, alt: "Clover Logo" },
    { Logo: HelcimLogo, alt: "Helcim Logo" },
    { Logo: MerchantOneLogo, alt: "Merchant One Logo" },
    { Logo: PressPayLogo, alt: "PressPay Logo" },
  ];
const {questionnaireCompleted} = useQuestionnaire();
const {isWideScreen} = useIsWideScreen();

const finalStyle = {
  padding:"80px 0px 0px 0px",
}
const finalMobileStyle={
  padding:"40px 0px 0px",

}
  return (
    <div className={styles.partnerWithWrapper} style={questionnaireCompleted && !isWideScreen ? finalMobileStyle : questionnaireCompleted && isWideScreen ?  finalStyle:{}}>
      <div className={styles.partnerWithContainer}>
        <h2 className={styles.partnerWithTitle}>We proudly partner with</h2>
        <div className={styles.partnerWithDivider}></div>
        <div className={styles.partnerWithBrandsContainer}>
          {logos.map((logo, index) => (
            <div key={index} className={styles.partnerWithLogo}>
              <logo.Logo aria-label={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default PartnerWith;
