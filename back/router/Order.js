const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Auth = require('../middleWare/fetchjwt'); // Your JWT middleware

// Route to create or update orders
router.post(
    '/orderData',
    Auth,
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('order_data').isArray().withMessage('Order data should be an array'),
        body('order_date').notEmpty().withMessage('Order date is required'),
    ],
    async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { email, order_data, order_date } = req.body;

        try {
            const newOrderEntry = { items: order_data, order_date };

            // Update or create order
            const updatedOrder = await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: newOrderEntry } },
                { new: true, upsert: true } // Create if not found
            );
            
            return res.status(200).json({ success: true, message: 'Order updated successfully', updatedOrder });
        } catch (error) {
            console.error('Error in /orderData:', error.message);
            return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    }
);

// Route to fetch user orders
router.post(
    '/myOrderData',
    Auth,
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('date').optional().isDate().withMessage('Invalid date format'), // Optional date parameter
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, date } = req.body;

        try {
            // Fetch the user orders by email
            const userOrders = await Order.findOne({ email });

            if (!userOrders) {
                return res.status(404).json({ success: false, message: 'No orders found for this user' });
            }

            // If a date filter is provided, we filter the orders by that date
            if (date) {
                // Filter the orderData array by the provided date
                const filteredOrders = userOrders.order_data.filter(orderGroup => {
                    const orderDate = orderGroup[0]?.Order_date || orderGroup.order_date;
                    // Format the date and check if it matches the requested date
                    const formattedDate = new Date(orderDate).toLocaleDateString();
                    return formattedDate === new Date(date).toLocaleDateString();
                });

                // Respond with filtered orders
                return res.status(200).json({ success: true, orderData: { ...userOrders.toObject(), order_data: filteredOrders } });
            }

            // If no date filter is provided, return all orders
            return res.status(200).json({ success: true, orderData: userOrders });

        } catch (error) {
            console.error('Error in /myOrderData:', error.message);
            return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    }
);

module.exports = router;
