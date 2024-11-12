const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import Mongoose models
const Student = require('../models/student');
const Faculty = require('../models/faculty');
const Hod = require('../models/hod');
const TnP = require('../models/tnp');

// Default password
const defaultPassword = 'KIET123';

// MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/TnPDatabase';

// Connect to MongoDB
mongoose.connect(mongoURL)
.then(async () => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

