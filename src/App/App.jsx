import React from "react";

import "./App.css";
// import { useQuestionnaire } from "../context/QuestionnaireContext";
import { useQuestionnaire } from "../context/QuestionnaireContext/QuestionnaireContext.jsx";
import Questionnaire from "../Components/Questionnaire/Questionnaire.jsx";
import BestMatch from "../Components/UI/Promotional/BestMatch";
import FAQ from "../Components/UI/Content/FAQ";
import Footer from "../Components/Footer/Footer.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";
import PartnerWith from "../Components/UI/Promotional/PartnerWith";
import ThankYouLayout from "../Layouts/ThankYouLayout";
import ContentLayout from '../Layouts/ContentLayout'
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
