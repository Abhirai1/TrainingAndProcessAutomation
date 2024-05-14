const JobPosting = require('../models/jobPosting');

// Controller functions
const tnpController = {
    // TnP dashboard controller
    getTnpDashboard: (req, res) => {
        res.render('TnP', { successMessage: req.session.successMessage });
        // Clear the session after using the success message
        req.session.successMessage = null;
    },

    // Job posting controller
    postJobPosting: async (req, res) => {
        try {
            const { companyName, profile, skillsRequired, eligibility, description, applyLink } = req.body;

            // Create a new job posting document
            const jobPosting = new JobPosting({
                companyName,
                profile,
                skillsRequired: skillsRequired.split(',').map(skill => skill.trim()), // Convert comma-separated skills to an array
                eligibility,
                description,
                applyLink
            });

            // Save the job posting to the database
            await jobPosting.save();
            res.render('TnP', { successMessage: 'Job posted successfully' }); // Render the same page with a success message
        } catch (error) {
            console.error(error);
            res.send('Error adding job posting');
        }
    }
};

module.exports = tnpController;
