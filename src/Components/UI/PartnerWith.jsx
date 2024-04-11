import React from "react";
import { ReactComponent as LeadersLogo } from "../../images/brands/LEADERS.svg";
import { ReactComponent as PaysafeLogo } from "../../images/brands/Paysafe.svg";
import { ReactComponent as StaxLogo } from "../../images/brands/Stax.svg";
import { ReactComponent as CloverLogo } from "../../images/brands/Clover.svg";
import { ReactComponent as HelcimLogo } from "../../images/brands/Helcim.svg";
import { ReactComponent as MerchantOneLogo } from "../../images/brands/MerchantOne.svg";
import { ReactComponent as PressPayLogo } from "../../images/brands/PressPay.svg";
import styles from './PartnerWith.module.css';

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

  return (
    <div className={styles.partnerWithWrapper}>
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
