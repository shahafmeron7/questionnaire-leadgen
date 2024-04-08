import React from 'react'
import {useQuestionnaire} from '../../context/QuestionnaireContext';

const extraInfoContainer = {
    backgroundColor: "rgba(0, 111, 255, 0.10)",
    padding: "8px 14px",
    borderRadius: "8px",
    maxWidth: "690px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    color: "#006FFF",
    // opacity: 0,
    // visibility: "hidden",
  };
  
const ExtraInfo = () => {
    const {currentQuestion} = useQuestionnaire();
  return (
    <div style={extraInfoContainer}>{currentQuestion.extra_info}</div>
  )
}

export default ExtraInfo