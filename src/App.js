import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnboardingForm from "./components/OnboardingForm";
import ThankYouPage from "./components/ThankYouPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <h1>AI Realty - Customer Onboarding</h1>
              <OnboardingForm />
            </>
          } />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;