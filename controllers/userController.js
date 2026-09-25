const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ------------------------------------
// Register User Logic
// ------------------------------------
const registerUser = async (req, res) => {
    try {
        // Get data from the request body (frontend)
        const { name, email, password } = req.body;

        // 1. Check if any field is empty
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // 2. Check if a user already exists with this email
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3. Generate salt and hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create and save the new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 5. Send a success response if the user is created
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                message: "Registration successful!"
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        // Catch and handle any server errors
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ------------------------------------
// Login User Logic
// ------------------------------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if the user exists in the database
        const user = await User.findOne({ email });

        // 2. If user exists, compare entered password with the hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                // 3. Generate a JWT token for the session
                token: jwt.sign({ id: user._id }, 'secret123', { expiresIn: '30d' }),
                message: "Login successful!"
            });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Export both functions so they can be used in routes
module.exports = { registerUser, loginUser };