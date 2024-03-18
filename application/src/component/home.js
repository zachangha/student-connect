import React from "react";
import "./styles/homePage.css";
import { Button, TextField } from "@mui/material";

function App() {
  return (
    <div className="bigBox">
      <TextField
        label="Demo Query"
        sx={{
          margin: "10px",
        }}
      />
      <Button variant="contained">Search</Button>
    </div>
  );
}

export default App;
