import React, { Suspense } from "react";

import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import Questionnaire from "@/components/Questionnaire/Questionnaire.jsx";
import Navbar from "@/components/Navbar/Navbar.jsx";
import ThankYouLayout from "@/layouts/ThankYouLayout.jsx";
import ContentLayout from '@/layouts/ContentLayout.jsx';
import Loading from "@/components/UI/LazyLoading/Loading";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";

import "./App.css";
const Footer = React.lazy(() => import("@/components/Footer/Footer.jsx"));
const BestMatch = React.lazy(() => import("@/components/UI/Promotional/BestMatch.jsx"));
const FAQ = React.lazy(() => import("@/components/UI/Content/FAQ.jsx"));
const PartnerWith = React.lazy(
  () => import("@/components/UI/Promotional/PartnerWith.jsx")
);
function App() {
  const { questionnaireCompleted, questionnaireStarted,currentQuestionCode } = useQuestionnaire();
  const showFormResult = currentQuestionCode === "form_result";

  if (questionnaireCompleted) {
    return (
      <div className="AppWrapper">
        <Navbar />
        <ThankYouLayout />
        <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
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
            <Suspense fallback={<Loading />}>
              <PartnerWith />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <BestMatch />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <FAQ />
            </Suspense>
          </ContentLayout>
          <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
          <ScrollToTopButton/>
        </>
      )}
      {showFormResult && (
        <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
      )}
    </div>
  );
}

export default App;
