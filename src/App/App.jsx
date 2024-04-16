import React,{useEffect,useRef} from "react";

import "./App.css";
import { useQuestionnaire } from "../context/QuestionnaireContext";
import Questionnaire from "../Components/Questionnaire/Questionnaire.jsx";
import BestMatch from "../Components/UI/BestMatch";
import FAQ from "../Components/UI/FAQ";
import Footer from "../Components/Footer/Footer.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";
import PartnerWith from "../Components/UI/PartnerWith";
import ThankYouLayout from "../containers/ThankYouLayout";
import ContentLayout from '../containers/ContentLayout'
import useIsWideScreen from "../custom hooks/useIsWideScreen";
function App() {
  const { questionnaireCompleted, questionnaireStarted,currentQuestionCode } = useQuestionnaire();
  const isWideScreen = useIsWideScreen();
  const layoutRef = useRef(null);
  const focusAndScrollIntoView = () => {
    
  };

  useEffect(() => {
    if (!isWideScreen && questionnaireStarted) {
      focusAndScrollIntoView();
    }
  }, [currentQuestionCode, isWideScreen, questionnaireStarted]);

  return (
    <div className="AppWrapper" ref={layoutRef}>
      <Navbar />
      {!questionnaireCompleted ? (
        <>
          <Questionnaire />
          {!questionnaireStarted && (
            <>
              <ContentLayout>
                <PartnerWith />
                <BestMatch />
                <FAQ />
              </ContentLayout>

              <Footer />
            </>
          )}
        </>
      ) : (
        <>
          <ThankYouLayout/>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
