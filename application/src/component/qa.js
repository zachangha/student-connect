import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
} from "@mui/material";
import "./styles/homePage.css";
import { Button, TextField } from "@mui/material";

function App() {

    const [questions, setQuestions] = useState([]);
    const [newQuestions, setNewQuestions] = useState("");
  
    const user = JSON.parse(localStorage.getItem("user", "userID", "karmaPoints") || "{}");

    // // username, number of karma points
    <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "center" }} >
     Ask a Question, {user.username || "User"}! User ID: {user.id || "N/A"}! Karma: {user.karmaPoints || "N/A"}
    </Typography>

    // adds questions. 
    //  later on user could select classes that user is in from drop down
    const handleAddQuestions = () => {
        if (newQuestions.trim() !== "") {
          setQuestions([...questions, { id: Date.now(), text: newQuestions, checked: false }]);
          setNewQuestions("");
        }
      };

  return (
    <><div className="QA">
          <h1> Questions and Answers </h1>
          <h2> Title of Q and A</h2>
      </div>
      <div className="bigBox">
      <h1> Questions PAGE </h1>
    </div>
      <Container className="todoContainer">
              <TextField
                  variant="outlined"
                  label="Add New Questions"
                  value={newQuestions}
                  onChange={(e) => setNewQuestions(e.target.value)}
                  fullWidth
                  margin="normal" />
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddQuestions}
                  disabled={!newQuestions.trim()}
                  fullWidth
              >
                  Add Questions
              </Button>
          // the question, maybe later on add a button to delete the question if you want


          </Container></>

  );
}

export default App;
