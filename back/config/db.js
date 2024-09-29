const mongoose = require('mongoose');
require('dotenv').config();

// Replace this with your MongoDB Atlas connection string
const uri = process.env.DBURI;

async function connectToMongoDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("CONNECTED");

        // Fetch  data from the collection
        const fetchData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        

        // Set the global data variable
        global.food_items = fetchData;

        const category = await mongoose.connection.db.collection("category").find({}).toArray();

        global.category = category;
        
        // console.log(category);
        // console.log(fetchData);

        



    } catch (error) {
        console.error("Error connecting to MongoDB Atlas", error);
    }
}

module.exports = connectToMongoDB;
