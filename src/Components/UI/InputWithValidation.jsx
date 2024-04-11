import React, { useState, useEffect } from "react";
import styles from "./InputWithValidation.module.css";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
const InputWithValidation = React.forwardRef(({ type, name, value, placeholder,isOther=false,errorMessage,isError }, ref) => {

  const { handleInputChange } = useQuestionnaire();
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(isError);
  const maxLength = name === "zip_code" ? "5" : name ==="phone" ? "10" : ""; 
  console.log(maxLength,type)
  useEffect(() => {
    setError(isError);
  }, [isError]);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    handleInputChange(name, newValue, isOther);
  };
  return (
    <div className={`${styles.inputContainer} ${isOther ? (`${styles.otherInput} ${styles.slideUpEntranceInput}`):''} `}>
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
        <img src="https://assets.sonary.com/wp-content/uploads/2024/01/24143354/Icon-Name-2.svg" />
        <span className={styles.errText}>{errorMessage}</span>
      </div>
    </div>
  );
});

export default InputWithValidation;
