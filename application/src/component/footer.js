import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <NavLink to="/about" className="footer-link">
        Learn More About Us
      </NavLink>
    </footer>
  );
}

export default Footer;
