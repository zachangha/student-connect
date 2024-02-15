import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      THIS IS THE NAVBAR
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/person1" activeClassName="active">
            Person1
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
