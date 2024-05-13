import path from "path";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import { fileURLToPath } from "url";
import { connectToDatabase, insertUsers } from "./database.mjs";
import ToDoList from "./models/ToDoList.mjs";
import User from "./models/User.mjs";
import Class from "./models/Classes.mjs";
import QAForms from "./models/QAForum.mjs";
import { ObjectId } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

dotenv.config({ path: "../.env" });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const root = path.resolve(__dirname, "..", "build");
app.use(express.static(root));

connectToDatabase();

// AI tutor set up
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

/*
   Route for processing chat messages using the Gemini API
*/
app.post("/api/chat", async (req, res) => {
  try {
    // get user prompt from text field
    const { prompt } = req.body;

    // send prompt and wait for results
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(200).json({ message: text });
  } catch (err) {
    console.error("API request failed with error: ", err);
    res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
});

// post new user to databse during registration
app.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;
    await insertUsers(userData);

    res.status(201).json({ message: "Users added successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add users", error: err.message });
  }
});

// enter using info when trying to login and check that password matches
// store user information to local storage so it can be accessed later
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      karmaPoints: user.karmaPoints,
      pronouns: user.pronouns,
      role: user.role,
      dateJoined: user.dateJoined,
    };

    res.json({ message: "Login successful", user: userResponse });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// endpoint for teachers to create classes using id to link to the teacher
app.post("/api/classes", async (req, res) => {
  console.log("Received data:", req.body);
  const { classID, className, teacherID } = req.body;
  try {
    const newClass = new Class({
      classID,
      className,
      teacher: teacherID,
    });
    await newClass.save();
    res.status(201).json({
      message: "Class created successfully",
      classID: newClass.classID,
    });
  } catch (error) {
    console.error("Error when creating class:", error);
    res.status(error.name === "ValidationError" ? 400 : 500).json({
      message: "Failed to create class",
      error: error.message,
    });
  }
});

// endpoint for students to join, checks if their classID exists if so checks if studentID is in the
// array and if not adds them
app.post("/api/classes/join", async (req, res) => {
  const { classID, studentID } = req.body;
  try {
    const existingClass = await Class.findOne({ classID });
    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    if (!existingClass.students.includes(studentID)) {
      existingClass.students.push(studentID);
      await existingClass.save();
      res.status(200).json({ message: "Joined class successfully" });
    } else {
      res.status(400).json({ message: "Already joined this class" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to join class", error: error.message });
  }
});

/**
 *  Endpoint to get a student's joined classes and a teachers created classes with the userID.
 *  If the user is a student it will look for all classes where the userID is contained in the students array along with all the
 *  names of the teachers for those classes.
 *  If the user is a teacher it will get all the classes that the userID matches the teacher's ID for the class.
 */
app.get("/api/classes/get/:userId", async (req, res) => {
  const { userId } = req.params;
  const userInformation = await User.findOne({ _id: new ObjectId(userId) });
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  if (userInformation.role == "student") {
    try {
      const classes = await Class.find({ students: new ObjectId(userId) });
      const teachers = [];
      for (let i = 0; i < classes.length; i++) {
        const teacher = await User.findById(classes[i].teacher);
        teachers.push(teacher);
      }
      res.send([classes, teachers]);
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    try {
      const classes = await Class.find({ teacher: new ObjectId(userId) });
      res.send(classes);
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

/**
 *  Endpoint to get a a course's information with the courseID.
 *  It will take the courseID to query through all the classes and return the matching class.
 */
app.get("/api/course/get/:courseID", async (req, res) => {
  const { courseID } = req.params;
  try {
    const course = await Class.find({ _id: new ObjectId(courseID) });
    res.send(course);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Endpoint to get an array of announcements for a class.
 */
app.get("/api/course/announcement/:courseID", async (req, res) => {
  const { courseID } = req.params;
  try {
    const course = await QAForms.find({
      courseID: new ObjectId(courseID),
      type: "announcement",
    }).sort({ datePosted: -1 });
    res.send(course);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/course/question/:courseID", async (req, res) => {
  const { courseID } = req.params;
  try {
    const question = await QAForms.find({
      courseID: new ObjectId(courseID),
      type: "question",
    }).sort({ datePosted: -1 });
    res.send(question);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/course/reply/get/:objectID", async (req, res) => {
  const { objectID } = req.params;
  try {
    const replies = await QAForms.find({
      questionID: new ObjectId(objectID),
      type: "reply",
    });
    const question = await QAForms.find({
      _id: new ObjectId(objectID),
    });
    const questionAuthor = await User.find({
      _id: new ObjectId(question[0].authorID),
    });
    const usernames = [];
    for (let i = 0; i < replies.length; i++) {
      const username = await User.findById(replies[i].authorID);
      usernames.push(username);
    }
    res.send([replies, usernames, questionAuthor]);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Endpoint to create an announcment in the Q&A form.
 * Takes the courseID and the authorID, which is the teacher.
 */
app.post("/api/classes/announcement/create", async (req, res) => {
  const { authorID, courseID, datePosted, title, message, questionID, type } =
    req.body;
  try {
    const newAnnouncement = new QAForms({
      authorID,
      courseID,
      datePosted,
      title,
      message,
      questionID,
      type,
    });
    await newAnnouncement.save();
    res.status(201).json({
      message: "Announcement created successfully",
      classID: newAnnouncement.courseID,
    });
  } catch (error) {
    console.error("Error when creating announcement:", error);
    res.status(error.name === "ValidationError" ? 400 : 500).json({
      message: "Failed to create announcement",
      error: error.message,
    });
  }
});

/**
 * Endpoint to create an Question in the Q&A form.
 * Takes the courseID and the authorID, which is the teacher.
 */
app.post("/api/classes/Question/create", async (req, res) => {
  const { authorID, courseID, datePosted, title, message, questionID, type } =
    req.body;
  try {
    const newQuestion = new QAForms({
      authorID,
      courseID,
      datePosted,
      title,
      message,
      questionID,
      type,
    });
    await newQuestion.save();
    res.status(201).json({
      message: "Quesion created successfully",
      classID: newQuestion.courseID,
    });
  } catch (error) {
    console.error("Error when creating question:", error);
    res.status(error.name === "ValidationError" ? 400 : 500).json({
      message: "Failed to create question",
      error: error.message,
    });
  }
});

app.post("/api/classes/Reply/create", async (req, res) => {
  const { authorID, courseID, datePosted, title, message, questionID, type } =
    req.body;
  try {
    const newReply = new QAForms({
      authorID,
      courseID,
      datePosted,
      title,
      message,
      questionID,
      type,
    });
    console.log(newReply);
    await newReply.save();
    res.status(201).json({
      message: "Reply created successfully",
      classID: newReply.courseID,
    });
  } catch (error) {
    console.error("Error when creating Reply:", error);
    res.status(error.name === "ValidationError" ? 400 : 500).json({
      message: "Failed to create Reply",
      error: error.message,
    });
  }
});

app.post("/api/profile-picture", async (req, res) => {
  try {
    const { username, imageUrl } = req.body;

    // Validate data
    if (!username || !imageUrl) {
      return res.status(400).send("Username and image URL are required.");
    }

    // Update profile picture URL associated with the user in the database using the username
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { profilePicture: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (err) {
    console.error("Error updating profile picture:", err);
    res.status(500).json({ message: "Failed to update profile picture" });
  }
});

/**
 *  Add new tasks to the database
 */
app.post("/api/tasks", async (req, res) => {
  const { task, authorId } = req.body;
  const newTask = new ToDoList({ authorId, task, completed: false });

  try {
    await newTask.save();
    res.status(201).json({ message: "Task added successfully", newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add task", error: error.message });
  }
});

/**
 *  Get all the tasks for this user
 */
app.get("/api/tasks/:authorId", async (req, res) => {
  try {
    const tasks = await ToDoList.find({ authorId: req.params.authorId });
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tasks", error: error.message });
  }
});

/**
 * Update a task's completion status
 */
app.put("/api/tasks/:taskId", async (req, res) => {
  const { completed } = req.body;
  try {
    const updatedTask = await ToDoList.findByIdAndUpdate(
      req.params.taskId,
      { completed: completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
});

/**
 *  Delete tasks from the database
 */
app.delete("/api/tasks/:taskId", async (req, res) => {
  try {
    await ToDoList.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: error.message });
  }
});

/**
 *  Saves reactions per reply post
 */

// Inside your route for saving reactions
app.post("/api/reactions", async (req, res) => {
  const { objectID, reactionType } = req.body;

  const qaForum = await QAForms.findById(objectID);
  if (!qaForum) {
    return res.status(404).json({ message: "Question not found" });
  }

  switch (reactionType) {
    case "Answered":
      qaForum.reactions.answered++;
      break;
    case "Off-Topic":
      qaForum.reactions.offTopic++;
      break;
    case "Bad Information":
      qaForum.reactions.badInformation++;
      break;
    default:
      return res.status(400).json({ message: "Invalid reaction type" });
  }

  const updatedDocument = await qaForum.save();
  console.log("Updated document:", updatedDocument);
  res
    .status(200)
    .json({ message: "Reaction saved successfully", updatedDocument });
});

// catch all
app.use("/*", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + process.env.PORT);
});
