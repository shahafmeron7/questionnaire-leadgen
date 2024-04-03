import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App.jsx";
import { QuestionnaireProvider } from "./context/QuestionnaireContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuestionnaireProvider>
      <App />
    </QuestionnaireProvider>
  </React.StrictMode>
);
