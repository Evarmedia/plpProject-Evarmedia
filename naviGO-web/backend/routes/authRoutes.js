const express = require('express');
const router = express.Router();
const { register, login, getProfile, editUserProfile,  } = require('../controllers/authController');
const { authorize } = require('../middleware/authorizeMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for getting profile
router.get('/userProfile', authenticate, getProfile);

router.put('/editProfile/:user_id', authenticate, getProfile);

router.delete('/delete/:user_id', authenticate, getProfile);

module.exports = router;
