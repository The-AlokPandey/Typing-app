const mongoose = require('mongoose');

// Schema to store user's typing test results
const scoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Links this score to a specific user in the User model
    },
    wpm: {
        type: Number,
        required: true // Words Per Minute speed
    },
    accuracy: {
        type: Number,
        required: true // Typing accuracy percentage (e.g., 95)
    },
    timeTaken: {
        type: Number,
        required: true // Duration of the test in seconds (e.g., 60)
    }
}, { timestamps: true }); // Automatically saves the exact date and time of the test

module.exports = mongoose.model('Score', scoreSchema);