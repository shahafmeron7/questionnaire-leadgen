import React from "react";
import {motion,AnimatePresence} from 'framer-motion'
import { defaultVariants } from "../../animations/animations";

import { ReactComponent as SSLLogo } from '../../images/ssl_lock.svg'
import { useQuestionnaire } from "../../context/QuestionnaireContext";
const SSLIcon = () => {
    const stylesslWrapper = {
        display: "flex",
        gap: "4px",
        justifyContent: "center",
        alignItems: "center",
      
      }
      const psslWrapper = {
        color: "var(--border-border-100)",
        fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "22px",
        textDecoration: "underline",
      }
    const {currentQuestionCode} = useQuestionnaire
    return (
      <AnimatePresence>
        <motion.div
          key={currentQuestionCode}
          initial="initial"
          animate="enter"
          exit="exit"
          style={stylesslWrapper}
          variants={defaultVariants}
        >
          <SSLLogo />
          <p style={psslWrapper}>SSL Encrypted</p>
        </motion.div>
      </AnimatePresence>
    );
  };

  export default SSLIcon;