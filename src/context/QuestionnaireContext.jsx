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
  const [isNextButtonFunctionallyDisabled, setIsNextButtonFunctionallyDisabled] = useState(false);

  
  const currentQuestion = useMemo(() => {
    return questionnaireData.questions.find(
      (q) => q.code === currentQuestionCode
      );
    }, [currentQuestionCode]);
    
    useEffect(() => {
      if (currentQuestion?.step > 1) {
        setQuestionnaireStarted(true);
      } else {
        setQuestionnaireStarted(false);
      }
    }, [currentQuestion]);
  const currentQuestionIndex = questionnaireData.questions.findIndex(
    (q) => q.code === currentQuestionCode
  );
  const totalQuestions = questionnaireData.questions.length;

 

  const completeQuestionnaire = () => {
    setQuestionnaireCompleted(true);
  };

  const changeNextBtnState = (isEnabled) => {

    setNextBtnEnabled(isEnabled);
  };
  const toggleNextButtonFunctionality = (isDisabled) => {
    setIsNextButtonFunctionallyDisabled(isDisabled);
  };

  const handleAnswerSelection = (questionCode, answerIndex) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionCode]: answerIndex,
    }));
    console.log("handleAnswerSelection");

    console.log(questionCode,answerIndex);
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
  const handleInputChange = (questionCode, inputValue, isOther = false) => {
    console.log(questionCode)
    if (!isOther) {
      console.log('regular input change');
      setResponses(prevResponses => ({
        ...prevResponses,
        [questionCode]: inputValue,
      }));
    } else {
      console.log('other change input');
      const existingResponse = responses[questionCode];
      // Check if there's already a response stored for the question
      if (typeof existingResponse === 'object' && existingResponse !== null) {
        // If 'Other' was previously selected and there's an object, update the otherValue
        setResponses(prevResponses => ({
          ...prevResponses,
          [questionCode]: {
            ...existingResponse,
            otherValue: inputValue,
          },
        }));
      } else {
        // If there's no existing object, it means 'Other' is being selected now,
        // so create a new object to store 'otherValue'
        setResponses(prevResponses => ({
          ...prevResponses,
          [questionCode]: {
            selectedIndex: existingResponse, // Preserve the previously selected index if any
            otherValue: inputValue,
          },
        }));
      }
    }
  
    setNextBtnEnabled(inputValue.trim().length > 0);
    setErrResponses(prevErrResponses => ({
      ...prevErrResponses,
      [questionCode]: false,
    }));
  };

  const resetInputModified = () => setInputModified(false);
  
  const moveToNextQuestion = () => {
    let proceedToNext = true;
  
    if (currentQuestion.type === 'details-question' || currentQuestion.type ==='form-type') {
      currentQuestion.subquestions.forEach(sub => {
        if (!validateField(sub.code, responses[sub.code])) {
          proceedToNext = false;
          setErrResponses(prev => ({ ...prev, [sub.code]: true }));
        }
      });
  
      if (!proceedToNext) {
        console.log("Validation failed for one or more fields.");
        setNextBtnEnabled(false); 
        return; 
      }
    }
    else if(currentQuestion.type === 'one-selection'){
      //need to check 'other'
    }
    const nextQuestionCode = currentQuestion.answers[0]?.next_question_code;
    if (nextQuestionCode) {
      setCurrentQuestionCode(nextQuestionCode); // Update to next question
      setQuestionHistory(prevHistory => [...prevHistory, currentQuestionCode]); 
      setNextBtnEnabled(false);
      // Optionally reset specific UI states (like inputModified or nextBtnEnabled) as needed
    } else {
      console.log("Next question not found.");
      // Handle case where no next question is defined
    }
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
  const checkAndEnableNextButton = () => {
    if (currentQuestion.type === 'details-question' || currentQuestion.type === 'form-type') {
      const allSubquestionsAnswered = currentQuestion.subquestions.every(sub => responses[sub.code] != null && responses[sub.code] !== "");
      setNextBtnEnabled(allSubquestionsAnswered);
    } else {
      const response = responses[currentQuestion.code];
      let isAnswered = response != null;
      if (typeof response === 'object' && response !== null) {
        isAnswered = response.otherValue != null && response.otherValue.trim() !== "";
      }   
      setNextBtnEnabled(isAnswered);
    }
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
      isNextButtonFunctionallyDisabled, 
      toggleNextButtonFunctionality,
      checkAndEnableNextButton,
      changeNextBtnState,
      handleInputChange,
      resetInputModified,
      moveToNextQuestion,
      moveToPrevQuestion,
      completeQuestionnaire,
      handleAnswerSelection,
      setCurrentQuestionCode
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
      nextBtnEnabled,
      inputModified,
      questionHistory,
      isNextButtonFunctionallyDisabled,
    ]
  );

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
