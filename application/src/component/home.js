import React from "react";
import "./styles/homePage.css";
// import { Button, TextField } from "@mui/material";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bigBox">
      {user && (
        <div>
          <h1>Username: {user.username}</h1>
          <h1>Email: {user.email}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
