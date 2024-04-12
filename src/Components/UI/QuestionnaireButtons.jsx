import React,{useEffect,useState} from 'react';
import styles from '../Questionnaire/Questionnaire.module.css'
import { ReactComponent as PrevIcon } from "../../images/prevbutton.svg";
import { motion, AnimatePresence } from "framer-motion";
import { defaultVariants } from '../../animations/animations';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import useIsWideScreen from '../../custom hooks/useIsWideScreen';

const QuestionnaireButtons = ({}) => {
    const isWideScreen=useIsWideScreen();
    const [isNextButtonClicked,setIsNextButtonClicked] = useState(false);

    const {questionHistory,questionnaireStarted,isFinalStep,currentQuestionCode,checkAndEnableNextButton,moveToNextQuestion,isNextButtonFunctionallyDisabled,inputModified,nextBtnEnabled,moveToPrevQuestion,responses,currentQuestion} = useQuestionnaire();
    const handleNextButtonClick = () => {
        console.log("next clicked");
        setIsNextButtonClicked(true); 
      };

      useEffect(() => {
        let timerId;
        if (isNextButtonClicked) {
          console.log("useeffect clciked");
          timerId = setTimeout(() => {
            moveToNextQuestion();
            // navigate(`?step=${currentQuestion.step+1}`, { replace: true });
            console.log("button false clciked");
    
            setIsNextButtonClicked(false);
          }, 500);
        }
        return () => clearTimeout(timerId);
      }, [isNextButtonClicked, moveToNextQuestion]);
    
      useEffect(() => {
        checkAndEnableNextButton();
      }, [currentQuestion, responses]);
      
      useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && !isNextButtonFunctionallyDisabled && (inputModified || nextBtnEnabled)) {
                handleNextButtonClick();
                event.preventDefault(); // Prevent the default form submit behavior
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNextButtonClick, isNextButtonFunctionallyDisabled, inputModified, nextBtnEnabled]);

      const mobileButtonsStyle = {
        position: "absolute",
        bottom: "0",
        width: "100%",
        backgroundColor: "#fff",
        padding: "16px",
      };
  return (

    <AnimatePresence>
    <motion.div
      key={currentQuestionCode}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={defaultVariants}
      className={styles.buttonsWrapper}
      style={questionnaireStarted && !isWideScreen ? mobileButtonsStyle: {} }
    >
      {questionHistory.length > 0 && (
        <button className={styles.prevBtn} onClick={moveToPrevQuestion}>
                  <PrevIcon />
        </button>
      )}
      <button
        className={`${styles.nextBtn} ${inputModified || nextBtnEnabled ? styles.enabled : ""}`}
        onClick={() => !isNextButtonFunctionallyDisabled && handleNextButtonClick()}
        disabled={!inputModified && !nextBtnEnabled && !isNextButtonFunctionallyDisabled}
      >
        {isFinalStep ? "Get Results" : "Next"}
      </button>
      </motion.div>
      </AnimatePresence>

  );
};

export default QuestionnaireButtons;
