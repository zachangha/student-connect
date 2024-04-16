import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button } from "@mui/material";
import "./styles/classes.css";

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    classID: "",
    className: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // post all information to api classID: can be any string
  const handleSubmit = async (event) => {
    event.preventDefault();
    const teacherID = user.id;
    const { classID, className } = formData;

    try {
      const response = await axios.post("/api/classes", {
        classID,
        className,
        teacherID,
      });
      console.log("Class Added Successfully:", response.data);
      alert("Class created successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Failed to add class:", error.message);
      alert("Failed to create class. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <h1>Add class</h1>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="classID"
          label="class ID"
          name="classID"
          autoComplete="classID"
          autoFocus
          value={formData.classID}
          onChange={handleFormChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="className"
          label="class Name"
          name="className"
          autoComplete="className"
          value={formData.className}
          onChange={handleFormChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit-button"
        >
          Create class
        </Button>
      </form>
    </Container>
  );
}

export default App;
