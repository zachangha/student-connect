import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button } from "@mui/material";
import "./styles/classes.css"; // Make sure your path to the CSS file is correct

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored correctly in local storage

  const [formData, setFormData] = useState({
    courseID: "",
    courseName: "",
    teacherID: user ? user.teacherID : "", // Ensure that teacherID is stored in user object in local storage
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/courses", formData); // Endpoint to add a course
      console.log("Course Added Successfully:", response.data);
      alert("Course created successfully!");
      navigate("/classes"); // Redirect to classes page or dashboard as per requirement
    } catch (error) {
      console.error("Failed to add course:", error.message);
      alert("Failed to create course. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <h1>Add Course</h1>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="courseID"
          label="Course ID"
          name="courseID"
          autoComplete="courseID"
          autoFocus
          value={formData.courseID}
          onChange={handleFormChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="courseName"
          label="Course Name"
          name="courseName"
          autoComplete="courseName"
          value={formData.courseName}
          onChange={handleFormChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit-button"
        >
          Create Course
        </Button>
      </form>
    </Container>
  );
}

export default App;
