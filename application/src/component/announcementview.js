import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./styles/classes.css";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [course, setCourse] = useState([]);
  const [announcements, setAnnouncement] = useState([]);
  const [questions, setQuestion] = useState([]);

  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const courseID = currentUrl.match(/\/course\/([^\/]+)\//)[1];
  const objectID = currentUrl.match(/\/([^\/]+)$/)[1];

  const targetAnnouncement = announcements.find((obj) => obj._id === objectID);

  // FOR LATER PLEASE DONT DELETE
  //   const formatDate = async () => {
  //     console.log(targetAnnouncement.datePosted);
  //     const month = targetAnnouncement.datePosted.toLocaleString("default", {
  //       month: "long",
  //     });
  //     const day = targetAnnouncement.datePosted.getUTCDate();
  //     const year = targetAnnouncement.datePosted.getUTCFullYear();
  //     const formattedDate = `${month} ${day}, ${year}`;
  //     console.log(formattedDate);
  //   };

  /**
   * Redirect to the create announcement page
   */
  const redirectToAddAnnouncement = () => {
    navigate(`/course/${courseID}/announcement`);
  };
  const redirectToAddQuestion = () => {
    navigate(`/course/${courseID}/QA`);
  };

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

  /**
   * Get a course's array of announcements by it's courseID.
   */
  const getAnnouncements = async () => {
    try {
      const response = await fetch(`/api/course/announcement/${courseID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const retrivedAnnouncements = await response.json();
        setAnnouncement(retrivedAnnouncements);
      } else {
        const result = await response.json();
        throw new Error(result.message || "Could not load course");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await fetch(`/api/course/question/${courseID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const retrivedQuestions = await response.json();
        setQuestion(retrivedQuestions);
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
    getAnnouncements();
    getQuestions();
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
          <div
            className="border"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {announcements.map((announcement) => (
              <div key={announcement._id} className="announcement-box">
                <a href={`/course/${courseID}/view/${announcement._id}`}>
                  <h3>{announcement.title}</h3>
                  <p>{announcement.message}</p>
                </a>
              </div>
            ))}
          </div>

          <br></br>
          <br></br>
          <h2 className="border">
            Q&A
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToAddQuestion}
              className="postButton"
            >
              +
            </Button>
          </h2>
          <div
            className="border"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <div className="qa-outerbox">
              {questions.slice(0, 5).map((question) => (
                <div className="qa-box" key={question._id}>
                  <a href={`/course/${courseID}/viewQuestion/${question._id}`}>
                    <h3>{question.title}</h3>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="postingInfo">
          <br></br>
          <br></br>
          {targetAnnouncement ? (
            <div>
              <h1>{targetAnnouncement.title}</h1>
              <p>{targetAnnouncement.message}</p>
            </div>
          ) : (
            <p>Object not found.</p>
          )}

          <br></br>
          <br></br>
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
          <h2 className="border">
            Announcements:
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToAddAnnouncement}
              className="postButton"
            >
              +
            </Button>
          </h2>

          <div
            className="border"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {announcements.map((announcement) => (
              <div key={announcement._id} className="announcement-box">
                <a href={`/course/${courseID}/view/${announcement._id}`}>
                  <h3>{announcement.title}</h3>
                  <p>{announcement.message}</p>
                </a>
              </div>
            ))}
          </div>

          <br></br>
          <br></br>
          <h2 className="border">
            Q&A
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToAddQuestion}
              className="postButton"
            >
              +
            </Button>
          </h2>
          <div
            className="border"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <div className="qa-outerbox">
              {questions.slice(0, 5).map((question) => (
                <div className="qa-box" key={question._id}>
                  <a href={`/course/${courseID}/viewQuestion/${question._id}`}>
                    <h3>{question.title}</h3>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="postingInfo">
          <br></br>
          <br></br>
          {targetAnnouncement ? (
            <div>
              <h1>{targetAnnouncement.title}</h1>
              <p>{targetAnnouncement.message}</p>
            </div>
          ) : (
            <p>Object not found.</p>
          )}
          <br></br>
          <br></br>
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
