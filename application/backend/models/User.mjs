import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    userID: Number,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    dateJoined: Date,
    karmaPoints: Number,
    pronouns: String,
    role: String
});

export default mongoose.model('User', userSchema);
