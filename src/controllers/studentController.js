const JobPosting = require('../models/jobPosting');
const User = require('../models/student');
const uploadOnCloudinary = require('../utils/cloudinary');

// Controller functions
const studentController = {
    // Student dashboard controller
    getStudentDashboard: async (req, res) => {
        try {
            // Fetch job postings from the database
            const jobPostings = await JobPosting.find();

            // Fetch user data from the database based on the logged-in user ID
            const user = await User.findById(req.session.userId);
            // console.log(user.profilePicture);
            // Pass the user data and job postings to the student.ejs view
            res.render('student', { user, jobPostings });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data');
        }
    },

    // Update profile controller
    getUpdateProfile: (req, res) => {
        res.render('updateProfile');
    },
    postUpdateProfile: async (req, res) => {
        // Implement logic to update profile
    },

    // Add education controller
    getAddEducation: async (req, res) => {
        try {
            // Retrieve user skills from the database
            const userId = req.session.userId;
            const user = await User.findById(userId);
            const education = user ? user.education : [];
            // console.log(skills);
            // Render the skill.ejs view with the user's skills
            res.render('AddEducation', { education });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error fetching Educational details');
        }
    },

    // Update education controller
    postUpdateEducation: async (req, res) => {
        try {
            // Retrieve user ID from session
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).send('User not authenticated');
            }

            // Extract education details from the request body
            const { tenthPercentage, twelfthPercentage, btechPercentage } = req.body;

            // Construct the education object
            const education = [
                { type: '10th', percentage: parseFloat(tenthPercentage) },
                { type: '12th', percentage: parseFloat(twelfthPercentage) },
                { type: 'B.Tech', percentage: parseFloat(btechPercentage) }
            ];

            // Update user's education details in the database
            await User.findByIdAndUpdate(userId, { education: education });

            // Redirect back to the AddEducation page
            res.redirect('/AddEducation');
        } catch (error) {
            console.error(error);
            res.send('Error adding education details');
        }
    },

    // Skills controller
    getSkills: async (req, res) => {
        try {
            // Retrieve user skills from the database
            const userId = req.session.userId;
            const user = await User.findById(userId);
            const skills = user ? user.skills : [];
            // console.log(skills);
            // Render the skill.ejs view with the user's skills
            res.render('skills', { skills });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching skills');
        }
    },
    postAddSkills: async (req, res) => {
        // Implement logic to add skills
    },

    // Applied status controller
    getAppliedStatus: (req, res) => {
        res.render('appliedStatus');
    }
};

module.exports = studentController;
