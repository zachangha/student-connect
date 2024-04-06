import { useState, React } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // Inside your Register function, add state hooks for pronouns and role
  const [pronouns, setPronouns] = useState("");
  const [role, setRole] = useState("");

  // Add these inside your return statement, where you want the dropdowns to appear

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        style={{ margin: "10px 0", alignSelf: "flex-start" }}
      >
        Back to Home
      </Button>
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="pronouns-label">Pronouns</InputLabel>
            <Select
              labelId="pronouns-label"
              id="pronouns"
              value={pronouns}
              label="Pronouns"
              onChange={(event) => setPronouns(event.target.value)}
            >
              <MenuItem value="he/him">He/Him</MenuItem>
              <MenuItem value="she/her">She/Her</MenuItem>
              <MenuItem value="they/them">They/Them</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              label="Role"
              onChange={(event) => setRole(event.target.value)}
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
