import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="navbar-container">
        <NavLink exact to="/" className="logo" activeClassName="active">
          LOGO
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
