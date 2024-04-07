import React from "react";
import "./styles/homePage.css";
// import { Button, TextField } from "@mui/material";

function App() {
  // Attempt to retrieve the username from local storage
  const username = localStorage.getItem("username");

  return (
    <div className="bigBox">
      <h1> HOME PAGE </h1>
      {username && <h2>Welcome, {username}!</h2>}
    </div>
  );
}

export default App;
