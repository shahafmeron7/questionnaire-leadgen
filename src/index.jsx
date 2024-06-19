import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import "./index.css";
import App from "./App/App.jsx";
import { QuestionnaireProvider } from "./context/QuestionnaireProvider.jsx";
import { OsanoVisibilityProvider } from "./context/OsanoVisibilityContext";
if (import.meta.env.PROD) {
  console.log("disabled devtool");
  disableReactDevTools();
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QuestionnaireProvider>
        <OsanoVisibilityProvider>
          <App />
        </OsanoVisibilityProvider>
      </QuestionnaireProvider>
    </BrowserRouter>
  </React.StrictMode>
);
