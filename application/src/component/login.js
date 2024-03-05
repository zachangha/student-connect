import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/auth-pages.css";
import Button from "@mui/material/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: need to implement authentication
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted", { email, password });
  };

  return (
    <div>
      <header className="header">
        <h1>Login</h1>
      </header>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button variant="contained">Login</Button>
          <div className="links">
            <Link to="/register">Don't have an account? Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
