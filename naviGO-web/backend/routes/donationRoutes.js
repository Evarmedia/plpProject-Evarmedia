const express = require('express');
const router = express.Router();
const { addDonation, getDonation, updateDonationStatus, getDonationsForCommunity, getAllDonations, getDonationsByUserId, deleteDonation } = require('../controllers/donationController');
const { authorize } = require('../middleware/authorizeMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

// Route to create a new donation
router.post('/create', authenticate, authorize(['admin', 'donor']), addDonation);

// Route to get a specific donation by ID
router.get('/:donation_id', getDonation);

// Route to update a specific donation by ID
router.put('/:donation_id', authenticate, updateDonationStatus);

// get Donations for community
router.get('/community/:community_id', authenticate, getDonationsForCommunity);

// getDonationByUser_id
router.get('/user/:donation_id', authenticate, getDonationsByUserId);

// Delete donation
router.delete('/:donation_id', authenticate, deleteDonation);

// Route to get all donations
router.get('/', getAllDonations);

module.exports = router;
