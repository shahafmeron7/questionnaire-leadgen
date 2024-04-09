import React from "react";
import  styles  from './Navbar.module.css';
import logo from '../../images/sonary_logo.svg';
import trustPilotLogo from '../../images/trustPilot.svg';
import fiveStartsLogo from '../../images/5stars.svg';

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>

    <nav className={styles.navbar}>
      <div>
      <img src={logo} alt="Logo"  />
        </div>
      <div className={styles.logosWrapper}>
      <img src={trustPilotLogo} alt="Logo"  />
      <img src={fiveStartsLogo} alt="Logo"  />
        
         </div>
    </nav>
    </div>
  );
};

export default Navbar;
