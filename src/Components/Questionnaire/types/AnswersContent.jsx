import React from "react";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import OneSelectionQuestion from "./OneSelectionQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import DetailsQuestion from "./DetailsQuestion";

const AnswersContent = () => {
  const { currentQuestion } = useQuestionnaire();
  const questionComponents = {
    "one-selection": OneSelectionQuestion,
    "multiple-choice": MultipleChoiceQuestion,
    "details-question": DetailsQuestion,
  };

  const QuestionComponent = questionComponents[currentQuestion.type];

  if (!QuestionComponent) {
    return <>Question type not supported</>;
  }

  return <QuestionComponent/>;
};

export default AnswersContent;
