import React, { useEffect, useState } from "react";

const Courses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [course, setCourse] = useState([]);

  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const courseID = parts[parts.length - 1];

  /**
   * use course.id to get a courses's information to display and post information for the user.
   */
  const getCourse = async () => {
    try {
      const response = await fetch(`/api/course/get/${courseID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const retrivedCourse = await response.json();
        setCourse(retrivedCourse);
      } else {
        const result = await response.json();
        throw new Error(result.message || "Could not load course");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  if (user.role === "student") {
    return (
      <div className="classes-container">
        {course.map((course) => (
          <h1>{course.className}</h1>
        ))}
      </div>
    );
  } else if (user.role === "teacher") {
    return (
      <div className="classes-container">
        {course.map((course) => (
          <h1>{course.className}</h1>
        ))}
      </div>
    );
  } else {
    return (
      <div className="classes-container">
        {course.map((course) => (
          <h1>{course.className}</h1>
        ))}
      </div>
    );
  }
};

export default Courses;
