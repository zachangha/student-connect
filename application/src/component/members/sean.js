import React from "react";
import "../styles/aboutMe.css";
import seanImage from "../images/sean.jpeg";

function App() {
  return (
    <div className="aboutContainer">
      <div className="about-me">
        <img src={seanImage} alt="Sean Ibarra Diaz" />
        <h1>Sean Ibarra Diaz</h1>
        <h2>Scrum Master</h2>
      </div>
    </div>
  );
}

export default App;
