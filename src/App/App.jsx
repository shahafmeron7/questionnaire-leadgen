import React from "react";

// Absolute imports for cleaner and more maintainable code
import { useQuestionnaire } from "context/QuestionnaireContext.jsx";
import Questionnaire from "components/Questionnaire/Questionnaire.jsx";
import BestMatch from "components/UI/Promotional/BestMatch.jsx";
import FAQ from "components/UI/Content/FAQ.jsx";
import Footer from "components/Footer/Footer.jsx";
import Navbar from "components/Navbar/Navbar.jsx";
import PartnerWith from "components/UI/Promotional/PartnerWith.jsx";
import ThankYouLayout from "layouts/ThankYouLayout.jsx";
import ContentLayout from 'layouts/ContentLayout.jsx';

import "./App.css";

function App() {
  const { questionnaireCompleted, questionnaireStarted } = useQuestionnaire();

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
        <>
        <ContentLayout>
          <PartnerWith />
          <BestMatch />
          <FAQ />
        </ContentLayout>
        <Footer />
        </>
      )}
    </div>
  );
}

export default App;
