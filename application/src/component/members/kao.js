import React from "react";
import "../styles/kaoAboutMe.css";
import kaoImage from "../images/kao.jpeg";


function App() {
  return (
    <div className="bigBox">
      <div className="aboutMe">
        <img src={kaoImage} alt="Kao Saephan" /> 
        <h1> Kao Saephan </h1>
        <h2> Team Lead </h2>
      </div>
    </div>
  );
}

export default App;
