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
import User from "./models/User.mjs";
import Class from "./models/Classes.mjs";
import OpenAI from "openai";

const app = express();

dotenv.config({ path: "../.env" });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const root = path.resolve(__dirname, "..", "build");
app.use(express.static(root));

connectToDatabase();

// API endpoint for processing user messages
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = "YOUR_OPENAI_API_KEY";
    const apiUrl =
      "https://api.openai.com/v1/engines/davinci-codex/completions";
    // Send user message to ChatGPT API
    const response = await axios.post(
      apiUrl,
      {
        prompt: "Hi is my API working?!",
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    // Extract and send the response from ChatGPT back to the frontend
    res.status(200).json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
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

// catch all
app.use("/*", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + process.env.PORT);
});
