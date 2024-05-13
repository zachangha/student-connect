import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./styles/classes.css";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [course, setCourse] = useState([]);
  const [announcements, setAnnouncement] = useState([]);
  const [questions, setQuestion] = useState([]);
  const [replies, setReply] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [questionAuthor, setQuestionAuthor] = useState([]);

  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const courseID = currentUrl.match(/\/course\/([^\/]+)\//)[1];
  const objectID = currentUrl.match(/\/([^\/]+)$/)[1];

  const targetQuestion = questions.find((obj) => obj._id === objectID);

  //karma logic
  const [showOptions, setShowOptions] = useState(false);
  const reactionOptions = ["Answered", "Off-Topic", "Bad Information"];
  const [chosenReaction, setChosenReaction] = useState(null); // Store chosen reaction
  const [reactionCounts, setReactionCounts] = useState({
    Answered: 0,
    "Bad Information": 0,
    "Off-Topic": 0,
  }); // Track reaction counts
  const [karmaPoints, setKarmaPoints] = useState(0); // State to store karma points

  // Load reaction counts and karma points from local storage
  useEffect(() => {
    const storedReactionCounts = JSON.parse(
      localStorage.getItem("reactionCounts"),
    );
    const storedKarmaPoints = JSON.parse(localStorage.getItem("karmaPoints"));
    if (storedReactionCounts) {
      setReactionCounts(storedReactionCounts);
    }
    if (storedKarmaPoints) {
      setKarmaPoints(storedKarmaPoints);
    }
  }, []);

  // Save reaction counts and karma points to local storage
  useEffect(() => {
    localStorage.setItem("reactionCounts", JSON.stringify(reactionCounts));
    localStorage.setItem("karmaPoints", JSON.stringify(karmaPoints));
  }, [reactionCounts, karmaPoints]);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = async (reaction, reply, authorId) => {
    let karmaChange = 0;
    switch (reaction) {
      case "Answered":
        karmaChange = 1;
        break;
      case "Bad Information":
        karmaChange = -1;
        break;
      default:
        karmaChange = 0;
    }
    setChosenReaction(reaction);
    setShowOptions(false); // Hide options after selection
    setReactionCounts((prevCounts) => ({
      ...prevCounts,
      [reaction]: prevCounts[reaction] + 1,
    })); // Update count for chosen reaction
    setKarmaPoints((prevPoints) => prevPoints + karmaChange); // Update karma points based on reaction

    try {
      const response = await saveReaction(objectID, reaction, authorId, reply); // Pass authorId to saveReaction
      console.log("Reaction saved successfully:", response);
    } catch (error) {
      console.error("Error saving reaction:", error);
    }
  };

  // Function to save reaction
  const saveReaction = async (objectID, reactionType, authorId, reply) => {
    const response = await fetch("/api/reactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objectID, reactionType, authorId, reply }), // Include authorId in the request body
    });

    if (!response.ok) {
      throw new Error("Failed to save reaction");
    }
    window.location.reload();
    return await response.json();
  };

  // Function to get reaction count for a specific type
  const getReactionCount = (reactionType) => {
    return reactionCounts[reactionType] || 0;
  };

  //karma up to this point

  /**
   * Redirect to the create announcement page
   */
  const redirectToAddAnnouncement = () => {
    navigate(`/course/${courseID}/announcement`);
  };
  const redirectToAddQuestion = () => {
    navigate(`/course/${courseID}/QA`);
  };
  const redirectToAddReply = () => {
    navigate(`/course/${courseID}/reply/${objectID}`);
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

  const getReplies = async () => {
    try {
      const response = await fetch(`/api/course/reply/get/${objectID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const retrivedReplies = await response.json();
        console.log(retrivedReplies);
        setReply(retrivedReplies[0]);
        setUsernames(retrivedReplies[1]);
        setQuestionAuthor(retrivedReplies[2]);
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
    getReplies();

    fetchReactionCounts(objectID);
  }, []);

  const fetchReactionCounts = async (objectID) => {
    try {
      const response = await fetch(`/api/reactions/${objectID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const reactionCountsData = await response.json();
        setReactionCounts(reactionCountsData);
      } else {
        const result = await response.json();
        throw new Error(result.message || "Could not fetch reaction counts");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

          <div className="border">
            {announcements.slice(0, 5).map((announcement) => (
              <li>
                <a href={`/course/${courseID}/view/${announcement._id}`}>
                  {announcement.title}
                </a>
              </li>
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
          <div className="border">
            {questions.slice(0, 5).map((question) => (
              <li>
                <a href={`/course/${courseID}/viewQuestion/${question._id}`}>
                  {question.title}
                </a>
              </li>
            ))}
          </div>
        </div>

        <div className="postingInfo">
          <br></br>
          <br></br>
          {targetQuestion ? (
            <div className="questionBox">
              <h1>Question: {targetQuestion.title}</h1>
              {questionAuthor.map((author) => (
                <h4>
                  {author.username}, KP: {author.karmaPoints}, asks:
                </h4>
              ))}
              <p>{targetQuestion.message}</p>
              <Button
                className="replyButton"
                variant="contained"
                color="primary"
                onClick={redirectToAddReply}
              >
                Reply
              </Button>
            </div>
          ) : (
            <p>Object not found.</p>
          )}

          <br></br>
          <br></br>
          <h2 className="border">Replies</h2>
          <div
            className="replyContainer"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {replies.map((reply, index) => (
              <div className="replyBox" key={index}>
                <div className="reaction-container">
                  <div className="reaction-boxes">
                    <div className="reaction-box1">
                      <p>Answered: {reply.reactions.answered}</p>
                    </div>
                    <div className="reaction-box2">
                      <p>Off-Topic: {reply.reactions.offTopic}</p>
                    </div>
                    <div className="reaction-box3">
                      <p>Bad Information: {reply.reactions.badInformation}</p>
                    </div>
                  </div>
                </div>
                <h4>
                  {usernames[index].username}, KP:{" "}
                  {usernames[index].karmaPoints}, replied:
                </h4>
                <p>{reply.message}</p>
                <div>
                  <button onClick={() => handleButtonClick(reply.authorId)}>
                    Choose Reaction
                  </button>
                  {showOptions && (
                    <div className="reaction-options">
                      {reactionOptions.map((reaction) => (
                        <button
                          key={reaction}
                          onClick={() => handleOptionSelect(reaction, reply)}
                        >
                          {reaction}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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

          <div className="border">
            {announcements.slice(0, 5).map((announcement) => (
              <li>
                <a href={`/course/${courseID}/view/${announcement._id}`}>
                  {announcement.title}
                </a>
              </li>
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
          <div className="border">put Q&A here</div>
          <div className="border">
            {questions.slice(0, 5).map((question) => (
              <li>
                <a href={`/course/${courseID}/viewQuestion/${question._id}`}>
                  {question.title}
                </a>
              </li>
            ))}
          </div>
        </div>

        <div className="postingInfo">
          <br></br>
          <br></br>
          {targetQuestion ? (
            <div className="questionBox">
              <h1>Question: {targetQuestion.title}</h1>
              {questionAuthor.map((author) => (
                <h4>
                  {author.username}, KP: {author.karmaPoints}, asks:
                </h4>
              ))}
              <p>{targetQuestion.message}</p>
              <Button
                className="replyButton"
                variant="contained"
                color="primary"
                onClick={redirectToAddReply}
              >
                Reply
              </Button>
            </div>
          ) : (
            <p>Object not found.</p>
          )}

          <br></br>
          <br></br>
          <h2 className="border">Replies</h2>
          <div
            className="replyContainer"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {replies.map((reply, index) => (
              <div className="replyBox" key={index}>
                <div className="reaction-container">
                  <div className="reaction-boxes">
                    <div className="reaction-box1">
                      <p>Answered: {reply.reactions.answered}</p>
                    </div>
                    <div className="reaction-box2">
                      <p>Off-Topic: {reply.reactions.offTopic}</p>
                    </div>
                    <div className="reaction-box3">
                      <p>Bad Information: {reply.reactions.badInformation}</p>
                    </div>
                  </div>
                </div>
                <h4>
                  {usernames[index].username}, KP:{" "}
                  {usernames[index].karmaPoints}, replied:
                </h4>
                <p>{reply.message}</p>
                <div>
                  <button onClick={() => handleButtonClick(reply.authorId)}>
                    Choose Reaction
                  </button>
                  {showOptions && (
                    <div className="reaction-options">
                      {reactionOptions.map((reaction) => (
                        <button
                          key={reaction}
                          onClick={() => handleOptionSelect(reaction, reply)}
                        >
                          {reaction}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
