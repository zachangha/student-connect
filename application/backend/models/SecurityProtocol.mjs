import mongoose from 'mongoose';

const securityProtocolSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  description: { type: String, required: true },
  eventType: { type: String, required: true },
  ip_address: { type: String, required: true },
  userID: { type: Number, required: true }
});

const SecurityProtocol = mongoose.model('SecurityProtocol', securityProtocolSchema);

export default SecurityProtocol;
