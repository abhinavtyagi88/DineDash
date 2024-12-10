const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    order_data: [
        {
            items: { type: Array, required: true },
            order_date: { type: Date, required: true },
        }
    ],
});

module.exports = mongoose.model('Order', OrderSchema);
