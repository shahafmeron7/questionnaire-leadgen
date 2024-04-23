// QuestionnaireContext.js
import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useMemo,
  useRef
} from "react";
import { gsap } from "gsap";
import questionnaireData from "./utils/data/questionnaireData.json";
import { sendImpressions, validateField } from "./utils/helperFunctions";
import Impression from "./utils/impression/impression";
const STREAM_STEP_NAME = process.env.REACT_APP_STREAM_STEP_NAME;
const STREAM_FINAL_NAME = process.env.REACT_APP_STREAM_FINAL_NAME;
const FIRST_EVENT_NAME = process.env.REACT_APP_FIRST_EVENT_NAME;
const STEP_EVENT_NAME = process.env.REACT_APP_STEP_EVENT_NAME;
const FINAL_SUBMIT_EVENT_NAME= process.env.REACT_APP_FINAL_SUBMIT_EVENT_NAME

const USER_EVENT_NAME = process.env.REACT_APP_USER_EVENT_NAME;
const USER_ACTION_NAME = process.env.REACT_APP_USER_ACTION_EXIT;
const USER_ACTION_CLICK_NEXT = process.env.REACT_APP_USER_ACTION_CLICK_NEXT;
const USER_ACTION_CLICK_PREV_BROWSER =process.env.REACT_APP_USER_ACTION_CLICK_PREV_BROWSER;
const STAX_FORM_ID = process.env.REACT_APP_STAX_FORM_ID;
const PAYSAFE_FORM_ID = process.env.REACT_APP_PAYSAFE_FORM_ID;

const TIME_DELAY_NEXT_QUESTION = 0.2

const QuestionnaireContext = createContext();


export const useQuestionnaire = () => useContext(QuestionnaireContext);

export const QuestionnaireProvider = ({ children }) => {



  const hasSentImpression = useRef(false);
  
  const initialQuestionCode =  questionnaireData.questions[0]?.code;

  const [currentQuestionCode, setCurrentQuestionCode] = useState(initialQuestionCode);
  const [questionHistory, setQuestionHistory] = useState([initialQuestionCode]);

  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const [responses, setResponses] = useState({});
  const [errResponses, setErrResponses] = useState({});
  const [questionnaireStarted, setQuestionnaireStarted] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [targetFormID,setTargetFormID] = useState(undefined)
  const [inputModified, setInputModified] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [progressBarWidth,setProgressBarWidth] = useState(0)
  const [
    isNextButtonFunctionallyDisabled,
    setIsNextButtonFunctionallyDisabled,
  ] = useState(false);
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
    if (currentQuestionCode === "thank_you") {
      completeQuestionnaire();
    } else {
      setQuestionnaireCompleted(false);
    }
  }, [currentQuestion, currentQuestionCode]);

  useEffect(() => {
    if (!hasSentImpression.current) {
       Impression();
      
      sendImpressions({}, FIRST_EVENT_NAME,STREAM_STEP_NAME);
      
   
      hasSentImpression.current = true;
     
    }
  }, []);
  
  useEffect(() => {
    sendImpressions(buildEventData(), STEP_EVENT_NAME, STREAM_STEP_NAME);
  }, [currentQuestionCode]);

  useEffect(() => {
    const handleUnload = () => {
      sendImpressions({}, USER_ACTION_NAME, USER_EVENT_NAME, STREAM_STEP_NAME);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [currentQuestionCode]);

   useEffect(() => {
     const handlePopState = (event) => {
      //  event.preventDefault(); 
       if (questionHistory.length > 1) {
         if(questionnaireCompleted){
           window.location.href = "https://sonary.com/";
         }
         else if(currentQuestionCode !=='loader'){
          sendImpressions(buildEventData(USER_ACTION_CLICK_PREV_BROWSER), USER_EVENT_NAME, STREAM_STEP_NAME);
          moveToPrevQuestion();
         }
       } else {
     
          window.history.go(-1);
       }
     };

     window.addEventListener('popstate', handlePopState);
     return () => {
       window.removeEventListener('popstate', handlePopState);
     };
   }, [questionHistory,currentQuestionCode,questionnaireCompleted]);


  const currentQuestionIndex = questionnaireData.questions.findIndex(
    (q) => q.code === currentQuestionCode
  );
  const totalQuestions = questionnaireData.questions.length;
  const findStepNumber = (questionCode)=>{
    return  questionnaireData.questions.find((q)=>q.code === questionCode).step;
  }
  const buildEventData = (action = null) => {
    const { step, code, text, type, subquestions } = currentQuestion;

    let questionsData;
    if (type === "details-question" || type === "form-type") {
      questionsData = subquestions.map((sub) => ({
        code: sub.code,
        text: sub.text,
      }));
    } else {
      questionsData = [{ code, text }];
    }
    const eventData = {
      context: {
        step,
        questions: questionsData,
        flow_id: questionnaireData.flow_id,
        flow_name: questionnaireData.flow_name,
      },
    };

    if (action) {
      eventData["action"] = action;
    }

    return eventData;
  };
  const resetInputModified = () => setInputModified(false);

  const animateAndNavigate = (navigate,nextProgressWidth, delay = 0) => {
    setIsAnimatingOut(true);
  
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimatingOut(false);
        navigate(); 
      }
    });
    tl.to(".progressLine", {
      width: `${nextProgressWidth}%`,
      duration: 0.3,
      ease: 'none'
    })
    tl.to(".animateFadeOut", {
      opacity: 0,
      delay: delay, 
      duration: 0.1
    },`+=0.1`);
  };
  
  const completeQuestionnaire = () => {
    //changing structure of code:'monthly_volume' to match their API.
    if(targetFormID === PAYSAFE_FORM_ID){
      const paysafe_monthly_volume =["1-999","1000-9999","10000","0"]

      const monthly_volume = responses.monthly_volume;
      monthly_volume.answer=paysafe_monthly_volume[monthly_volume.answerIndexes[0]]
    }
    const finalResponses = Object.keys(responses).reduce((acc, key) => {
      const { answerIndexes, ...responseWithoutIndexes } = responses[key];
      acc[key] = responseWithoutIndexes;
      return acc;
    }, {});
    
    // Send final impression
    sendImpressions(finalResponses, FINAL_SUBMIT_EVENT_NAME, STREAM_FINAL_NAME,targetFormID);
    setQuestionnaireCompleted(true);
  };

  const changeNextBtnState = (isEnabled) => {
    setNextBtnEnabled(isEnabled);
  };
  const toggleNextButtonFunctionality = (isDisabled) => {
    setIsNextButtonFunctionallyDisabled(isDisabled);
  };
  function checkAndUpdateFormID(questionCode, answerIndex) {
    if (questionCode === "industry_type") {
        let formID = null;
        if (answerIndex === 2) {
            formID = STAX_FORM_ID;
        } else {
            // Random selection logic
            const random = Math.random();
            formID = random < 0.9 ? PAYSAFE_FORM_ID : STAX_FORM_ID; // 90% Paysafe, 10% Stax
        }
        setTargetFormID(formID);
    }
}
const moveToNextQuestion = () => {
  let proceedToNext = true;
  let nextQuestionCode;

  if (currentQuestion.type === "details-question" || currentQuestion.type === "form-type") {
    currentQuestion.subquestions.forEach(sub => {
      if (!validateField(sub.code, responses[sub.code]?.answer)) { // Use the answer property
        proceedToNext = false;
        setErrResponses(prev => ({ ...prev, [sub.code]: true }));
      }
    });
    nextQuestionCode = currentQuestion.answers[0]?.next_question_code;
  } else if (currentQuestion.type === "one-selection") {
    const response = responses[currentQuestion.code];
    if (response && response.answerIndexes) {
      const selectedIndex = response.answerIndexes[0]; // Assuming 'answerIndexes' holds indices
      // Check if the question is about industry type and update form id
      checkAndUpdateFormID(currentQuestionCode,selectedIndex);
      nextQuestionCode = currentQuestion.answers[selectedIndex]?.next_question_code;
    } else {
      proceedToNext = false;
    }
  } else if (currentQuestion.type === "multi-selection") {
    const response = responses[currentQuestion.code];
    if (response && response.answerIndexes && response.answerIndexes.length > 0) {
      nextQuestionCode = currentQuestion.answers[response.answerIndexes[0]]?.next_question_code;
    } else {
      proceedToNext = false;
    }
  }

  if (proceedToNext && nextQuestionCode) {
    sendImpressions(buildEventData(USER_ACTION_CLICK_NEXT), USER_EVENT_NAME, STREAM_STEP_NAME);
    changeNextBtnState(true)
    const nextStep = findStepNumber(nextQuestionCode);
    const newProgressBarWidth = Math.min(100, Math.round((nextStep - 1) / (4 - 1) * 100))
    setProgressBarWidth(newProgressBarWidth)

    animateAndNavigate(() => {
      handleNavigateNextQuestion(nextQuestionCode);
    }, newProgressBarWidth ,TIME_DELAY_NEXT_QUESTION);
   
  }else{
    setNextBtnEnabled(false);

  }

};
  const handleAnswerSelection = (questionCode, answerIndex) => {
    
    const answer = currentQuestion.answers[answerIndex];
    const answerText = answer?.text;
    const existingResponse = responses[questionCode] || {};
    // Check if the question is about industry type and update form id
    checkAndUpdateFormID(questionCode,answerIndex);
    const newResponse = {
      ...existingResponse,
      answer: answerText,
      answerIndexes: [answerIndex], // Storing index for reference
      step: currentQuestion.step,
      question: currentQuestion.text,
    };

    // Only add 'other_text' if the selected answer is the 'Other' type.
    if (answer?.isOther) {
      // Carry over the 'other' text only if it already exists in the responses.
      newResponse.other_text = existingResponse.other_text || '';
    } else {
      // Ensure 'other_text' is removed if it exists and the selection isn't 'Other'
      if (newResponse.other_text) {
        delete newResponse.other_text;
      }
    }

    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionCode]: newResponse,
    }));

    // Navigate to the next question based on the selected answer's directive
    const nextQuestionCode = answer?.next_question_code;
    if (nextQuestionCode) {
      const nextStep = findStepNumber(nextQuestionCode);
      const newProgressBarWidth = Math.min(100, Math.round((nextStep - 1) / (4 - 1) * 100))
      setProgressBarWidth(newProgressBarWidth)
  
      animateAndNavigate(() => {
        handleNavigateNextQuestion(nextQuestionCode);
      }, newProgressBarWidth ,TIME_DELAY_NEXT_QUESTION);


     }
  
};
 const handleNavigateNextQuestion = (nextQuestionCode) => {
  if(nextQuestionCode!=='loader'){
    setQuestionHistory((prevHistory) => [...prevHistory, nextQuestionCode]);
  }
   setCurrentQuestionCode(nextQuestionCode);
   window.history.pushState({},null, ' ');
 };




  const handleMultipleAnswerSelection = (questionCode, selectedIndexes) => {
    const answersData = selectedIndexes.map((index) => {
      return {
        text: currentQuestion.answers[index].text,
        index: index,
      };
    });

    const response = {
      answers: answersData.map((answer) => answer.text).join(", "),
      answerIndexes: selectedIndexes,
      step: currentQuestion.step,
      question: currentQuestion.text,
    };

    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionCode]: response,
    }));
  };

  const handleInputChange = (questionCode, inputValue, isOther = false) => {
    setResponses((prevResponses) => {
      const currentResponse = prevResponses[questionCode] || {
        step: currentQuestion.step,
        question: (currentQuestion.type === "details-question" || currentQuestion.type === "form-type") 
                  ? currentQuestion.subquestions.find(sub => sub.code === questionCode).text
                  : currentQuestion.text,
        answerIndexes: []
      };

      if (!isOther) {
        // Update the main answer for non-'other' inputs, treat it as a normal input.
        return {
          ...prevResponses,
          [questionCode]: {
            ...currentResponse,
            answer: inputValue, // Assuming a normal answer is just stored under 'answer'.
          }
        };
      } else {

        // Handle 'other' inputs, storing both the selected index if it exists, and the 'other' text.
        const otherIndex = currentQuestion.answers.findIndex(answer => answer.isOther);
        const otherAnswerText = currentQuestion.answers[otherIndex].text;

        return {
          ...prevResponses,
          [questionCode]: {
            ...currentResponse,
            answer: otherAnswerText,
            other_text: inputValue, // Store custom input from 'other' option.
            answerIndexes: [otherIndex] // Ensuring that 'other' index is correctly set.
          }
        };
      }
    });
    setNextBtnEnabled(inputValue.trim().length > 0);
    setErrResponses((prevErrResponses) => ({
      ...prevErrResponses,
      [questionCode]: false,
    }));
  };
  


 

  const moveToPrevQuestion = () => {
    setQuestionHistory(prevHistory => {
      if (prevHistory.length > 1) {
        const newHistory = prevHistory.slice(0, -1);
        const prevQuestionCode = newHistory[newHistory.length - 1];
        const prevStep = findStepNumber(prevQuestionCode);

        const newProgressBarWidth = Math.min(100, Math.round((prevStep - 1) / (4 - 1) * 100))
        setProgressBarWidth(newProgressBarWidth)
    
        animateAndNavigate(() => {
          setCurrentQuestionCode(prevQuestionCode);
        }, newProgressBarWidth);
       
  
        return newHistory;
      }
      return prevHistory;
    });
  };
 
  
 
  const checkAndEnableNextButton = () => {
    if (currentQuestion.type === "details-question" || currentQuestion.type === "form-type") {
      // Check if all subquestions have been answered
      const allSubquestionsAnswered = currentQuestion.subquestions.every((sub) => {
        const response = responses[sub.code];
        return response && response.answer && response.answer.trim() !== "";
      });
      setNextBtnEnabled(allSubquestionsAnswered);
    } else {
      const response = responses[currentQuestion.code];
      let isAnswered = false;
  
      if (response) {
        // Separate logic for one-selection, which may include an 'other' text input
        if (currentQuestion.type === "one-selection") {
          if (response.answerIndexes.length > 0) {
            const answerIndex = response.answerIndexes[0]; // Since one-selection should have only one index
            if (currentQuestion.answers[answerIndex].isOther) {
              // Check if other text is not empty when 'Other' option is selected
              isAnswered = response.other_text && response.other_text.trim() !== "";
            } else {
              // Regular answer is selected

              isAnswered = true;
            }
          }
        } else if (currentQuestion.type === "multi-selection") {
          isAnswered = response.answerIndexes.length > 0;

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
      isAnimatingOut,
      progressBarWidth,
      toggleNextButtonFunctionality,
      checkAndEnableNextButton,
      changeNextBtnState,
      handleInputChange,
      resetInputModified,
      buildEventData,
      moveToNextQuestion,
      handleMultipleAnswerSelection,
      moveToPrevQuestion,
      completeQuestionnaire,
      handleAnswerSelection,
      setCurrentQuestionCode,
      handleNavigateNextQuestion
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
      isAnimatingOut
    ]
  );

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
