import React, { Suspense,useEffect } from 'react';
import { useQuestionnaire } from "context/QuestionnaireContext.jsx";

const OneSelectionQuestion = React.lazy(() => import('./OneSelectionQuestion'));
const MultipleChoiceQuestion = React.lazy(() => import('./MultipleChoiceQuestion'));
const DetailsQuestion = React.lazy(() => import('./DetailsQuestion'));

const AnswersContent = ({ onComponentLoaded }) => {
  const { currentQuestion } = useQuestionnaire();
  const questionComponents = {
    "one-selection": OneSelectionQuestion,
    "multi-selection": MultipleChoiceQuestion,
    "details-question": DetailsQuestion,
    "form-type": DetailsQuestion,
  };

  const QuestionComponent = questionComponents[currentQuestion.type];
  // Call onComponentLoaded when the component has mounted
  useEffect(() => {
    onComponentLoaded();
  }, [onComponentLoaded]);

  if (!QuestionComponent) {
    return <>Question type not supported</>;
  }


  return (
    <Suspense fallback={<div>Loading question...</div>}>
      <QuestionComponent />
    </Suspense>
  );
};

export default AnswersContent;
