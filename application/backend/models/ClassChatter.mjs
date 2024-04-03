import mongoose from 'mongoose';

const classChatterSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  chatterId: { type: Number, required: true },
  courseId: { type: Number, required: true }
});

const ClassChatter = mongoose.model('ClassChatter', classChatterSchema);

export default ClassChatter;