import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./styles/classes.css";

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

  //MODIFY THIS!!  should allow user to post announcements
  const postAnnouncement = () =>{

  };

  //MODIFY THIS!! should allow user to post QA
  const postQA = () => {

  };

  useEffect(() => {
    getCourse();
  }, []);
  
  //student view of the class, cannot post announcements
  if (user.role === "student") {
    return (
      <body className="bigouterbox">

      <div className="QAbox">

        {course.map((course) => (
        <h1>Class: {course.className}</h1>
        ))}

        <div>Role: {user.role}</div>
        <br></br>
        <br></br>
        <h2 className="border">Announcements:</h2>
      
        <div className="border">put announcements here</div>
        <br></br>
        <br></br>
        <h2 className="border">Q&A
          <Button
          variant="contained"
          color="primary"
          onClick={postQA}
          className="postButton">
          +
          </Button>
        </h2>
        <div className="border">put Q&A here</div>

      </div>

       
      <div className="postingInfo">
        <br></br>
        <br></br> 
        post information here
      </div>


    </body>
    );
  } 
  
  
  //Teacher view of the class, can post announcements & QA
  else if (user.role === "teacher") {
    return (

      <body className="bigouterbox">

        <div className="QAbox">

          {course.map((course) => (
          <h1>Class: {course.className}</h1>
          ))}

          <div>Role: {user.role}</div>
          <br></br>
          <br></br>
          <h2 className="border">Announcements:  
            <Button
            variant="contained"
            color="primary"
            onClick={postAnnouncement}
            className="postButton">
            +
            </Button>
          </h2>
        
          <div className="border">put announcements here</div>
          <br></br>
          <br></br>
          <h2 className="border">Q&A
            <Button
            variant="contained"
            color="primary"
            onClick={postQA}
            className="postButton">
            +
            </Button>
          </h2>
          <div className="border">put Q&A here</div>

        </div>
        
        
        <div className="postingInfo">
          <br></br>
          <br></br> 
          post information
        </div>


      </body>
    );

  //Catch all scenario  
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
