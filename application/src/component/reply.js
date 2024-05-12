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
  const objectID = currentUrl.match(/\/([^\/]+)$/)[1];

  const [formData, setFormData] = useState({
    title: "",
    reply: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(objectID);

  /**
   * Submit the data for the reply if the fields are not left blank
   */
  const handleSubmit = async (event) => {
    if (formData.reply.trim() !== "") {
      event.preventDefault();
      try {
        const response = await axios.post("/api/classes/Reply/create", {
          authorID: user.id,
          courseID: courseID,
          datePosted: new Date(),
          title: formData.title,
          message: formData.reply,
          questionID: objectID,
          type: "reply",
        });
        console.log("Reply Created.", response.data);
        alert("Successfully posted the Reply");
        navigate(`/course/${courseID}/viewQuestion/${objectID}`); // /reply/${objectID}
      } catch (error) {
        alert(error.message);
      }
    } else {
      event.preventDefault();
      alert("Please enter a reply.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <h1>Create Reply</h1>
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
          id="reply"
          label="reply"
          name="reply"
          autoComplete="reply"
          value={formData.reply}
          onChange={handleFormChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit-button"
        >
          Create Reply
        </Button>
      </form>
    </Container>
  );
}

export default App;
