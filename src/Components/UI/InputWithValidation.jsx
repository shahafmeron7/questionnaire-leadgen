import React, { useState, useEffect } from "react";
import styles from "./InputWithValidation.module.css";
const InputWithValidation = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  errorMessage,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [error, setError] = useState(false);

//   useEffect(() => {
//     validateInput(inputValue);
//     setInputValue(value || "");
//   }, [value]);

  const validateInput = (val) => {
    let isValid = true;
    switch (type) {
      case "email":
        isValid = /^\S+@\S+\.\S+$/.test(val);
        break;
      case "zip":
        isValid = /^\d{5}(-\d{4})?$/.test(val);
        break;
      case "text":
        if (["first_name", "last_name", "company_name"].includes(name)) {
          isValid = val.trim().length >= 2;
        }
        break;
      default:
        isValid = true;
    }

    setError(isValid ? false : true);
    // console.log(error)

    return isValid;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (validateInput(value)) {
      console.log(error);
      onChange(name, value);
    }
  };
  return (
    <div className={styles.inputContainer}>
      <input
        type={type === "zip" || type === "phone" ? "number" : type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? `${styles.inputError}` : ""}`}
      />
      {error && (
          <div className={styles.errContainer}>
            <img src="https://assets.sonary.com/wp-content/uploads/2024/01/24143354/Icon-Name-2.svg" />
            <span className={styles.errText}>{errorMessage}</span>
          </div>
      )}
    </div>
  );
};

export default InputWithValidation;
