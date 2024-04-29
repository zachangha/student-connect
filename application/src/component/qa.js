import React, { useState } from "react";
import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import "./styles/homePage.css";
import DeleteIcon from "@mui/icons-material/Delete";


function App() {
  // seting the constants
    const [questions, setQuestions] = useState([]);
    const [newQuestions, setNewQuestions] = useState("");

    const [title, setTitle] = useState([]);
    const [newTitle, setNewTitle] = useState("");
  
    const user = JSON.parse(localStorage.getItem("user", "userID", "karmaPoints") || "{}");

    // // username, number of karma points
    <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "center" }} >
     Ask a Question, {user.username || "User"}! User ID: {user.id || "N/A"}! Karma: {user.karmaPoints || "N/A"}
    </Typography>

    // adds questions. 
    //  later on user could select classes that user is in from drop down

    const handleTitle = () => {
      if (newTitle.trim() !== "") {
        setTitle([...title, { id: Date.now(), text: newTitle, checked: false }]);
        setNewTitle("");
      }
    };
    const handleAddQuestions = () => {
        if (newQuestions.trim() !== "")  {
          setQuestions([...questions, { id: Date.now(), text: newQuestions, checked: false }]);
          setNewQuestions("");
        }
      };

      /*
      const handleAddQuestions = () => {
        if (newQuestions.trim() !== "") || (newTitle.trim() !== "") {
          setQuestions([...questions, { id: Date.now(), text: newQuestions, checked: false }]);
          setNewQuestions("");
          setTitle([...title, { id: Date.now(), text: newTitle, checked: false }]);
          setNewTitle("");
        }
      };
      */
      
      // delete questions
      const handleDeleteQuestions = (id) => {
        setQuestions(questions.filter((question) => question.id !== id));
      };

      // user can input tilte and question, and post the question in a list
  return (
    <><div className="bigBox">
      <h1> Questions & Answers Page </h1>
    </div>
      <Container className="qaContainer">
              <TextField
                  variant="outlined"
                  label="Add Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  fullWidth
                  margin="normal" />

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

              <List>
          {questions.map((question) => (
            <ListItem
              key={question.id}
              dense
            >
              <ListItemText primary={question.text} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteQuestions(question.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
          </Container></>

  );
}

export default App;
