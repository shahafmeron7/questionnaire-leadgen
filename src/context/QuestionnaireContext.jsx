// QuestionnaireContext.js
import React, { createContext,useEffect, useContext, useState, useMemo } from "react";
import questionnaireData from "./../utils/data/questionnaireData.json";

const QuestionnaireContext = createContext();

export const useQuestionnaire = () => useContext(QuestionnaireContext);

export const QuestionnaireProvider = ({ children }) => {
  const [currentQuestionCode, setCurrentQuestionCode] =
    useState(questionnaireData.questions[0]?.code);
  const [responses, setResponses] = useState({});
  const [questionHistory, setQuestionHistory] = useState([]);

  const [questionnaireStarted, setQuestionnaireStarted] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  const currentQuestion = useMemo(() => {
    return questionnaireData.questions.find(
      (q) => q.code === currentQuestionCode
    );
  }, [currentQuestionCode]);
 
  const currentQuestionIndex = questionnaireData.questions.findIndex(q => q.code === currentQuestionCode);
  const totalQuestions = questionnaireData.questions.length;

  const startQuestionnaire = () => {
    setQuestionnaireStarted(true);
    setCurrentQuestionCode(questionnaireData.questions[0].code);
  };

  const completeQuestionnaire = () => {
    
    setQuestionnaireCompleted(true);
    //need to handle submission here later
  };



  const handleAnswerSelection = (questionCode, answerIndex) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionCode]: answerIndex,
    }));

   console.log("handleAnswerSelection",responses);
    const nextQuestionCode = currentQuestion.answers[answerIndex].next_question_code;
    if (nextQuestionCode) {
      setQuestionHistory(prevHistory => [...prevHistory, currentQuestionCode]);
      setCurrentQuestionCode(nextQuestionCode);
    } else {

    }
  };

  const moveToNextQuestion = ()=>{

  }

  const moveToPrevQuestion = () => {
    setQuestionHistory(prevHistory => {
      const history = [...prevHistory];
      const prevQuestionCode = history.pop(); 
      setCurrentQuestionCode(prevQuestionCode || questionnaireData.questions[0].code);
      return history; 
    });
  };

  const value = useMemo(
    () => ({
      currentQuestionCode,
      currentQuestion,
      responses,
      questionnaireStarted,
      questionnaireCompleted,
      questionHistory,
      totalQuestions,
      currentQuestionIndex,
      moveToNextQuestion,
      moveToPrevQuestion,
      startQuestionnaire,
      completeQuestionnaire,
      handleAnswerSelection,
    }),
    [
      currentQuestionCode,
      responses,
      questionnaireStarted,
      questionnaireCompleted,
      currentQuestionIndex,
      totalQuestions,
      currentQuestion,
      questionHistory,
      
    ]
  );

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
