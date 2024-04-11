// QuestionnaireContext.js
import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useMemo,
} from "react";
import { useNavigate } from 'react-router-dom';

import questionnaireData from "./../utils/data/questionnaireData.json";
import { validateField } from "../utils/helperFunctions";
const QuestionnaireContext = createContext();

export const useQuestionnaire = () => useContext(QuestionnaireContext);

export const QuestionnaireProvider = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate hook

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
  const [animationState, setAnimationState] = useState('enter'); // 'enter', 'exit', or null

  
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
      if(currentQuestionCode ==='thank_you'){
        setQuestionnaireCompleted(true);
      }
      else{
        setQuestionnaireCompleted(false);

      }
    }, [currentQuestion,currentQuestionCode]);
  const currentQuestionIndex = questionnaireData.questions.findIndex(
    (q) => q.code === currentQuestionCode
  );
  const totalQuestions = questionnaireData.questions.length;

 
  const triggerAnimation = (state) => {
    setAnimationState(state);
    // Optionally, reset the state after the animation duration
    if (state !== null) {
      setTimeout(() => setAnimationState(null), 1000); // Adjust based on your longest animation time
    }
  };
  const completeQuestionnaire = () => {
    setQuestionnaireCompleted(true);
  };

  const changeNextBtnState = (isEnabled) => {
    console.log(isEnabled)
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
      console.log(nextQuestionCode)
    if (nextQuestionCode) {
      setQuestionHistory((prevHistory) => [
        ...prevHistory,
        currentQuestionCode,
      ]);
      setCurrentQuestionCode(nextQuestionCode);
      // navigate(`/questionnaire?step=${nextQuestionCode}`);

    } 
  };
 
  
const handleMultipleAnswerSelection = (questionCode, selectedIndexes) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionCode]: selectedIndexes,
    }));
  };


  const handleInputChange = (questionCode, inputValue, isOther = false) => {
    console.log(questionCode, inputValue, isOther)
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
        const otherIndex = currentQuestion.answers.findIndex(answer => answer.isOther);

        // If there's no existing object, it means 'Other' is being selected now,
        // so create a new object to store 'otherValue'
        setResponses(prevResponses => ({
          ...prevResponses,
          [questionCode]: {
            selectedIndex: otherIndex, // Preserve the previously selected index if any
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
    let nextQuestionCode;
  
    if (currentQuestion.type === 'details-question' || currentQuestion.type === 'form-type') {
      currentQuestion.subquestions.forEach(sub => {
        if (!validateField(sub.code, responses[sub.code])) {
          proceedToNext = false;
          setErrResponses(prev => ({ ...prev, [sub.code]: true }));
        }
      });
      // Use the first answer's next_question_code for these types
      nextQuestionCode = currentQuestion.answers[0]?.next_question_code;
    } else if (currentQuestion.type === 'one-selection') {
      
      const response = responses[currentQuestion.code];
      console.log(response)
      if (typeof response === 'object' && response.hasOwnProperty('selectedIndex')) {
        // Handle 'other' case where response is an object
        const selectedIndex = response.selectedIndex;
        console.log(selectedIndex)

        nextQuestionCode = currentQuestion.answers[selectedIndex]?.next_question_code;
        console.log(nextQuestionCode)

      } else {
        // Regular case where response is an index
        nextQuestionCode = currentQuestion.answers[response]?.next_question_code;
      }

    } else if (currentQuestion.type === 'multi-selection') {
      console.log('move next multi choice')
      // Assuming all answers lead to the same next question, check any selected answer
      const selectedIndexes = responses[currentQuestion.code] || [];
      if (selectedIndexes.length === 0) {
        proceedToNext = false;
        // Optionally, set an error state here
      } else {
        nextQuestionCode = currentQuestion.answers[selectedIndexes[0]]?.next_question_code;
      }
    }
  
    if (proceedToNext && nextQuestionCode) {
      setCurrentQuestionCode(nextQuestionCode);
      setQuestionHistory(prevHistory => [...prevHistory, currentQuestionCode]);
      setNextBtnEnabled(false);
    } else if (!proceedToNext) {
      console.log("Validation failed or no answer selected.");
      setNextBtnEnabled(false);
    }
  };

  const moveToPrevQuestion = () => {
    setQuestionHistory((prevHistory) => {
      const history = [...prevHistory];
      const prevQuestionCode = history.pop();
      setCurrentQuestionCode(
        prevQuestionCode || questionnaireData.questions[0].code
      );
      // navigate(`/questionnaire?step=${prevQuestionCode}`);

      return history;
    });
  };
  const checkAndEnableNextButton = () => {
    if (currentQuestion.type === 'details-question' || currentQuestion.type === 'form-type') {
      const allSubquestionsAnswered = currentQuestion.subquestions.every(sub => responses[sub.code] != null && responses[sub.code] !== "");
      setNextBtnEnabled(allSubquestionsAnswered);
    } else {
      const response = responses[currentQuestion.code];
        let isAnswered = false;
        if (response != null) {
            if (typeof response === 'object' && !Array.isArray(response)) {
                // Handling for 'other' type with object response (assuming 'otherValue' exists for 'other' response)
                isAnswered = response.otherValue != null && response.otherValue.trim() !== "";
            } else if (Array.isArray(response)) {
                console.log('check button array type');
                isAnswered = response.length > 0;
            } else {
                // For simple truthy check for non-object, non-array types
                isAnswered = true;
            }
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
      animationState,
      triggerAnimation,
      navigate,
      
      toggleNextButtonFunctionality,
      checkAndEnableNextButton,
      changeNextBtnState,
      handleInputChange,
      resetInputModified,
      moveToNextQuestion,
      handleMultipleAnswerSelection,
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
      animationState
    ]
  );

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
