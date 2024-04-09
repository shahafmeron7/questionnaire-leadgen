import React from "react";
import LeadersLogo from "../../images/brands/LEADERS.svg";
import PaysafeLogo from "../../images/brands/Paysafe.svg";
import StaxLogo from "../../images/brands/Stax.svg";
import CloverLogo from "../../images/brands/Clover.svg";
import HelcimLogo from "../../images/brands/Helcim.svg";
import MerchantOneLogo from "../../images/brands/MerchantOne.svg";
import PressPayLogo from "../../images/brands/PressPay.svg";
import styles from './PartnerWith.module.css';

const PartnerWith = () => {
  const logos = [
    { src: LeadersLogo, alt: "Leaders Logo" },
    { src: PaysafeLogo, alt: "Paysafe Logo" },
    { src: StaxLogo, alt: "Stax Logo" },
    { src: CloverLogo, alt: "Clover Logo" },
    { src: HelcimLogo, alt: "Helcim Logo" },
    { src: MerchantOneLogo, alt: "Merchant One Logo" },
    { src: PressPayLogo, alt: "PressPay Logo" },
  ];

  return (
    <div className={styles.partnerWithWrapper}>
      <div className={styles.partnerWithContainer}>
        <h2 className={styles.partnerWithTitle}>We proudly partner with</h2>
        <div className={styles.partnerWithDivider}></div>
        <div className={styles.partnerWithBrandsContainer}>
          {logos.map((logo) => (
            <img key={logo.alt} src={logo.src} alt={logo.alt} className={styles.partnerWithLogo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerWith;
