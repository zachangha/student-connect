import React from "react";
import "../styles/aboutMe.css";
import collinsImage from "../images/collins.jpeg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function App() {
  return (
    <div className="aboutContainer">
      <div className="about-me">
        <img src={collinsImage} alt="Collins Gichohi" />
        <h1>Collins Gichohi</h1>
        <h2>Front End Lead</h2>
        <LinkedInIcon />
        <GitHubIcon />
      </div>
    </div>
  );
}

export default App;
