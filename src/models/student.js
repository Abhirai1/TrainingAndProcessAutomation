const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    name: { type: String },
    profilePicture: { type: String },
    skills: [{ type: String }],
    education: [
        {
            type: { type: String, required: true }, // E.g., 10th, 12th, B.Tech
            percentage: { type: Number, required: true } // Percentage obtained
        }
    ]
});

// Compile user model
const User = mongoose.model('Student', studentSchema);

module.exports = User;
