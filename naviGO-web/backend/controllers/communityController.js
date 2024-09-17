const Communities = require('../models/Community');
const Users = require('../models/User');

// Add a new community POST
// /communities/create
const createCommunity = async (req, res) => {
  const { community_name, location, community_manager_id } = req.body;

  try {
    const community = await Communities.create({
      community_name,
      location,
      community_manager_id
    });
    res.status(201).json({ message: 'Community created successfully', community });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create community', error });
  }
};

// Assign a community manager to a community POST
// /communities/assign
const assignCommunityManager = async (req, res) => {
  const { community_id, community_manager_id } = req.body;

  try {
    const community = await Communities.findByPk(community_id);
    const manager = await Users.findByPk(community_manager_id);

    if (!community || !manager || manager.role !== 'community_manager') {
      return res.status(404).json({ message: 'Community or Community Manager not found' });
    }

    community.community_manager_id = community_manager_id;
    await community.save();

    res.status(200).json({ message: 'Community manager assigned successfully', community });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign community manager', error });
  }
};

// Get community by ID GET
// /communities/:communityId
const getCommunityById = async (req, res) => {
  const { community_id } = req.params;

  try {
    const community = await Communities.findByPk(community_id);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve community', error });
  }
};

// Update community details PUT
// /communities/:communityId
const updateCommunity = async (req, res) => {
  const { community_id } = req.params;
  const { community_name, location, community_manager_id } = req.body;

  try {
    const community = await Communities.findByPk(community_id);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    community.community_name = community_name || community.community_name;
    community.location = location || community.location;
    community.community_manager_id = community_manager_id || community.community_manager_id;

    await community.save();

    res.status(200).json({ message: 'Community updated successfully', community });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update community', error });
  }
};

// Get all communities
// /communities/
const getAllCommunities = async (req, res) => {
  try {
    const communities = await Communities.findAll();
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve communities', error });
  }
};


module.exports = {
  createCommunity,
  assignCommunityManager,
  getCommunityById,
  updateCommunity,
  getAllCommunities,
};
