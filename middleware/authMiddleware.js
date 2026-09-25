const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // 1. Check if token is present in the request headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extract token from the header
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token using the secret key
            const decoded = jwt.verify(token, 'secret123');

            // 4. Fetch user details (except password) and attach to request
            req.user = await User.findById(decoded.id).select('-password');
            
            next(); // Move to the next function (controller)
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // 5. If no token is found at all
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };