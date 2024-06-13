const mongoose = require('mongoose');

require('dotenv').config();

// Replace this with your MongoDB Atlas connection string
const uri = process.env.DBURI;
console.log(uri)


async function connectToMongoDB() {
    try {
        await mongoose.connect(uri);
        console.log("\nConnected to MongoDB Atlas\n");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas", error);
    }
}

module.exports = connectToMongoDB;
