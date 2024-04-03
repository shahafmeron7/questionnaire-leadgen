import React from 'react';
import OneSelectionQuestion from './OneSelectionQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import DetailsQuestion from './DetailsQuestion'; 

const AnswersContent = ({ answers, questionType, displayDirection, onAnswerSelect, selectedAnswerIndex }) => {
    const questionComponents = {
    'one-selection': OneSelectionQuestion,
    'multiple-choice': MultipleChoiceQuestion,
    'details-question': DetailsQuestion,
  };

  const QuestionComponent = questionComponents[questionType];

  if (!QuestionComponent) {
    return <>Question type not supported</>;
  }

  return (
    <QuestionComponent
      answers={answers}
      displayDirection={displayDirection}
      onAnswerSelect={onAnswerSelect}
      selectedAnswerIndex={selectedAnswerIndex}
    />
  );
};

export default AnswersContent;
