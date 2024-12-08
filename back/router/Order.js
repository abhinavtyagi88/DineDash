const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming Order is exported from your Order model

// Route to handle order creation or update
router.post('/orderData', async (req, res) => {
    try {
        const { email, order_data, order_date } = req.body;

        // Add order_date to order_data
        const data = [...order_data];
        data.unshift({ Order_date: order_date });

        // Check if user exists
        const existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            // If no existing order, create a new order document
            const newOrder = new Order({
                email,
                order_data: [data]
            });

            await newOrder.save();
            return res.json({ success: true, message: 'Order created successfully' });
        } else {
            // If user exists, update by appending the new order data
            await Order.updateOne(
                { email },
                { $push: { order_data: data } }
            );
            return res.json({ success: true, message: 'Order updated successfully' });
        }
    } catch (error) {
        console.error('Error in /orderData:', error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

// Route to fetch order data for a specific user
router.post('/myOrderData', async (req, res) => {
    try {
        const { email } = req.body;

        // Find orders by email
        const userOrders = await Order.findOne({ email });

        if (!userOrders) {
            return res.status(404).json({ success: false, message: 'No orders found for this user' });
        }

        res.json({ success: true, orderData: userOrders });
    } catch (error) {
        console.error('Error in /myOrderData:', error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

module.exports = router;
