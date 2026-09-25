const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // Isse ek email se ek hi account banega
    },
    password: { 
        type: String, 
        required: true 
    }
}, { timestamps: true }); // timestamps se kab account bana, wo time apne aap save ho jayega

module.exports = mongoose.model('User', userSchema);