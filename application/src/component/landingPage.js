import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logoImage from "./images/logo.jpg";

// This is the first page users will see when opening sight
// Will ask to login or register
function App() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logoImage}
          alt="Logo"
          style={{ marginBottom: "20px", width: "70%", height: "70%" }}
        />
        <Typography component="h1" variant="h5">
          Welcome to Student Connect
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Are you a returning user or new here?
        </Typography>
        <Box
          sx={{
            mt: 3,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{ mt: 1, mb: 2, width: "80%" }}
          >
            Returning User
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/register")}
            sx={{ width: "80%" }}
          >
            New User
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
