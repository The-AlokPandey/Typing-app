const Score = require('../models/scoreModel');

// Save a new typing score
const saveScore = async (req, res) => {
    try {
        // Get score details and user ID from frontend
        const { user, wpm, accuracy, timeTaken } = req.body;

        if (!user || !wpm || !accuracy || !timeTaken) {
            return res.status(400).json({ message: "Please provide all details" });
        }

        // Create and save the score
        const newScore = await Score.create({
            user,
            wpm,
            accuracy,
            timeTaken
        });

        res.status(201).json(newScore);
    } catch (error) {
        res.status(500).json({ message: "Error saving score", error: error.message });
    }
};

// Get all scores for a specific user
const getScores = async (req, res) => {
    try {
        // Find scores by user ID and sort by newest first
        const scores = await Score.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: "Error fetching scores", error: error.message });
    }
};

module.exports = { saveScore, getScores };