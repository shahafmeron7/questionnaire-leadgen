import React from "react";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import OneSelectionQuestion from "./OneSelectionQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import DetailsQuestion from "./DetailsQuestion";
import FormLayout from "../../../containers/FormLayout";

const AnswersContent = () => {
  const { currentQuestion } = useQuestionnaire();
  const questionComponents = {
    "one-selection": OneSelectionQuestion,
    "multiple-choice": MultipleChoiceQuestion,
    "details-question": DetailsQuestion,
    "form-type": DetailsQuestion,
  };

  const QuestionComponent = questionComponents[currentQuestion.type];

  if (!QuestionComponent) {
    return <>Question type not supported</>;
  }

  return <QuestionComponent/>;
};

export default AnswersContent;
