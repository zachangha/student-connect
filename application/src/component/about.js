import React from "react";
import { Link } from "react-router-dom";
import "./styles/about.css";

function About() {
  return (
    <div>
      <div className="backButtonContainer">
        <Link to="/" className="backButton">
          Back to Landing Page
        </Link>
      </div>
      <header className="header">
        <h1>Meet our Team</h1>
      </header>
      <div className="container">
        <div className="infoColumn">
          <div>
            <h2>Goals of Milestone Zero:</h2>
            <ul>
              <li>To establish team roles and dynamics</li>
              <li>To establish project technology</li>
              <li>To build a base webpage</li>
            </ul>

            <h2>Technology:</h2>
            <ul>
              <li>Cloud Server: Amazon AWS</li>
              <li>Operating System: Ubuntu 22.04 Server</li>
              <li>Database: NoSQL (MongoDB)</li>
              <li>Server Side Language: Node.js</li>
              <li>Web Application Framework: Express</li>
              <li>Front-End Technology: React</li>
              <li>Web Server: Nginx</li>
              <li>IDE: VS Code</li>
            </ul>

            <h2>Meeting Schedule:</h2>
            <ul>
              <li>Mondays, in-class, 5:30-6:45pm</li>
              <li>Fridays, Discord, 10:30am-11:59am</li>
            </ul>
          </div>
        </div>
        <div className="linkColumn">
          <ul className="list">
            <h3>CSC 648: Section 01 Team 05</h3>
            <h4>APP:TBD</h4>
            <h2> Members </h2>
            <li>
              <Link to="/members/kao">Kao</Link>
            </li>
            <li>
              <Link to="/members/collins">Collins</Link>
            </li>
            <li>
              <Link to="/members/luke">Luke</Link>
            </li>
            <li>
              <Link to="/members/salvador">Salvador</Link>
            </li>
            <li>
              <Link to="/members/sean">Sean</Link>
            </li>
            <li>
              <Link to="/members/zach">Zach</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
