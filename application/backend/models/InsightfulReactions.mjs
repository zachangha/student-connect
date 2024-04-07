import mongoose from 'mongoose';

const insightfulReactionsSchema = new mongoose.Schema({
  postID: { type: Number, required: true },
  reaction_type: { type: String, required: true },
  timestamp: { type: Date, required: true },
  userID: { type: Number, required: true }
});

const InsightfulReactions = mongoose.model('InsightfulReaction', insightfulReactionsSchema);

export default InsightfulReactions;
