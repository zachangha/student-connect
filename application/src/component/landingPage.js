import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// this is the first page users will see when opening sight
// will ask to login or register
function App() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          marginTop: 35,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
