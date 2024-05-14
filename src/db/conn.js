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

    // try {
    //     // Insert sample data for students
    //     const studentData = [
    //         {
    //             rollNo: 'S001',
    //             email: 'student1@example.com',
    //             password: await bcrypt.hash(defaultPassword, 10),
    //             userType: 'student'
    //         },
    //         // Add more student data as needed
    //     ];
    //     await Student.insertMany(studentData);

    //     // Insert sample data for faculty
    //     const facultyData = [
    //         {
    //             email: 'faculty1@example.com',
    //             password: await bcrypt.hash(defaultPassword, 10),
    //             userType: 'faculty',
    //             name: 'Faculty 1'
    //         },
    //         // Add more faculty data as needed
    //     ];
    //     await Faculty.insertMany(facultyData);

    //     // Insert sample data for hod
    //     const hodData = [
    //         {
    //             email: 'hod@example.com',
    //             password: await bcrypt.hash(defaultPassword, 10),
    //             userType: 'hod',
    //             name: 'HOD Name'
    //         }
    //         // Add more hod data as needed
    //     ];
    //     await Hod.insertMany(hodData);

    //     // Insert sample data for TnP
    //     const tnpData = [
    //         {
    //             email: 'tnp@example.com',
    //             password: await bcrypt.hash(defaultPassword, 10),
    //             userType: 'tnp',
    //             name: 'TnP Name'
    //         }
    //         // Add more TnP data as needed
    //     ];
    //     await TnP.insertMany(tnpData);

    //     console.log('Sample data inserted successfully');
    // } catch (error) {
    //     console.error('Error inserting sample data:', error);
    // }
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
