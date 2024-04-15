import mongoose from "mongoose";

const classesSchema = new mongoose.Schema({
  classesID: { type: Number, required: true },
  classesName: { type: String, required: true },
  teacherID: { type: Number, required: true },
});

const classes = mongoose.model("classes", classesSchema);

export default classes;
