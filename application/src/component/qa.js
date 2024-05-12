import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button } from "@mui/material";
import "./styles/classes.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const courseID = currentUrl.match(/\/course\/([^\/]+)\//)[1];
  const questionID = currentUrl.match(/\/([^\/]+)$/)[1];

  const [formData, setFormData] = useState({
    title: "",
    question: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Submit the data for the Question if the fields are not left blank
   */
  const handleSubmit = async (event) => {
    if (formData.title.trim() !== "" && formData.question.trim() !== "") {
      event.preventDefault();
      try {
        const response = await axios.post("/api/classes/Question/create", {
          authorID: user.id,
          courseID: courseID,
          datePosted: new Date(),
          title: formData.title,
          message: formData.question,
          questionID: null,
          type: "question",
        });
        console.log("Question Created.", response.data);
        alert("Successfully posted the Question");
        navigate(`/course/${courseID}`);
      } catch (error) {
        alert(error.message);
      }
    } else {
      event.preventDefault();
      alert("Please enter a title and question.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <h1>Create Question</h1>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          value={formData.title}
          onChange={handleFormChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="question"
          label="question"
          name="question"
          autoComplete="question"
          value={formData.question}
          onChange={handleFormChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit-button"
        >
          Create Question
        </Button>
      </form>
    </Container>
  );
}

export default App;
