import React from "react";
import QuestionnaireLayout from "../../containers/QuestionnaireLayout";
import questionnaireData from  '../../utils/data/questionnaireData.json'
const Questionnaire = ({ onStart, onComplete }) => {
  console.log(questionnaireData)
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
