import React, { useState, useEffect } from "react";
import styles from "./InputWithValidation.module.css";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
const InputWithValidation = ({
  type,
  name,
  value,
  placeholder,
  errorMessage,
  isError
}) => {
    const { handleInputChange } = useQuestionnaire();
    const [inputValue, setInputValue] = useState(value || "");
  const [error, setError] = useState(isError);


  
  useEffect(() => {
    setError(isError);
  }, [isError]);
const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    
    handleInputChange(name, value);
  };
  return (
    <div className={styles.inputContainer}>
      <input
        type={ type === "phone" ? "number" : type}
        name={name}
        maxLength={type==="zip" ? "5" :''}
        value={inputValue}
        inputMode={type === "zip" || type === "phone" ? "numeric" : type}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? `${styles.inputError}` : ""}`}
      />
      {/* {error && ( */}
    <div
     className={`${styles.errContainer} ${error ? `${styles.visible}` : `${styles.notVisible}`}`}
     
    >
    <img src="https://assets.sonary.com/wp-content/uploads/2024/01/24143354/Icon-Name-2.svg" />
            <span className={styles.errText}>{errorMessage}</span>
          </div>
      {/* )} */}
    </div>
  );
};

export default InputWithValidation;
