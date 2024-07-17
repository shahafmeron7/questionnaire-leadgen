import React from "react";
import styles from "./Form.module.css";

import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";

import InputWithValidation from "@/components/UI/Form/InputWithValidation";

import useIsWideScreen from "@/hooks/useIsWideScreen";
import NextButton from "../UI/Form/NextButton";

const Form = () => {
  const {
    currentQuestion,
    responses,
    errResponses,
    currentQuestionCode,

  } = useQuestionnaire();

 

  return (
<>


    <h1 className={styles.formTitle}>
    Receive your free quote
    </h1>
    <div
      key={currentQuestionCode}
      className={` ${styles.inputsContainer}`}
    >
      {currentQuestion.subquestions.map((sub, index) => (
        <div
          key={`${sub.code}-${index}`}
          className={` ${styles.inputWrapper}`}
        >
          <h4 className={styles.inputTitle}>{sub.text}</h4>
          <InputWithValidation
            type="text"
            name={sub.code}
            value={responses[sub.code]?.answer || ""}
            placeholder={sub.example}
            maxLength={sub.maxLength}
            errorMessage={sub.error}
            isError={errResponses[sub.code] || false}
          />
        </div>
      ))}
    </div>
      <NextButton/>
    </>
  );
};

export default Form;
