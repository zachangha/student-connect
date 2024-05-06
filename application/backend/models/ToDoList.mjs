import mongoose from "mongoose";

const toDoListSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  task: String,
  completed: Boolean,
});

const ToDoList = mongoose.model("ToDoList", toDoListSchema);

export default ToDoList;
