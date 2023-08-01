import React from "react";
import ReviewFormContainer from "./components/ReviewForm";
import "./styles/appStyles.css";

const App = () => {
  return (
    <div>
      <h1>Movie Review App</h1>
      <ReviewFormContainer />
    </div>
  );
};

export default App;
