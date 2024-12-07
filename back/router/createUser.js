const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const axios = require('axios');

dotenv.config();

const User = require('../models/User');
const fetch = require('../middleWare/fetchjwt');

const jwtSecret = process.env.JWT_SECRET || 'HaHa';

// Create user route
router.post('/createuser', async (req, res) => {
    let success = false;
    const { email, password, username, location } = req.body;

    // Validation
    if (!email || !password || !username || !location) {
        return res.status(400).json({ success, error: "All fields are required." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success, error: "Invalid email format." });
    }

    if (password.length < 8) {
        return res.status(400).json({ success, error: "Password must be at least 8 characters long." });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success, error: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            location,
        });

        const authToken = jwt.sign({ user: { id: user.id } }, jwtSecret, { expiresIn: '1h' });
        success = true;
        res.json({ success, authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success, error: "Internal server error." });
    }
});

// Login route
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password is required").exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Invalid credentials." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success, error: "Invalid credentials." });
        }

        const authToken = jwt.sign({ user: { id: user.id } }, jwtSecret, { expiresIn: '1h' });
        success = true;
        res.json({ success, authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success, error: "Internal server error." });
    }
});

// Get logged-in user details
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Get location based on latitude and longitude

// router.post('/getlocation', async (req, res) => {
//     const { latlong } = req.body;

//     if (!latlong || !latlong.lat || !latlong.long) {
//         return res.status(400).json({ error: "Latitude and longitude are required." });
//     }

//     try {
//         const { lat, long } = latlong;
//         const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.GEO_API_KEY}`);

//         if (!response.data || !response.data.results || !response.data.results[0]) {
//             return res.status(404).json({ error: "Location not found." });
//         }

//         const { village, county, state_district, state, postcode } = response.data.results[0].components;
//         const location = `${village}, ${county}, ${state_district}, ${state} ${postcode}`;
//         res.json({ location });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: "Failed to fetch location data." });
//     }
// });

module.exports = router;
