import React from "react";
import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import OneSelectionQuestion from "./OneSelectionQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import DetailsQuestion from "./DetailsQuestion";

const AnswersContent = React.forwardRef((props, ref) => {
  const { currentQuestion } = useQuestionnaire();
  const questionComponents = {
    "one-selection": OneSelectionQuestion,
    "multi-selection": MultipleChoiceQuestion,
    "details-question": DetailsQuestion,
    "form-type": DetailsQuestion,
  };

  const QuestionComponent = questionComponents[currentQuestion.type];

  if (!QuestionComponent) {
    return <>Question type not supported</>;
  }

  return <QuestionComponent ref={ref} {...props}/>;
});

export default AnswersContent;
