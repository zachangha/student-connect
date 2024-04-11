import mongoose from "mongoose";
import User from "./models/User.mjs";

// Connect to database
export async function connectToDatabase(env_DB_URI) {
  try {
    await mongoose.connect(process.env.URI, {});
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
}

// insert users into database using array populated from login form
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
