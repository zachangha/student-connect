import mongoose from "mongoose";

const qaForumSchema = new mongoose.Schema({
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  datePosted: Date,
  forumID: Number,
  title: String,
  message: { type: String, required: true },
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QAForum",
    required: false,
  },
  type: { type: String, required: true },
  reactions: {
    answered: { type: Number, default: 0 },
    offTopic: { type: Number, default: 0 },
    badInformation: { type: Number, default: 0 },
  },
});

const QAForum = mongoose.model("QAForum", qaForumSchema);

export default QAForum;
