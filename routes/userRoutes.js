const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); 

// POST route for new user registration
router.post('/register', registerUser);

// POST route for user login
router.post('/login', loginUser);

module.exports = router;