const express = require('express');
const router = express.Router();
const { createCommunity, assignCommunityManager, getCommunityById, updateCommunity, getAllCommunities } = require('../controllers/communityController');
const { authorize } = require('../middleware/authorizeMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

// Route to create a new community
router.post('/create', authenticate, createCommunity);

// Route to update a community
router.post('/create', authenticate, assignCommunityManager);

// Route to get a specific community by ID
router.get('/:communityId', getCommunityById);

// Route to update a specific community by ID
router.put('/:communityId', authenticate, updateCommunity);

// Route to get all communities
router.get('/', getAllCommunities);

module.exports = router;
