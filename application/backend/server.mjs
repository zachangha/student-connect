import path from "path";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { connectToDatabase, insertUsers } from "./database.mjs";
import User from "./models/User.mjs";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const root = path.resolve(__dirname, "..", "build");
app.use(express.static(root));

connectToDatabase();

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

    // Create a user object without the password
    const userResponse = {
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

app.use("/*", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + (process.env.PORT || 3000));
});
