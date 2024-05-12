import { useState, useEffect } from 'react';
import {useQuestionnaire} from '@/context/QuestionnaireContext.jsx';
// Custom hook to check if the questionnaire is at loader step.
const useLoader = () => {
    const {currentQuestion,handleNavigateNextQuestion} = useQuestionnaire();
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let timeoutId = null;
        if (currentQuestion.type === "loader") {
          setShowLoader(true);
          timeoutId = setTimeout(() => {
            setShowLoader(false);
            const nextQuestionCode = currentQuestion.answers[0]?.next_question_code;
            if (nextQuestionCode) {
              handleNavigateNextQuestion(nextQuestionCode)
            }
          }, 3000);
        }
        return () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
      }, [currentQuestion,handleNavigateNextQuestion]);

  return showLoader;
};

export default useLoader;
