const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

const { requireAuth, restrictToUserType } = require('./userType');


// Student dashboard route
router.get('/', requireAuth, restrictToUserType(['student']), studentController.getStudentDashboard);

// Update profile route
router.get('/updateProfile', requireAuth, restrictToUserType(['student']), studentController.getUpdateProfile);
router.post('/update_profile', requireAuth, restrictToUserType(['student']), studentController.postUpdateProfile);

// Add education route
router.get('/AddEducation', requireAuth, restrictToUserType(['student']), studentController.getAddEducation);

// Update education route
router.post('/updateEducation', requireAuth, restrictToUserType(['student']), studentController.postUpdateEducation);

// Skills route
router.get('/skills', requireAuth, restrictToUserType(['student']), studentController.getSkills);
router.post('/addSkills', requireAuth, restrictToUserType(['student']), studentController.postAddSkills);

// Applied status route
router.get('/appliedStatus', requireAuth, restrictToUserType(['student']), studentController.getAppliedStatus);

module.exports = router;
