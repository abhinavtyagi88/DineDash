const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming your User model is here
const Order = require('../models/Order'); // Order model
const fetch = require('../middleWare/fetchjwt'); // JWT middleware
const jwtSecret = process.env.JWT_SECRET || 'HaHa'; // Ensure it's from environment variables

// Create user route
router.post('/createuser', async (req, res) => {
    let success = false;

    // Extract data from the request body
    const { email, password, username, location } = req.body;

    // Manual validation
    if (!email || !password || !username || !location) {
        return res.status(400).json({ success, error: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success, error: "Invalid email format." });
    }

    if (password.length < 5) {
        return res.status(400).json({ success, error: "Password must be at least 5 characters long." });
    }

    if (username.length < 3) {
        return res.status(400).json({ success, error: "Name must be at least 3 characters long." });
    }

    if (location.length < 1) {
        return res.status(400).json({ success, error: "Location is required." });
    }

    try {
        // Check if the email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success, error: "User already exists with this email." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(password, salt);

        // Create a new user
        user = await User.create({
            username,
            email,
            password: securePass,
            location
        });

        // Generate a JWT token
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });

        // Respond with success
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(`Error in /createuser route: ${error.message}`);
        res.status(500).json({ success, error: "Server error. Please try again later." });
    }
});


// Login route
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Try logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try logging in with correct credentials" });
        }

        const data = { user: { id: user.id } };
        success = true;
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' }); // Set token expiration
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// Get logged in User details (requires auth)
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get location based on latitude and longitude
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat;
        let long = req.body.latlong.long;

        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=YOUR_API_KEY_HERE`);
        let { village, county, state_district, state, postcode } = response.data.results[0].components;
        const location = `${village}, ${county}, ${state_district}, ${state}\n${postcode}`;
        
        res.send({ location });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch location data', details: error.message });
    }
});

// Add or update order data for a user
router.post('/orderData', async (req, res) => {
    const { email, order_data, order_date } = req.body;
    const data = [{ Order_date: order_date }, ...order_data]; // Add order_date to order data

    try {
        const existingOrder = await Order.findOne({ email });

        if (existingOrder) {
            // Update existing order data
            await Order.findOneAndUpdate({ email }, { $push: { order_data: data } });
        } else {
            // Create new order data
            await Order.create({ email, order_data: [data] });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
    }
});

// Fetch orders for a user
router.post('/myOrderData', async (req, res) => {
    try {
        const { email } = req.body;
        const userOrder = await Order.findOne({ 'email': email });
        if (!userOrder) {
            return res.status(404).json({ success: false, error: "No order data found" });
        }

        res.json({ orderData: userOrder });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch order data' });
    }
});

module.exports = router;
