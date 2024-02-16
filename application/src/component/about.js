import React from "react";
import { Link } from "react-router-dom";
import "./styles/about.css";

function about() {
  return (
    <div className="container">
      <ul className="list">
        <h3>CSC 648: Section 01 Team 05</h3>
        <h4>APP:TBD</h4>
        <h2> Members </h2>
        <li>
          <Link to="/members/collins">Collins</Link>
        </li>
        <li>
          <Link to="/members/kao">kao</Link>
        </li>
        <li>
          <Link to="/members/luke">luke</Link>
        </li>
        <li>
          <Link to="/members/salvador">salvador</Link>
        </li>
        <li>
          <Link to="/members/sean">sean</Link>
        </li>
        <li>
          <Link to="/members/zach">zach</Link>
        </li>
      </ul>
    </div>
  );
}

export default about;
