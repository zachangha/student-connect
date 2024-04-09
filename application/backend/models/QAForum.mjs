import mongoose from 'mongoose';

const qaForumSchema = new mongoose.Schema({
  authorID: Number,
  courseID: Number,
  datePosted: Date,
  forumID: String,
  message: String,
  questionID: String,
  type: String,
});

const QAForum = mongoose.model('QAForum', qaForumSchema);

export default QAForum;
