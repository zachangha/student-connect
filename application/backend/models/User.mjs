import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username Exist"],
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
  profilePicture: {
    type: String,
    default: null,
  },
});

// Hash password before inserting
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("User", userSchema);
