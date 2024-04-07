import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.mjs";

dotenv.config();

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
}

export async function insertUsers(usersData) {
  await connectToDatabase();

  for (const userData of usersData) {
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      karmaPoints: 0,
      pronouns: userData.pronouns,
      role: userData.role,
      dateJoined: new Date(),
    });

    try {
      const savedUser = await newUser.save();
      console.log("User successfully saved:", savedUser);
    } catch (err) {
      if (err.code === 11000) {
        console.error("Error saving user: Duplicate field", err);
      } else {
        console.error("Error saving user:", err);
      }
    }
  }
}
