import React, { useState,useRef, useEffect } from "react";
import styles from "./InputWithValidation.module.css";
// import { useQuestionnaire } from "../../context/QuestionnaireContext";
import { useQuestionnaire } from "../../../context/QuestionnaireContext.jsx";
import gsap from 'gsap';

const InputWithValidation = React.forwardRef(({ type, name, value, placeholder,maxLength=null,isOther=false,errorMessage,isError }, ref) => {
  gsap.config({
    nullTargetWarn: false,
  })
 
  const inputRef = useRef(null);

  const { handleInputChange } = useQuestionnaire();
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(isError);
  useEffect(() => {
    setError(isError);
  }, [isError]);

  useEffect(() => {
    if (isOther && inputRef.current) {
      gsap.fromTo(inputRef.current, 
        { y: -136, opacity: 0 },
        { y: 0, opacity: 1, delay:0.8, duration: 0.5, ease: "none" });
    }
  }, [isOther]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    handleInputChange(name, newValue, isOther);
  };
  return (
    <div ref={inputRef} className={`${styles.inputContainer} ${isOther ? `animateOtherInput ${styles.otherInput}`:''}` } style={name==='company_name' ? {width:"100%"}:{}}>
      <input
        data-lpignore="true"
        ref={ref}
        type={type}
        name={name}
        maxLength={maxLength}
        value={inputValue}
        inputMode={name === "phone" ? "numeric" : type}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? `${styles.inputError}` : ""}`}
      />
     
      <div
        className={`${styles.errContainer} ${
          error ? `${styles.visible}` : `${styles.notVisible}`
        }`}
      >
        <img src="https://assets.sonary.com/wp-content/uploads/2024/01/24143354/Icon-Name-2.svg" alt="error icon" />
        <span className={styles.errText}>{errorMessage}</span>
      </div>
    </div>
  );
});

export default InputWithValidation;
