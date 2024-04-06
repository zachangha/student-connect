import React from "react";
import { Container, TextField, Button, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./styles/auth-pages.css";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        style={{ margin: "10px 0", alignSelf: "flex-start" }}
      >
        Back to Home
      </Button>
      <div className="login-container">
        <Container maxWidth="xs" className="login-box">
          <h1 className="login-title">Log In</h1>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your email"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="login-button"
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
          <p className="signup-prompt">
            Don't have an account?{" "}
            <Link href="/register" className="signup-link">
              Sign Up
            </Link>
          </p>
        </Container>
      </div>
      <div className="right-side-container"></div>
    </>
  );
}

export default LoginPage;
