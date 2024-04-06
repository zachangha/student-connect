import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  karmaPoints: {
    type: Number,
    default: 0,
  },
  pronouns: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher", "TA"],
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
