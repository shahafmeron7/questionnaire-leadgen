import React from "react";

import { useQuestionnaire } from "../../../../context/QuestionnaireContext.jsx";

const containerStyle = {
  position: "relative",
  color: "#99A5C5",
  maxWidth: "600px",
  textAlign: "justify",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "24px",
};

const linkStyle = {
  color: "#99A5C5",
};
const MiniLegalMessage = () => {
  const {currentQuestionCode} = useQuestionnaire();


  return (
    <div
        key={currentQuestionCode}
        className="animateStaggerItem animateFadeOut"
        style={containerStyle}
      >
        your information will be handled as detailed in our&#8194;
        <a
          style={linkStyle}
          href="https://sonary.com/privacy-policy/"
          target="_blank"
          rel="noreferrer"
        >
        Privacy Policy
        </a>
      </div>
 
  );
};

export default MiniLegalMessage;
