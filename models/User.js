const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);