const express = require('express');
const router = express.Router();
const { saveScore, getScores } = require('../controllers/scoreController');
const { protect } = require('../middleware/authMiddleware'); // Import middleware

// Added 'protect' middleware to secure these routes
router.post('/save', protect, saveScore);
router.get('/:userId', protect, getScores);

module.exports = router;