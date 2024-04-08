import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Link,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "./styles/auth-pages.css";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [pronouns, setPronouns] = useState("");
  const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    karmaPoints: 0,
    pronouns: "",
    role: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userArray = [formData];
    try {
      const response = await axios.post("/api/users", userArray);
      console.log("User registered:", response.data);
      navigate("/login");
    } catch (error) {
      console.error(
        "Failed to register user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        style={{ margin: "10px 0", alignSelf: "flex-start" }}
      >
        Back to Landing Page
      </Button>
      <div className="register-container">
        <Container component="main" maxWidth="xs" className="login-box">
          <h1 className="login-title">Register</h1>
          <form onSubmit={handleSubmit} noValidate>
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              onChange={handleFormChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="pronouns-label">Pronouns</InputLabel>
              <Select
                labelId="pronouns-label"
                id="pronouns"
                name="pronouns"
                value={formData.pronouns}
                label="Pronouns"
                onChange={(event) => {
                  setPronouns(event.target.value);
                  handleFormChange(event);
                }}
              >
                <MenuItem value="he/him">He/Him</MenuItem>
                <MenuItem value="she/her">She/Her</MenuItem>
                <MenuItem value="they/them">They/Them</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                label="Role"
                onChange={(event) => {
                  setRole(event.target.value);
                  handleFormChange(event);
                }}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <p className="signup-prompt">
              Already have an account?{" "}
              <Link href="/login" variant="body2" className="signup-link">
                Login
              </Link>
            </p>
          </form>
        </Container>
      </div>
    </>
  );
}

export default Register;
