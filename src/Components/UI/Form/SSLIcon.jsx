import React from "react";

import  SSLLogo  from '@/images/ssl_lock.svg'
import { useQuestionnaire } from "@/context/QuestionnaireContext";
const SSLIcon = () => {
  const {currentQuestionCode} = useQuestionnaire()
  const formVariationBQuestion = currentQuestionCode ==="form_result"
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
    
    return (
      <div
      className={`${!formVariationBQuestion ? "animateStaggerItem animateFadeOut":""}`}
          key={currentQuestionCode} 
          style={stylesslWrapper}
        >
          <SSLLogo />
          <p style={psslWrapper}>SSL Encrypted</p>
        </div>
     
    );
  };

  export default SSLIcon;