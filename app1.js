const express = require('express');
const dbConnection = require('./src/db/conn');
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

// Import routes
const studentRoutes = require('./src/routes/studentRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
// const facultyRoutes = require('./src/routes/facultyRoutes');
const tnpRoutes = require('./src/routes/tnpRoutes');

const PORT = process.env.PORT || 3000;
const app = express();
require('dotenv').config();

// Public folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('views', path.join(__dirname, '/templates/views'));
app.set('view engine', 'ejs');

// Middleware for session management
app.use(session({
    secret: 'harekrishnaharekrishnakrishnakrishnahareharehareramharereamramramharehare', // Change this to a strong secret
    resave: false,
    saveUninitialized: true
}));



// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name for uploaded file
    }
});

// Initialize Multer upload
const upload = multer({ 
    storage: storage, 
});

// Routes
app.use('/student', studentRoutes);
app.use('/department', departmentRoutes);
app.use('/faculty', facultyRoutes);
app.use('/tnp', tnpRoutes);

// Default home page route
app.get('/', (req, res) => {
    res.render('home', { loggedIn: req.session.userId ? true : false });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
