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
  Snackbar,
  Alert,
} from "@mui/material";
import "./styles/auth-pages.css";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Register() {
  // use to navigate to different routes
  const navigate = useNavigate();

  // set states for the drop down menus and the alerts
  const [pronouns, setPronouns] = useState("");
  const [role, setRole] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ severity: "info", message: "" });

  // create form that will hold the register data that is to be sent
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

  // update form adat as it is being inputted
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // used to close drop down menu when clicked again
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // when submit button is bit information registered in the form is posted to users API
  const handleSubmit = async (event) => {
    event.preventDefault();

    // check if the passwords match if not send alert
    if (formData.password !== formData.confirmPassword) {
      setAlertInfo({ severity: "error", message: "Passwords do not match." });
      setOpenAlert(true);
      return;
    }

    // post users information to API alert user of outcome
    try {
      const response = await axios.post("/api/users", [formData]);
      console.log("User registered:", response.data);
      setAlertInfo({
        severity: "success",
        message: "Registration successful! Redirecting to login...",
      });
      setOpenAlert(true);
      setTimeout(() => navigate("/login"), 2000); // Redirect after delay for user to see message
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error("Failed to register user:", errorMessage);
      setAlertInfo({
        severity: "error",
        message: `Registration failed: ${errorMessage}`,
      });
      setOpenAlert(true);
    }
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertInfo.severity}
          sx={{ width: "100%" }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
      <div className="page-layout">
        <div className="left-container">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            style={{ margin: "10px 0", alignSelf: "flex-start" }}
          >
            Back to Landing Page
          </Button>
        </div>
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
                label="Email"
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
      </div>
    </>
  );
}

export default Register;
