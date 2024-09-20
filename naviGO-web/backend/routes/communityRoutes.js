const express = require('express');
const router = express.Router();
const { createCommunity, assignCommunityManager, getCommunityById, editCommunity, getAllCommunities, deleteCommunity } = require('../controllers/communityController');
const { authorize } = require('../middleware/authorizeMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

// Route to create a new community
router.post('/create', authenticate, authorize(["admin"]), createCommunity);

// Route to update a community
router.post('/assign', authenticate, assignCommunityManager);

// Route to get a specific community by ID
router.get('/:community_id', getCommunityById);

// Route to update a specific community by ID
router.put('/:community_id', authenticate, editCommunity);

// Route to get all communities
router.get('/', getAllCommunities);

// Delete a specific community
router.delete('/:community_id', authorize(['admin']), deleteCommunity);

module.exports = router;
