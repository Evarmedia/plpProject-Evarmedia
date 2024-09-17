// donationController.js

const { Donations, Users, Communities } = require('../models');

// Add a new donation
const addDonation = async (req, res) => {
    const { item_name, item_type, value, quantity, user_id, community_id } = req.body;

    try {
        const donation = await Donations.create({
            item_name,
            item_type,
            value,
            quantity,
            user_id,
            community_id,
            donation_date: new Date(),
            remaining_quantity: quantity,
            status: 'pending',
        });

        res.status(201).json({ message: 'Donation added successfully', donation });
    } catch (error) {
        res.status(500).json({ message: 'Error adding donation', error });
    }
};

// Fetch a specific donation by donation_id
const getDonation = async (req, res) => {
    const { donation_id } = req.params;

    try {
        const donation = await Donations.findByPk(donation_id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ donation });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donation', error });
    }
};

// Update donation status (by community manager)
const updateDonationStatus = async (req, res) => {
    const { donation_id } = req.params;
    const { status } = req.body;

    try {
        const donation = await Donations.findByPk(donation_id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        donation.status = status;
        await donation.save();

        res.status(200).json({ message: 'Donation status updated successfully', donation });
    } catch (error) {
        res.status(500).json({ message: 'Error updating donation status', error });
    }
};

// Fetch all donations for a specific community (for community managers)
const getDonationsForCommunity = async (req, res) => {
    const { community_id } = req.params;

    try {
        const donations = await Donations.findAll({
            where: { community_id }
        });

        res.status(200).json({ donations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error });
    }
};

// Fetch all donations (for admin)
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donations.findAll();
        res.status(200).json({ donations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error });
    }
};

// Export the functions
module.exports = {
    addDonation,
    getDonation,
    updateDonationStatus,
    getDonationsForCommunity,
    getAllDonations,
};
