import React from "react";
import QuestionnaireLayout from "../../containers/QuestionnaireLayout";
const Questionnaire = ({ onStart, onComplete }) => {
  function handleStart() {
    onStart();
  }

  function handleComplete() {
    onComplete();
  }
  return <QuestionnaireLayout>
      Questionnaire

     <button onClick={handleStart}>Start</button>
      <button onClick={handleComplete}>Complete</button>
  </QuestionnaireLayout>;
};

export default Questionnaire;
