import React from "react";
import { Container, TextField, Button, Link } from "@mui/material";
import "./styles/auth-pages.css";

function Register() {
  return (
    <>
      <div className="register-container">
        <Container maxWidth="xs" className="login-box">
          <h1 className="login-title">Register</h1>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your email"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Retype Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="login-button"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <p className="signup-prompt">
            Already have an account?
            <Link href="/login" className="signup-link">
              Login
            </Link>
          </p>
        </Container>
      </div>
      <div className="right-side-container"></div>
    </>
  );
}

export default Register;
