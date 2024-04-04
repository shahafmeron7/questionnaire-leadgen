// QuestionnaireContext.js
import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useMemo,
} from "react";
import questionnaireData from "./../utils/data/questionnaireData.json";
import { validateField } from "../utils/helperFunctions";
const QuestionnaireContext = createContext();

export const useQuestionnaire = () => useContext(QuestionnaireContext);

export const QuestionnaireProvider = ({ children }) => {
  const [currentQuestionCode, setCurrentQuestionCode] = useState(
    questionnaireData.questions[0]?.code
  );
  const [responses, setResponses] = useState({});
  const [errResponses, setErrResponses] = useState({});

  const [questionHistory, setQuestionHistory] = useState([]);

  const [questionnaireStarted, setQuestionnaireStarted] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [inputModified, setInputModified] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const currentQuestion = useMemo(() => {
    return questionnaireData.questions.find(
      (q) => q.code === currentQuestionCode
    );
  }, [currentQuestionCode]);

  const currentQuestionIndex = questionnaireData.questions.findIndex(
    (q) => q.code === currentQuestionCode
  );
  const totalQuestions = questionnaireData.questions.length;

  const startQuestionnaire = () => {
    setQuestionnaireStarted(true);
    setCurrentQuestionCode(questionnaireData.questions[0].code);
  };

  const completeQuestionnaire = () => {
    setQuestionnaireCompleted(true);
  };

  const changeNextBtnState = (isEnabled) => {
    console.log("Changing next button state to:", isEnabled);

    setNextBtnEnabled(isEnabled);
  };

  const handleAnswerSelection = (questionCode, answerIndex) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionCode]: answerIndex,
    }));

    const nextQuestionCode =
      currentQuestion.answers[answerIndex].next_question_code;
    if (nextQuestionCode) {
      setQuestionHistory((prevHistory) => [
        ...prevHistory,
        currentQuestionCode,
      ]);
      setCurrentQuestionCode(nextQuestionCode);
    } else {
    }
  };
  const handleInputChange = (questionCode, inputValue) => {
    if(inputValue.length>0){
      setNextBtnEnabled(true);
      console.log('length>0',inputValue)
    }
    else{
      setNextBtnEnabled(false);
      console.log('length<0',inputValue)

    }
    setErrResponses((prevErrResponses) => ({
      ...prevErrResponses,
      [questionCode]: false,
    }));
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionCode]: inputValue,
    }));
  };
  const resetInputModified = () => setInputModified(false);

  const moveToNextQuestion = () => {
    if(currentQuestion.type ==='details-question'){
      let allValid=true;
      let codes = currentQuestion.subquestions.map(sub=> sub.code)
      console.log(codes);
      codes.map(code=>{
        if(!validateField(code,responses[code])){
          console.log('notvalid')
          setErrResponses((prevErrResponses) => ({
            ...prevErrResponses,
            [code]: true,
          }));
          allValid=false;
        }
      })
      if(!allValid) {
        setNextBtnEnabled(false);
        return;

      }
    }
    console.log("move next");
  };

  const moveToPrevQuestion = () => {
    setQuestionHistory((prevHistory) => {
      const history = [...prevHistory];
      const prevQuestionCode = history.pop();
      setCurrentQuestionCode(
        prevQuestionCode || questionnaireData.questions[0].code
      );
      return history;
    });
  };

  const value = useMemo(
    () => ({
      currentQuestionCode,
      currentQuestion,
      responses,
      errResponses,
      questionnaireStarted,
      questionnaireCompleted,
      questionHistory,
      totalQuestions,
      currentQuestionIndex,
      inputModified,
      nextBtnEnabled,
      changeNextBtnState,
      handleInputChange,
      resetInputModified,
      moveToNextQuestion,
      moveToPrevQuestion,
      startQuestionnaire,
      completeQuestionnaire,
      handleAnswerSelection,
    }),
    [
      currentQuestionCode,
      responses,
      errResponses,
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
