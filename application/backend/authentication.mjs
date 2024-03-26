import express from "express";
import bcrypt from "bcrypt";
import { User } from "./database.mjs";

const router = express.Router();

// Route to handle user registration
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      // Add other fields as necessary
    });
    const savedUser = await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(400).send("Error registering user");
  }
});

// Route to handle user login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    // Authentication successful
    res.send("Logged in successfully");
    // Implement session or token logic here as needed
  } else {
    res.status(400).send("Invalid username or password");
  }
});

export default router;
