import { connectToDatabase } from "./database.mjs";
import User from './models/User.mjs';


export async function insertUser() {
  await connectToDatabase();

  const newUser = new User({
    username: "Janedoe",
    userID: 2,
    email: "jane.doe@example.com",
    password: "securepassword123",
    firstName: "Jane",
    lastName: "Doe",
    karmaPoints: 100,
    pronouns: "she/her",
    role: "student",
    dateJoined: new Date(),
  });

  try {
    const savedUser = await newUser.save();
    console.log("User successfully saved:", savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
  }
}
