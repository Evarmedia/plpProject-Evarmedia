// require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User  = require('../models/User');
const { validationResult } = require('express-validator');

// Register Users POST ✅
// /users/register
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // const initialEncyptLevel = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
        console.log(error);
    }
};

// Sign in users POST ✅
// /users/login
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // const expiryTime = Date.now() + (jwt.decode(token).exp - jwt.decode(token).iat) * 1000;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Get user Profile GET ✅
// /users/userProfile
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

// Edit user profile
const editUserProfile = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name, email, password } = req.body;

        // Find the user by ID
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user profile', error: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Find the user by ID
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    editUserProfile,
    deleteUser
};
