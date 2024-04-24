import React from "react";

// Absolute imports for cleaner and more maintainable code
import { useQuestionnaire } from "context/QuestionnaireContext";
import Questionnaire from "components/Questionnaire/Questionnaire";
import BestMatch from "components/UI/Promotional/BestMatch";
import FAQ from "components/UI/Content/FAQ";
import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import PartnerWith from "components/UI/Promotional/PartnerWith";
import ThankYouLayout from "layouts/ThankYouLayout";
import ContentLayout from 'layouts/ContentLayout';

import "./App.css";

function App() {
  const { questionnaireCompleted, questionnaireStarted } = useQuestionnaire();

  // Using early returns to simplify the rendering logic
  if (questionnaireCompleted) {
    return (
      <div className="AppWrapper">
        <Navbar />
        <ThankYouLayout />
        <Footer />
      </div>
    );
  }

  return (
    <div className="AppWrapper">
      <Navbar />
      <Questionnaire />
      {!questionnaireStarted && (
        <ContentLayout>
          <PartnerWith />
          <BestMatch />
          <FAQ />
          <Footer />
        </ContentLayout>
      )}
    </div>
  );
}

export default App;
