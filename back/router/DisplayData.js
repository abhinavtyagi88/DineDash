const express = require('express');
const router = express.Router();

router.get('/foodData', (req, res) => {
    try {
        if (!global.food_items || !global.category) {
            return res.status(500).send("Food data not loaded yet.");
        }
        // console.log(global.food_items);
        
        res.send([global.food_items,global.category]); // Sending the data directly
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
