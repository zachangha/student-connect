import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./styles/classes.css";

const Classes = () => {
  const [courseID, setCourseID] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // post studentID and courseID to be api to be posted into the database
  const handleJoinCourse = async () => {
    if (courseID.trim() !== "") {
      try {
        const response = await fetch("/api/classes/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classID: courseID, studentID: user.id }),
        });

        if (response.ok) {
          alert("Successfully joined the course");
          navigate("/home");
        } else {
          const result = await response.json();
          throw new Error(result.message || "Failed to join course");
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter a course ID");
    }
  };

  const redirectToAddCourse = () => {
    navigate("/addClasses");
  };

  // get teacher and students classes from their userID
  const getCourses = async () => {
    try {
      const response = await fetch(`/api/classes/get/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        const retrievedCourses = await response.json();
        setCourses(retrievedCourses);
        console.log(retrievedCourses)
      } else {
        const result = await response.json();
        throw new Error(result.message || "Could not load courses");
      }
    } catch (error) {
      alert(error.message);
    }
  };

    useEffect(() => {
      getCourses();
    }, [])

  // render something different according to the role of the user
  if (user.role === "student") {
    return (
      <div className="classes-container">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth={false}
          sx={{ width: 200 }}
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
        <div>
          <h2>Courses: </h2>
          <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <div>
              <h3>{course.className}</h3>
              <p>Teacher: {course.teacher}</p>
            </div>
          </li>
         ))}
        </ul>
        </div>
      </div>
    );
  } else if (user.role === "teacher") {
    return (
      <div className="classes-container">
        <Button
          variant="contained"
          color="primary"
          onClick={redirectToAddCourse}
          className="create-course-button"
        >
          Create Course
        </Button>
      </div>
    );
  } else {
    return (
      <div className="classes-container">
        <Button
          variant="contained"
          color="primary"
          onClick={redirectToAddCourse}
          className="create-course-button"
        >
          Create Course
        </Button>
      </div>
    );
  }
};

export default Classes;
