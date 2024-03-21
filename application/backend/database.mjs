import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectToDatabase() {
  console.log("in connectToDatabase");
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
}

export { connectToDatabase };
