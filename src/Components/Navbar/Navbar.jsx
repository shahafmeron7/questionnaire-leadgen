import React from "react";
import  styles  from './Navbar.module.css';
import logo from "@/images/sonary_logo.svg?url";
import trustPilotLogo from "@/images/trustPilot.svg?url";
import fiveStartsLogo from "@/images/5stars.svg?url";

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>

    <nav className={styles.navbar}>
      <div>
      <img src={logo} alt="Logo" width="113" height="32" />
        </div>
      <div className={styles.logosWrapper}>
      <img src={trustPilotLogo} alt="Logo" width="141" height="34" />
      <img src={fiveStartsLogo} alt="Logo" width="149" height="28"/>
        
         </div>
    </nav>
    </div>
  );
};

export default Navbar;
