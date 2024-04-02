import React from "react";
import  styles  from './Navbar.module.css';
import logo from '../../images/sonary_logo.svg';
import trustPilotLogo from '../../images/trustPilot.svg';
import fiveStartsLogo from '../../images/5stars.svg';

const Navbar = () => {
  return (
    <div style={{padding:"0 24px",backgroundColor:'#fff'}}>

    <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0px'}}>
      <div>
      <img src={logo} alt="Logo"  />
        </div>
      <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
      <img src={trustPilotLogo} alt="Logo"  />
      <img src={fiveStartsLogo} alt="Logo"  />
        
         </div>
    </nav>
    </div>
  );
};

export default Navbar;
