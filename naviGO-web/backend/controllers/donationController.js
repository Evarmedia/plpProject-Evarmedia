const Donations = require('../models/Donation');

// Add a new donation POST ✅
// /donations/create
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

// Fetch a specific donation by donation_id GET ✅
// /donations/:donationId
const getDonation = async (req, res) => {
    const { donation_id } = req.params;

    console.log("Before try block", donation_id);

    try {
        const donation = await Donations.findByPk(donation_id);

        console.log(donation_id);
        console.log(donation);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ donation });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donation', error });
    }
};

// Update donation status (by community manager) PUT ✅
// /donations/:donationId
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

// Fetch all donations for a specific community (for community managers) GET ✅
// /donations/:communityId
const getDonationsForCommunity = async (req, res) => {
    const { community_id } = req.params;

    try {
        const donations = await Donations.findAll({
            where: { community_id }
        });

        if (donations.length === 0) {
            return res.status(404).json({ message: 'No donations found for this community'});
        }

        res.status(200).json({ donations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error });
    }
};

// Fetch all donations (for admin) GET ✅
// /donations/
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donations.findAll();
        res.status(200).json({ donations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error });
    }
};

// Fetch donations by user ID (donor history)
const getDonationsByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Find donations by user ID
        const donations = await Donation.findAll({
            where: { user_id }
        });

        if (donations.length === 0) {
            return res.status(404).json({ message: 'No donations found for this user' });
        }

        res.status(200).json({ donations });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch donations', error: error.message });
    }
};

// Delete a donation by ID
const deleteDonation = async (req, res) => {
    try {
        const { donation_id } = req.params;

        // Find the donation by ID
        const donation = await Donation.findByPk(donation_id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Delete the donation
        await donation.destroy();
        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete donation', error: error.message });
    }
};


// Export the functions
module.exports = {
    addDonation,
    getDonation,
    updateDonationStatus,
    getDonationsForCommunity,
    getAllDonations,
    getDonationsByUserId,
    deleteDonation
};
