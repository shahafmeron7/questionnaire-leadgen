import React from "react";

import "./App.css";
import {
  useQuestionnaire,
} from "../context/QuestionnaireContext";
import Questionnaire from "../Components/Questionnaire/Questionnaire.jsx";
import BestMatch from "../Components/UI/BestMatch";
import FAQ from "../Components/UI/FAQ";
import Footer from "../Components/Footer/Footer.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";
import PartnerWith from "../Components/UI/PartnerWith";
import ThankYou from "../Components/UI/ThankYou";
import ContentLayout from "../containers/ContentLayout";
function App() {
  const { questionnaireCompleted,questionnaireStarted,currentQuestion } = useQuestionnaire();

  return (
      <div className="AppWrapper">
        <Navbar />
        {!questionnaireCompleted ? (
          <>
            <Questionnaire />
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
