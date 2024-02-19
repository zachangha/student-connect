import React from "react";
import "../styles/aboutMe.css";
import salvadorImage from "../images/salvador.jpg";

function App() {
  return (
    <div className="aboutContainer">
      <div className="about-me">
        <img src={salvadorImage} alt="Salvador Avila" />
        <h1> Salvador Avila </h1>
        <h2> Front End Assist </h2>
      </div>
    </div>
  );
}

export default App;
