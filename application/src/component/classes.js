import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"; // Import Button from Material-UI
import TextField from "@mui/material/TextField"; // Import TextField for better input style
import "./styles/classes.css"; // Ensure you have basic CSS for styling

const Classes = () => {
  const [courseID, setCourseID] = useState("");
  const navigate = useNavigate();

  // Retrieve user role from local storage
  const role = localStorage.getItem("userRole");

  const handleJoinCourse = async () => {
    if (courseID.trim() !== "") {
      try {
        // Assuming `/api/courses/join` is the endpoint to handle joining a course
        const response = await fetch("/api/courses/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseID }),
        });

        if (response.ok) {
          alert("Successfully joined the course");
        } else {
          throw new Error("Failed to join course");
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter a course ID");
    }
  };

  const redirectToCreateCourse = () => {
    navigate("/addClasses");
  };

  // Simplified if statement to determine rendering based on role
  if (role === "student") {
    return (
      <div className="classes-container">
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="courseID"
          label="Enter Course ID"
          value={courseID}
          onChange={(e) => setCourseID(e.target.value)}
          className="course-id-input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleJoinCourse}
          className="join-course-button"
        >
          Join Course
        </Button>
      </div>
    );
  } else if (role === "teacher") {
    return (
      <div className="classes-container">
        <Button
          variant="contained"
          color="primary"
          onClick={redirectToCreateCourse}
          className="create-course-button"
        >
          Create Course
        </Button>
      </div>
    );
  } else {
    // Default case or error handling if role is undefined or not 'student'/'teacher'
    return (
      <div className="classes-container">
        <Button
          variant="contained"
          color="primary"
          onClick={redirectToCreateCourse}
          className="create-course-button"
        >
          Create Course
        </Button>
      </div>
    );
  }
};

export default Classes;
