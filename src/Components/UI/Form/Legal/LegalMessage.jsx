import React, { useEffect, useRef } from "react";

// import { useQuestionnaire } from "../../context/QuestionnaireContext";
import { useQuestionnaire } from "../../../../context/QuestionnaireContext.jsx";

const legalStyle = {
  position: "relative",
  cursor: " pointer",
  textDecoration: "underline",
};
const ulStyle = {
  padding: "0",
  listStyleType: "none",
  margin: "16px 0px",
};
const containerStyle = {
  // visibility: "hidden",
  position: "relative",
  color: "#99A5C5",
  maxWidth: "600px",
  textAlign: "justify",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "24px",
};
const brandBoxStyle = {
  boxShadow:
    "rgba(0, 0, 0, 0.08) 0px 10px 36px 0px, rgba(0, 0, 0, 0.03) 0px 0px 0px 1px",
  position: "absolute",
  zIndex: 1000000,
  border: "none",
  borderTopRightRadius: "8px",
  borderTopLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  borderBottomLeftRadius: "2px",
  bottom: "100%",
  color: "black",
  listStyleType: "none",
  fontSize: "12px",
  background: "white",
  visibility: "hidden",
  cursor: "pointer",
  opacity: 0,
  padding: "0px 16px",
  transition: "opacity 1s ease-in-out",
};
const linkStyle = {
  color: "#99A5C5",
};
const LegalMessage = () => {
  const {currentQuestionCode} = useQuestionnaire();
  const popupRef = useRef(null);
  const brandsBoxRef = useRef(null);

  useEffect(() => {
    const showBrandsBox = () => {
      const brandsBox = brandsBoxRef.current;
      brandsBox.style.visibility = "visible";
      brandsBox.style.opacity = "1";
      const { width, right } = popupRef.current.getBoundingClientRect();
      let windowWidth = window.innerWidth;

      if (width + right >= windowWidth) {
        brandsBox.style.left = "-100%";
        brandsBox.style.right = "auto";
      } else {
        brandsBox.style.left = "100%";
        brandsBox.style.right = "auto";
      }
    };

    const hideBrandsBox = () => {
      const brandsBox = brandsBoxRef.current;
      brandsBox.style.visibility = "hidden";
      brandsBox.style.opacity = "0";
    };

    const popup = popupRef.current;
    if (popup) {
      popup.addEventListener("mouseover", showBrandsBox);
      popup.addEventListener("mouseout", hideBrandsBox);
    }

    // Clean up
    return () => {
      if (popup) {
        popup.removeEventListener("mouseover", showBrandsBox);
        popup.removeEventListener("mouseout", hideBrandsBox);
      }
    };
  }, []);
  return (
    <div
        key={currentQuestionCode}
        className="animateStaggerItem animateFadeOut"
        style={containerStyle}
      >
        By submitting this form, you provide us your consent to share your
        details with the&#8194;
        <u style={legalStyle} ref={popupRef}>
          2 suppliers
          <div style={brandBoxStyle} ref={brandsBoxRef}>
            <ul style={ulStyle}>
              <li>PaySafe</li>
              <li>Stax</li>
            </ul>
          </div>
        </u>
        .&#8194;Featured on this site, that may call you and send you quotes and
        offers, including by automated means and text messages (even if your
        number is on any federal, state, or other "Do not call" list). Your
        consent is not a condition of purchase. You further agree to our&#8194;
        <a
          style={linkStyle}
          href="https://sonary.com/terms-of-use/"
          target="_blank"
          rel="noreferrer"
        >
          Terms of Use
        </a>
        . We will process your information as detailed in our&#8194;
        <a
          style={linkStyle}
          href="https://sonary.com/privacy-policy/"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        , however, once the information will be shared, it will be subject to
        the applicable supplier’s policies and marketing practice, which we do
        not monitor nor control`
      </div>
 
  );
};

export default LegalMessage;
