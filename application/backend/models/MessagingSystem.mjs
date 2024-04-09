import mongoose from 'mongoose';

const messagingSchema = new mongoose.Schema({
  dateSent: Date,
  message: String,
  receiverID: Number,
  senderID: Number,
});

const MessagingSystem = mongoose.model('Messaging', messagingSchema);

export default MessagingSystem;
