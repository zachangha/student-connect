import React, { useState } from "react";
import { Container, TextField, Button, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./styles/auth-pages.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log("Login successful:", data);

        if (data.user) {
          const userData = JSON.stringify(data.user);
          localStorage.setItem("user", userData);
        }
        navigate("/");
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

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
        <Container
          maxWidth="xs"
          className="login-box"
          component="form"
          onSubmit={handleSubmit}
        >
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
