import React, { useState } from "react";

import "./App.css";
import Questionnaire from "../Components/Questionnaire/Questionnaire.jsx";
import BestMatch from "../Components/UI/BestMatch";
import FAQ from "../Components/UI/FAQ";
import Footer from "../Components/Footer/Footer.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";
import PartnerWith from "../Components/UI/PartnerWith";
import ThankYou from "../Components/UI/ThankYou";
import ContentLayout from "../containers/ContentLayout";
function App() {
  const [questionnaireStarted, setQuestionnaireStarted] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  const startQuestionnaire = () => {
    setQuestionnaireStarted(true);
  };
  const completeQuestionnaire = () => {
    setQuestionnaireCompleted(true);
  };
  return (
    <div className="AppWrapper">
      <Navbar />
      {!questionnaireCompleted ? (
        <>
          <Questionnaire
            onStart={startQuestionnaire}
            onComplete={completeQuestionnaire}
          />
          {!questionnaireStarted && (
            <ContentLayout>
              <PartnerWith />
              <BestMatch />
              <FAQ />
            </ContentLayout>
          )}
        </>
      ) : (
        <ThankYou />
      )}
      <Footer />
    </div>
  );
}

export default App;
