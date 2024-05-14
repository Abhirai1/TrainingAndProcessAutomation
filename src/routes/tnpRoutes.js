const express = require('express');
const router = express.Router();
const tnpController = require('../controllers/tnpController');
const { requireAuth, restrictToUserType } = require('../middlewares/authMiddleware');

// TnP dashboard route
router.get('/', requireAuth, restrictToUserType(['tnp']), tnpController.getTnpDashboard);

// Job postings route
router.post('/job_postings', requireAuth, restrictToUserType(['tnp']), tnpController.postJobPosting);

module.exports = router;
