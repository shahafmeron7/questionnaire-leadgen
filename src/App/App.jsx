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
function App() {
  const { questionnaireCompleted, questionnaireStarted } = useQuestionnaire();
 
  return (
    <div className="AppWrapper" >
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
