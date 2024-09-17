const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const { authorize } = require('../middleware/authorizeMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

// Route for user registration
router.post('/register', authenticate, registerUser);

// Route for user login
router.post('/login', authenticate, loginUser);

// Route for getting profile
router.get('/userProfile', authenticate, getProfile);

module.exports = router;
